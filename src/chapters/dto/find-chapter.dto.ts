import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';

export class FindChapterDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Filter by category id',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @ValidateIf((obj) => obj.categoryId !== undefined)
  @IsUUID(undefined, getValidateOptions(`Invalid category id`))
  categoryId?: string;
}
