import { Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Game {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  @Property({ type: 'date' })
  startTime = new  Date();

  @Field(() => String)
  @Property({ type: 'date' })
  endTime = new Date();

  @Field()
  @Property()
  score: number;

}