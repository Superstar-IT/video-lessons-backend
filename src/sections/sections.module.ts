import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaptersModule } from 'src/chapters/chapters.module';
import { SectionEntity } from './entities/section.entity';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity]), ChaptersModule],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
