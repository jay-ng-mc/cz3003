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
  question!: string;

  @Field()
  @Property({type: 'text'})
  choice1!: string;

  @Field()
  @Property({type: 'text'})
  choice2!: string;

  @Field()
  @Property({type: 'text', nullable: true})
  choice3!: string;

  @Field()
  @Property({type: 'text', nullable: true})
  choice4!: string;

  @Field()
  @Property({type: 'text'})
  correctAnswer!: string;
  
}