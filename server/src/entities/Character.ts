import { Entity, PrimaryKey, Property } from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Character {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({type: 'text', unique: true})
  username!: string;

  @Field()
  @Property({type: 'text', unique: true})
  characterId!: string;


}