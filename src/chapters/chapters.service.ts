import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, isNotEmpty, isUUID } from 'class-validator';
import { IsNull, Not, Repository } from 'typeorm';

import { CategoriesService } from 'src/categories/categories.service';
import { CategoryDto } from 'src/categories/dto/category.dto';
import { ChapterDto } from './dto/chapter.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { FindChapterDto } from './dto/find-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChapterEntity } from './entities/chapter.entity';
import { getFromDto } from 'src/core/utils/repository.utils';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(ChapterEntity)
    private chapterRepo: Repository<ChapterEntity>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createChapterDto: CreateChapterDto): Promise<ChapterDto> {
    const category = await this.validateCategoryId(createChapterDto.categoryId);
    const newChapter = getFromDto<ChapterEntity>(
      createChapterDto,
      new ChapterEntity(),
    );
    newChapter.cateogry = category as CategoryEntity;
    return await this.chapterRepo
      .save(newChapter)
      .then((res) => res as ChapterDto)
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to add a new chapter. ${error.message}`,
        );
      });
  }

  async findAll(query: FindChapterDto): Promise<ChapterDto[]> {
    const { categoryId } = query || {};

    return await this.chapterRepo
      .find({
        where: {
          cateogry: isNotEmpty(categoryId) ? { id: categoryId } : Not(IsNull()),
        },
      })
      .then((res) => res as ChapterDto[]);
  }

  async findOne(id: string): Promise<ChapterDto> {
    const chapter = await this.chapterRepo
      .findOne({ where: { id } })
      .then((res) => res as ChapterDto)
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to get a chapter by id. ${error.message}`,
        );
      });

    if (!chapter) throw new NotFoundException(`Chapter not found`);
    return chapter;
  }

  async update(
    id: string,
    updateChapterDto: UpdateChapterDto,
  ): Promise<ChapterDto> {
    const chapter = await this.findOne(id);
    if (
      isNotEmpty(updateChapterDto.categoryId) &&
      chapter.cateogry.id !== updateChapterDto.categoryId
    ) {
      chapter.cateogry = await this.validateCategoryId(
        updateChapterDto.categoryId,
      );
    }

    const newChapter = getFromDto<ChapterEntity>(updateChapterDto, chapter);
    return await this.chapterRepo
      .save(newChapter)
      .then((res) => res as ChapterDto)
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to update chapter. ${error.message}`,
        );
      });
  }

  async remove(id: string): Promise<void> {
    const chapter = await this.chapterRepo.findOne({ where: { id } });
    if (chapter) {
      await this.chapterRepo.softDelete(id).catch((error) => {
        throw new InternalServerErrorException(
          `Failed to remove a chapter. ${error.message}`,
        );
      });
    }
  }

  async validateCategoryId(categoryId: string): Promise<CategoryDto> {
    if (isEmpty(categoryId))
      throw new BadRequestException(`Category id required`);

    if (!isUUID(categoryId))
      throw new BadRequestException(`Invalid category id`);

    const category = await this.categoryService.findOne(categoryId);
    if (!category) throw new NotFoundException(`Category not found`);
    return category;
  }
}
