import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";
import { Question } from "./Question";

@ObjectType()
@Entity()
export class Level {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({unique: true})
  level!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  dateCreated = new  Date();

  @Field()
  @Property({type: 'text'})
  createdBy!: string;

  @Field(() => [Question],{nullable: true})
  @ManyToMany(()=>Question, 'levels', {owner: true})
  questions = new Collection<Question>(this);

}