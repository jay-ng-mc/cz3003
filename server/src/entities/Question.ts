import { Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Question {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  difficulty!: number;

  @Field()
  @Property({ type: 'text' })
  type!: string;

  @Field()
  @Property({type: 'text'})
  questionTitle!: string;

  @Field()
  @Property({type: 'text'})
  A!: string;

  @Field()
  @Property({type: 'text'})
  B!: string;

  @Field()
  @Property({type: 'text'})
  C!: string;

  @Field()
  @Property({type: 'text'})
  D!: string;

  @Field()
  @Property({type: 'text'})
  correctAnswer!: string;
  
}