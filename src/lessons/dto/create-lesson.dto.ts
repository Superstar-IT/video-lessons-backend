import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { getValidateOptions } from 'src/core/validators/validation';

export class CreateLessonDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Section id of a new lesson',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsNotEmpty(getValidateOptions(`Section id required`))
  @IsUUID(undefined, getValidateOptions(`Invalid section id`))
  sectionId: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Title of a new lesson',
    example: 'Lesson Title',
  })
  @IsNotEmpty(getValidateOptions(`Lesson title required`))
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Description of a new lesson',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum et sollicitudin ac orci.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Teacher name of a new lesson',
    example: 'Clarence S. Moore',
  })
  @IsNotEmpty(getValidateOptions(`Teacher name required`))
  @IsString()
  teacherName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'A video URL of a new lesson',
    example: 'https://www.youtube.com/watch?v=GHTA143_b-s',
  })
  @IsNotEmpty(getValidateOptions(`Video URL required`))
  @IsString()
  video: string;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'Start time  of a new lesson',
  })
  @IsNotEmpty(getValidateOptions(`Start time required`))
  @Type(() => Date)
  @IsDate(getValidateOptions('Invalid date format'))
  startAt: Date;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'End time  of a new lesson',
  })
  @IsNotEmpty(getValidateOptions(`End time required`))
  @Type(() => Date)
  @IsDate(getValidateOptions('Invalid date format'))
  endAt: Date;
}
