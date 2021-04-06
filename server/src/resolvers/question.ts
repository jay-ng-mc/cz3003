import { Question } from "../entities/Question";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";


@Resolver()
export class QuestionResolver {

    @Query(() => Question, { nullable: true })
    getQuestion(
        @Arg( 'id' ) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Question | null>{
        return em.findOne(Question, { id });
    }
    
}