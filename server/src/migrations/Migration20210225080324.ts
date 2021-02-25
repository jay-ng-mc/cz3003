import { Migration } from '@mikro-orm/migrations';

export class Migration20210225080324 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "create_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('drop table if exists "Post" cascade;');
  }

}
