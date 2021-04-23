import { BigIntType, Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Game {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: BigIntType })
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

  @Field()
  @Property({ type: 'date' })
  startTime: Date;

  @Field()
  @Property({ nullable: true, type: 'date' })
  endTime: Date;

  @Field()
  @Property({nullable: true})
  score: number;

  @Field()
  @Property({nullable: true})
  totalCorrect: number;

  @Field()
  @Property({nullable: true})
  totalQuestion: number; 

}