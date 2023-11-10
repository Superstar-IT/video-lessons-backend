import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ChapterDto } from './chapter.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';

export class CreateChapterDto extends OmitType(ChapterDto, [
  'id',
  'lessonCount',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Category id of a new chapter',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsNotEmpty(getValidateOptions(`Category id required`))
  @IsUUID(undefined, getValidateOptions(`Invalid category id`))
  categoryId: string;
}
