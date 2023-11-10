import { BaseEntity } from 'src/core/entities/base.entity';
import { SectionEntity } from 'src/sections/entities/section.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('lessons')
export class LessonEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: false })
  teacherName: string;

  @Column({ type: 'text', nullable: false })
  video: string;

  @Column({ type: 'timestamptz', nullable: false })
  startAt: Date;

  @Column({ type: 'timestamptz', nullable: false })
  endAt: Date;

  @ManyToOne(() => SectionEntity)
  section: SectionEntity;
}
