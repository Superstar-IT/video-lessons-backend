import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { isEmpty, isNotEmpty, isNotEmptyObject, isUUID } from 'class-validator';
import { CategoriesService } from 'src/categories/categories.service';
import { SectionsService } from 'src/sections/sections.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { FindLessonsDto } from './dto/find-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { getFromDto } from 'src/core/utils/repository.utils';
import { SectionEntity } from 'src/sections/entities/section.entity';
import { ChaptersService } from 'src/chapters/chapters.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepo: Repository<LessonEntity>,
    private readonly sectionService: SectionsService,
    private readonly categoryService: CategoriesService,
    private readonly chapterService: ChaptersService,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<LessonEntity> {
    const section = await this.validateSectionId(createLessonDto.sectionId);
    const newLesson = getFromDto<LessonEntity>(
      createLessonDto,
      new LessonEntity(),
    );
    newLesson.section = section;
    const result = await this.lessonRepo.save(newLesson).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to add a new lesson. ${error.message}`,
      );
    });
    await this.handleLessonCountChange(result.id, false);
    return result;
  }

  async findAll(query: FindLessonsDto): Promise<LessonEntity[]> {
    if (isNotEmptyObject(query)) {
      const { categoryId, chapterId, sectionId } = query;
      if (isNotEmpty(sectionId)) {
        return await this.lessonRepo
          .find({
            where: {
              section: { id: sectionId },
            },
          })
          .catch((error) => {
            throw new InternalServerErrorException(
              `Failed to find lesssons by section. ${error.message}`,
            );
          });
      }

      const lessons: LessonEntity[] = [];
      if (isNotEmpty(chapterId)) {
        const sections = await this.sectionService.findAll({
          chapterIds: [chapterId],
        });
        sections.forEach((section) => {
          const { lessons } = section || { lessons: [] };
          lessons.push(...lessons);
        });
        return lessons;
      }

      const category = await this.categoryService.findOne(categoryId);
      const { chapters } = category || { chapters: [] };
      const chapterIds = chapters.map((chapter) => chapter.id);
      const sections = await this.sectionService.findAll({ chapterIds });
      sections.forEach((section) => {
        const { lessons } = section || { lessons: [] };
        lessons.push(...lessons);
      });
      return lessons;
    } else {
      return await this.lessonRepo.find();
    }
  }

  async findOne(id: string): Promise<LessonEntity> {
    const lesson = await this.lessonRepo
      .findOne({ relations: { section: true }, where: { id } })
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to get a lesson by id. ${error.message}`,
        );
      });
    if (!lesson) throw new NotFoundException(`Lesson not found`);
    return lesson;
  }

  async update(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonEntity> {
    const lesson = await this.findOne(id);
    if (
      isNotEmpty(updateLessonDto.sectionId) &&
      updateLessonDto.sectionId !== lesson.section.id
    ) {
      lesson.section = await this.validateSectionId(updateLessonDto.sectionId);
    }
    const newLesson = getFromDto<LessonEntity>(updateLessonDto, lesson);
    return await this.lessonRepo.save(newLesson).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to update a lesson. ${error.message}`,
      );
    });
  }

  async remove(id: string): Promise<void> {
    const lesson = await this.lessonRepo.findOne({ where: { id } });
    if (!lesson) return;
    const updateResult = await this.lessonRepo.softDelete(id);
    const { affected } = updateResult;
    if (affected) {
      await this.handleLessonCountChange(id, true);
    }
  }

  async handleLessonCountChange(lessonId: string, isRemoving = false) {
    const lesson = await this.lessonRepo.findOne({
      relations: { section: { chapter: true } },
      where: { id: lessonId },
      withDeleted: true,
    });
    const {
      section: { chapter },
    } = lesson;
    if (!chapter) return;
    const lessonCount = isRemoving
      ? chapter.lessonCount - 1
      : chapter.lessonCount + 1;
    await this.chapterService.update(chapter.id, {
      lessonCount: lessonCount < 0 ? 0 : lessonCount,
    });
  }

  async validateSectionId(sectionId: string): Promise<SectionEntity> {
    if (isEmpty(sectionId))
      throw new BadRequestException(`Section id required`);
    if (!isUUID(sectionId)) throw new BadRequestException(`Invalid section id`);
    return await this.sectionService.findOne(sectionId);
  }
}
