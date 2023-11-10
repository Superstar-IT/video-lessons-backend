import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { getFromDto } from 'src/core/utils/repository.utils';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { ChapterDto } from './dto/chapter.dto';
import { ChapterEntity } from './entities/chapter.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(ChapterEntity)
    private chapterRepo: Repository<ChapterEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const newCategory = getFromDto<CategoryEntity>(
      createCategoryDto,
      new CategoryEntity(),
    );

    return await this.categoryRepo
      .save(newCategory)
      .then((result) => result as CategoryDto)
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to create a new category. ${error.message}`,
        );
      });
  }

  async findAll(): Promise<CategoryDto[]> {
    return await this.categoryRepo
      .find({
        relations: {
          chatpers: true,
        },
      })
      .then((result) => result as CategoryDto[])
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to fetch all categories. ${error.message}`,
        );
      });
  }

  async findOne(id: string): Promise<CategoryDto> {
    return await this.categoryRepo
      .findOne({
        relations: { chatpers: true },
        where: { id },
      })
      .then((res) => res as CategoryDto)
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to get a category by id. ${error.message}`,
        );
      });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException(`Category not found`);
    const newCategory = getFromDto<CategoryEntity>(updateCategoryDto, category);
    await this.categoryRepo.save(newCategory).catch((error) => {
      throw new InternalServerErrorException(
        `Failed to update a category. ${error.message}`,
      );
    });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    return await this.categoryRepo
      .softDelete(id)
      .then(() => true)
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to remove a category. ${error.message}`,
        );
      });
  }

  async addChapter(
    categoryId: string,
    createChapterDto: CreateChapterDto,
  ): Promise<ChapterDto> {
    const category = await this.findOne(categoryId);
    if (!category) throw new NotFoundException(`Category not found!`);
    const newChapter = getFromDto<ChapterEntity>(
      createChapterDto,
      new ChapterEntity(),
    );
    newChapter.cateogry = category;

    return await this.chapterRepo
      .save(newChapter)
      .then((res) => res as ChapterDto)
      .catch((error) => {
        throw new InternalServerErrorException(
          `Failed to add a new chapter. ${error.message}`,
        );
      });
  }
}
