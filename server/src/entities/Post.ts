import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

  @PrimaryKey()
  id!: number;

  @Property({type: 'date'})
  createAt = new Date();

  @Property({type: 'date', onUpdate: () => new Date()})
  updatedAt = new Date();

  @Property({type: 'text'})
  title!: string;


}