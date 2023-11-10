import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryTable1699625431066 implements MigrationInterface {
  name = 'CreateCategoryTable1699625431066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chatpers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" text NOT NULL, "chapterNumber" integer NOT NULL DEFAULT '0', "icon" text, "lessonCount" integer NOT NULL DEFAULT '0', "cateogryId" uuid, CONSTRAINT "PK_bb18d6e17e0093a21aee28d352a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" text NOT NULL, "description" text, "icon" text, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chatpers" ADD CONSTRAINT "FK_b84902c3f9d1be1adc3bcac0e10" FOREIGN KEY ("cateogryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chatpers" DROP CONSTRAINT "FK_b84902c3f9d1be1adc3bcac0e10"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "chatpers"`);
  }
}
