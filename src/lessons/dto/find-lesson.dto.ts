import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';

export class FindLessonsDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Filter lessons by category',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @ValidateIf((obj) => obj.categoryId !== undefined)
  @IsUUID(undefined, getValidateOptions(`Invalid category id`))
  categoryId?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Filter lessons by chapter',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @ValidateIf((obj) => obj.chapterId !== undefined)
  @IsUUID(undefined, getValidateOptions(`Invalid chapter id`))
  chapterId?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Filter lessons by section',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @ValidateIf((obj) => obj.sectionId !== undefined)
  @IsUUID(undefined, getValidateOptions(`Invalid section id`))
  sectionId?: string;
}
