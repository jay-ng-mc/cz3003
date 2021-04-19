import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";
import { Level } from "./Level";

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

  @Field(() => [Level], {nullable:true})
  @ManyToMany(() => Level, level => level.questions)
  levels = new Collection<Level>(this);
  
}