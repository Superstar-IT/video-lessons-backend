import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, ValidateIf } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';

export class FindSectionsDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Filter by chapter',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsOptional()
  @ValidateIf((obj) => obj.chapterId !== undefined)
  @IsUUID(undefined, getValidateOptions(`Invalid chapter id`))
  chapterId?: string;
  chapterIds?: string[];
}
