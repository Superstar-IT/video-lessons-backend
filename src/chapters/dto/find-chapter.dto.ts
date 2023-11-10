import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';

export class FindChapterDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Filter by category id',
  })
  @IsOptional()
  @ValidateIf((obj) => obj.categoryId !== undefined)
  @IsUUID(undefined, getValidateOptions(`Invalid category id`))
  categoryId?: string;
}
