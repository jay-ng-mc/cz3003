import { Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Question {

  @Field()
  @PrimaryKey()
  id!: number;

  @Property()
  difficulty!: number;

  @Field()
  @Property({type: 'text', unique: true})
  questionTitle!: string;

  @Field()
  @Property({type: 'text'})
  A!: string;

  @Field()
  @Property({type: 'text'})
  B!: string;

  @Field()
  @Property({type: 'text', nullable: true})
  C: string;

  @Field()
  @Property({type: 'text', nullable: true})
  D: string;

  @Field()
  @Property({type: 'text'})
  correctAnswer!: string;
  
}