import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDto } from './dto/category.dto';
import { isEmpty, isNotEmptyObject, isUUID } from 'class-validator';
import { ChapterDto } from '../chapters/dto/chapter.dto';
import { CreateChapterDto } from '../chapters/dto/create-chapter.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOkResponse({ type: CategoryDto, description: 'Create a new category' })
  @ApiBody({
    type: CreateCategoryDto,
    required: true,
    description: 'New category details',
  })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({
    type: CategoryDto,
    isArray: true,
    description: 'Return all categories list',
  })
  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return await this.categoriesService.findAll();
  }

  @ApiOkResponse({
    type: CategoryDto,
    description: 'Find a single category by id',
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
    description: 'Category id',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryDto> {
    if (isEmpty(id)) throw new BadRequestException(`Category id required`);
    if (!isUUID(id))
      throw new BadRequestException(`Category id should be a valid UUID`);

    return await this.categoriesService.findOne(id).then((res) => {
      if (!res) throw new NotFoundException(`Category not found`);
      return res;
    });
  }

  @ApiOkResponse({
    type: CategoryDto,
    description: 'Update a category by id and return the updated category',
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
    description: 'Category id',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @ApiBody({
    type: UpdateCategoryDto,
    required: true,
    description: 'Category changes',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    if (isEmpty(id)) throw new BadRequestException(`Category id required`);
    if (!isUUID(id))
      throw new BadRequestException(`Category id should be a valid UUID`);
    if (isNotEmptyObject(updateCategoryDto)) {
      return this.categoriesService.update(id, updateCategoryDto);
    } else {
      const category = await this.findOne(id);
      if (!category) throw new NotFoundException(`Category not found`);
      return category;
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    type: null,
    status: HttpStatus.NO_CONTENT,
    description: 'Remove a single category by id',
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'id',
    description: 'Category id',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
