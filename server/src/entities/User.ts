import { Entity, Enum, PrimaryKey, Property} from "mikro-orm";
import { Field, ObjectType } from "type-graphql";

enum UserRole {
  TEACHER = 'teacher',
  STUDENT = 'student'
}

@ObjectType()
@Entity()
export class User {

  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new  Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({type: 'text', unique: true})
  username!: string;

  @Field()
  @Property({type: 'text', unique: true})
  email!: string;

  @Property({type: 'text'})
  password!: string;

  @Field()
  @Property({type: 'text'})
  userType!: string;

  @Enum()
  userRole!: UserRole;
  
}