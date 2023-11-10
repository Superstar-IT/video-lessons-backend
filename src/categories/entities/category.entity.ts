import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ChapterEntity } from './chapter.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  icon?: string;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.cateogry)
  chatpers: ChapterEntity[];
}
