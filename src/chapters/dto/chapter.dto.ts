import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { getValidateOptions } from 'src/core/validators/validation';

export class ChapterDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Chapter id - UUID',
  })
  @IsNotEmpty(getValidateOptions(`Chapter id required`))
  @IsUUID(undefined, getValidateOptions('Invalid chapter id'))
  id!: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Chapter title',
    example: 'Properties of Plane Shapes',
  })
  @IsNotEmpty(getValidateOptions(`Chapter title required`))
  @IsString()
  title: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Chapter number',
    example: 1,
  })
  @IsNotEmpty(getValidateOptions(`Chapter number required`))
  @IsInt(getValidateOptions(`Invalid chapter number`))
  @Min(1, getValidateOptions(`Chapter number should be a positive integer`))
  chapterNumber: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Category icon url',
  })
  icon?: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: `Lessons count for a given category`,
    example: 0,
  })
  @IsNotEmpty(getValidateOptions(`Lessons count required`))
  @IsInt(getValidateOptions(`Invalid lessons count`))
  @Min(0, getValidateOptions(`Lessons count should be positive integer`))
  lessonCount: number;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({ type: Date, required: true })
  @IsNotEmpty()
  @IsDate()
  deletedAt: Date;
  cateogry: CategoryEntity;
}
