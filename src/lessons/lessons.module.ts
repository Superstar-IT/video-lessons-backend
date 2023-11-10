import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsModule } from 'src/sections/sections.module';
import { LessonEntity } from './entities/lesson.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), SectionsModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
