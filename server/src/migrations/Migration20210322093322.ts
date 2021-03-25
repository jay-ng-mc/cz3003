import { Migration } from '@mikro-orm/migrations';

export class Migration20210322093322 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "question" ("id" serial primary key, "difficulty" int4 not null, "question" text not null, "choice1" text not null, "choice2" text not null, "choice3" text not null, "choice4" text not null, "correct_answer" text not null);');

    this.addSql('alter table "user" add column "email" text not null;');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('drop table if exists "post" cascade;');

    this.addSql('drop table if exists "session" cascade;');
  }

}
