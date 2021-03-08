import { Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  startTime = new  Date();

  @Field(() => String)
  @Property({ type: 'date', nullable: true })
  updatedAt: Date;

}