import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, isNotEmpty, isUUID } from 'class-validator';
import { IsNull, Not, Repository } from 'typeorm';

import { ChaptersService } from 'src/chapters/chapters.service';
import { ChapterDto } from 'src/chapters/dto/chapter.dto';
import { getFromDto } from 'src/core/utils/repository.utils';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionEntity } from './entities/section.entity';
import { FindSectionsDto } from './dto/find-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(SectionEntity)
    private sectionRepo: Repository<SectionEntity>,
    private readonly chapterService: ChaptersService,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<SectionEntity> {
    const chapter = await this.validateChapterId(createSectionDto.chapterId);
    const newSection = getFromDto<SectionEntity>(
      createSectionDto,
      new SectionEntity(),
    );
    newSection.chapter = chapter;
    return await this.sectionRepo.save(newSection).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to create a new section. ${error.message}`,
      );
    });
  }

  async findAll(query: FindSectionsDto): Promise<SectionEntity[]> {
    const { chapterId } = query || {};
    return await this.sectionRepo
      .find({
        relations: ['lessons'],
        where: {
          chapter: isNotEmpty(chapterId) ? { id: chapterId } : Not(IsNull()),
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to find sections. ${error.message}`,
        );
      });
  }

  async findOne(id: string): Promise<SectionEntity> {
    const section = await this.sectionRepo.findOne({
      relations: ['lessons'],
      where: { id },
    });
    if (!section) throw new NotFoundException(`Section not found`);
    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.findOne(id);
    if (
      isNotEmpty(updateSectionDto.chapterId) &&
      section.chapter.id !== updateSectionDto.chapterId
    ) {
      section.chapter = await this.validateChapterId(
        updateSectionDto.chapterId,
      );
    }
    const newSection = getFromDto<SectionEntity>(updateSectionDto, section);
    return await this.sectionRepo.save(newSection);
  }

  async remove(id: string): Promise<void> {
    await this.sectionRepo.softDelete(id).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to a section by id. ${error.message}`,
      );
    });
  }

  async validateChapterId(chapterId: string): Promise<ChapterDto> {
    if (isEmpty(chapterId))
      throw new BadRequestException(`Chapter id required`);
    if (!isUUID(chapterId)) throw new BadRequestException(`Invalid chapter id`);

    return await this.chapterService.findOne(chapterId);
  }
}
