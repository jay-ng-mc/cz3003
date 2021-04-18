import { Question } from "../entities/Question";
import { MyContext } from "../types";
import { Query, Arg, Ctx, Resolver, Mutation, InputType, Field } from "type-graphql";
import { Level } from "../entities/Level";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class LevelInput {
    @Field()
    level: number;
    @Field()
    createdBy: string;
}

@InputType()
class UpdateInput {
    @Field()
    level: number;
    @Field()
    createdBy: string;
    @Field()
    levelId: number;
    @Field()
    questionId: number;
}

@Resolver()
export class LevelResolver {

    @Query(() => Level, { nullable: true })
    async getLevel(
        @Ctx() { em }: MyContext
    ): Promise<Level | null>{
        return await em.findOne(Level,{level: 1}, ['questions']);
    }

    @Mutation(() => Level)
    async createLevel(
        @Arg('options') options: LevelInput,
        @Ctx() { em }: MyContext
    ): Promise<Level | undefined | null> {
        const level1 = await em.findOne(Level, {$and:[ {level: options.level},{createdBy: options.createdBy}] })
        if (level1 != null){
            return level1;
        }else{
            let level;
            const result = await (em as EntityManager)
            .createQueryBuilder(Level)
            .getKnexQuery()
            .insert({
                level: options.level,
                date_created: new Date(),
                created_by: options.createdBy
            }).returning("*");
            level = result[0];
            return level;
        }
    

    }

    @Mutation(() => Level)
    async updateLevel(
        @Arg('options') options: UpdateInput,
        @Ctx() { em }: MyContext
    ):  Promise<Level | undefined | null>  {
        const level = await em.findOne(Level, {$and:[ {level: options.level},{createdBy: options.createdBy}] }, ['questions'])
        if (level != null){
            await level.questions.init();
            const question = await em.findOne(Question,{id: options.questionId})
            if (question!=null){
                level.questions.add(question)
            }
            await em.persistAndFlush(level)
            return level;
        } else{
            return null
        }
    }

}