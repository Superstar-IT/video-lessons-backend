import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('chatpers')
export class ChapterEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  chapterNumber: number;

  @Column({ type: 'text', nullable: true })
  icon?: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  lessonCount: number;

  @ManyToOne(() => CategoryEntity, (cateogry) => cateogry.chatpers, {
    cascade: ['insert', 'remove', 'soft-remove'],
  })
  cateogry: CategoryEntity;
}
