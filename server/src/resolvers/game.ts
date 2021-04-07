import { Game } from "../entities/Game";
import { MyContext } from "src/types";
import { Query, Arg, Ctx, Resolver, ObjectType, Field, Mutation, InputType } from "type-graphql";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class GameInput {
    @Field()
    username: string;
    @Field()
    startTime: string;
    @Field()
    endTime: string;
    @Field()
    score: string;
}

@ObjectType()
class GameResponse {
    @Field(() => Game, { nullable: true })
    game?: Game
}

@Resolver()
export class GameResolver {

    @Query(() => Game, { nullable: true })
    getGame(
        @Arg( 'id' ) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Game | null>{
        return em.findOne(Game, { id });
    }

    @Query(() => [Game], { nullable: true })
    getAllGame(
        @Arg( 'username' ) username: string,
        @Ctx() { em }: MyContext
    ): Promise<Game[] | null>{
        return em.find(Game, { username });
    }

    @Mutation(() => GameResponse)
    async updateGame(
        @Arg('options') options: GameInput,
        @Ctx() { em }: MyContext
    ): Promise<GameResponse> {
        let game;
            const result = await (em as EntityManager)
            .createQueryBuilder(Game)
            .getKnexQuery()
            .insert({
                username: options.username,
                startTime: new Date(),
                endTime: null,
                score: options.score,
            }).returning("*");
            game = result[0];

        return {game};
    }
    
}