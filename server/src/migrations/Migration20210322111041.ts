import { Migration } from '@mikro-orm/migrations';

export class Migration20210322111041 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "question" drop constraint if exists "question_choice3_check";');
    this.addSql('alter table "question" alter column "choice3" type text using ("choice3"::text);');
    this.addSql('alter table "question" alter column "choice3" drop not null;');
    this.addSql('alter table "question" drop constraint if exists "question_choice4_check";');
    this.addSql('alter table "question" alter column "choice4" type text using ("choice4"::text);');
    this.addSql('alter table "question" alter column "choice4" drop not null;');

    this.addSql('alter table "question" add constraint "question_question_unique" unique ("question");');
  }

}
