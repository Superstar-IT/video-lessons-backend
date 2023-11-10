import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';

export class CreateSectionDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Chapter id',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsNotEmpty(getValidateOptions(`Chapter id required`))
  @IsUUID(undefined, getValidateOptions(`Invalid chapter id`))
  chapterId: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Section title',
    example: 'Arithmetic, Multiples and Factors',
  })
  @IsNotEmpty(getValidateOptions(`Section title required`))
  @IsString()
  title: string;
}
