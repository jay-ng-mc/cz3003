import { Migration } from '@mikro-orm/migrations';

export class Migration20210331165759 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "question" ("id" serial primary key, "difficulty" int4 not null, "question_title" text not null, "a" text not null, "b" text not null, "c" text null, "d" text null, "correct_answer" text not null);');
    this.addSql('alter table "question" add constraint "question_question_title_unique" unique ("question_title");');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "email" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
