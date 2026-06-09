import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1746700000000 implements MigrationInterface {
  name = 'InitSchema1746700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_tags_name" UNIQUE ("name"), CONSTRAINT "PK_tags" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" text, "status" character varying NOT NULL DEFAULT 'pending', "priority" character varying NOT NULL DEFAULT 'medium', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_tasks" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "tasks_tags_tags" ("tasksId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_tasks_tags" PRIMARY KEY ("tasksId", "tagsId"), CONSTRAINT "FK_tasks_tags_task" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE, CONSTRAINT "FK_tasks_tags_tag" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE)`);
    await queryRunner.query(`CREATE INDEX "IDX_tasks_tags_tasksId" ON "tasks_tags_tags" ("tasksId")`);
    await queryRunner.query(`CREATE INDEX "IDX_tasks_tags_tagsId" ON "tasks_tags_tags" ("tagsId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_tasks_tags_tagsId"`);
    await queryRunner.query(`DROP INDEX "IDX_tasks_tags_tasksId"`);
    await queryRunner.query(`DROP TABLE "tasks_tags_tags"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
