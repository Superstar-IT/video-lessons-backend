import { OmitType } from '@nestjs/swagger';
import { ChapterDto } from './chapter.dto';

export class CreateChapterDto extends OmitType(ChapterDto, [
  'id',
  'lessonCount',
  'createdAt',
  'updatedAt',
  'deletedAt',
]) {}
