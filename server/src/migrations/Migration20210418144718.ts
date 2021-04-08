import { Migration } from '@mikro-orm/migrations';

export class Migration20210418144718 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "character" ("id" serial primary key, "username" text not null, "character_id" int4 not null);');
    this.addSql('alter table "character" add constraint "character_username_unique" unique ("username");');

    this.addSql('create table "student_teacher" ("id" serial primary key, "student" text not null, "teacher" text not null);');

    this.addSql('create table "game" ("id" serial primary key, "game_id" int4 not null, "username" text not null, "type" text not null, "difficulty" int4 not null, "start_time" timestamptz(0) not null, "end_time" timestamptz(0) null, "score" int4 null, "total_correct" int4 null, "total_question" int4 null);');

    this.addSql('create table "question" ("id" serial primary key, "difficulty" int4 not null, "type" text not null, "question_title" text not null, "a" text not null, "b" text not null, "c" text not null, "d" text not null, "correct_answer" text not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "email" text not null, "password" text not null, "user_type" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
