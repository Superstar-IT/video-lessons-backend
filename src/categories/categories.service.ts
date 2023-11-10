import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getFromDto } from 'src/core/utils/repository.utils';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
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
}
