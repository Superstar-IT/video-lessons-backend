import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, ValidateIf } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';
import { CreateChapterDto } from './create-chapter.dto';

export class UpdateCategoryDto extends PartialType(CreateChapterDto) {
  @ApiProperty({
    type: Number,
    required: true,
    description: `Lessons count for a given category`,
    example: 0,
  })
  @IsOptional()
  @ValidateIf((obj) => obj.lessonCount !== undefined)
  @IsInt(getValidateOptions(`Invalid lessons count`))
  @Min(0, getValidateOptions(`Lessons count should be positive integer`))
  lessonCount: number;
}
