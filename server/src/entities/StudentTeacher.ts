import { Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class StudentTeacher {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({type: 'text'})
  student!: string;

  @Field()
  @Property({type: 'text'})
  teacher!: string;

}