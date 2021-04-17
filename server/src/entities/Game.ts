import { Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Game {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  gameId!: number;

  @Field(() => String)
  @Property({ type: 'text' })
  username!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  type!: string;

  @Field()
  @Property()
  difficulty!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  startTime = new  Date();

  @Field(() => String)
  @Property({ type: 'date' , nullable: true})
  endTime = new Date();

  @Field()
  @Property({nullable: true})
  score!: number;

  @Field()
  @Property({nullable: true})
  totalQuestion!: number; 

}