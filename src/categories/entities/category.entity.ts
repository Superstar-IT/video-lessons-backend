import { ChapterEntity } from 'src/chapters/entities/chapter.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  icon?: string;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.cateogry)
  chapters: ChapterEntity[];
}
