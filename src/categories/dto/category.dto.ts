import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';
import { ChapterDto } from '../../chapters/dto/chapter.dto';

export class CategoryDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Category id - UUID',
  })
  @IsNotEmpty(getValidateOptions(`Category id required`))
  @IsUUID(undefined, getValidateOptions('Invalid category id'))
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Category title',
    example: 'Mathematics',
  })
  @IsNotEmpty(getValidateOptions(`Category title required`))
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Category description',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum et sollicitudin ac orci.',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Category icon url',
  })
  icon?: string;

  @ApiProperty({
    type: ChapterDto,
    isArray: true,
    required: true,
    description: 'Chapter list of a given category',
  })
  chatpers: ChapterDto[];

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
}
