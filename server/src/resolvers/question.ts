import { Question } from "../entities/Question";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";


@Resolver()
export class QuestionResolver {

    @Query(() => Question, { nullable: true })
    getQuestion(
        @Arg( 'id' ) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Question | null>{
        return em.findOne(Question, { id } ,['levels']);
    }

    @Query(() => [Question], { nullable: true })
    getAllQuestion(
        @Arg( 'type' ) type: string,
        @Arg( 'difficulty' ) difficulty: number,
        @Ctx() { em }: MyContext
    ): Promise<Question[] | null>{
        return em.find(Question, {$and: [ {type:type}, {difficulty:difficulty}]});
    }
    
}