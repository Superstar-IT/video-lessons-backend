import { ChapterEntity } from 'src/chapters/entities/chapter.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { LessonEntity } from 'src/lessons/entities/lesson.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('sections')
export class SectionEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title: string;

  @ManyToOne(() => ChapterEntity)
  chapter: ChapterEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.section)
  lessons: LessonEntity[];
}
