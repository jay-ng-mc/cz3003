import { Game } from "../entities/Game";
import { MyContext } from "src/types";
import { Query, Arg, Ctx, Resolver, ObjectType, Field, Mutation, InputType } from "type-graphql";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class StartGameInput {
    @Field()
    gameId: number;
    @Field()
    username: string;
    @Field()
    type: string;
    @Field()
    difficulty: number;

}
@InputType()
class EndGameInput {
    @Field()
    gameId: number;
    @Field()
    username: string;
    @Field()
    score: number;
    @Field()
    totalQuestion: number;
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
        @Arg( 'username' ) username: string,
        @Arg( 'gameId' ) gameId: number,
        @Ctx() { em }: MyContext
    ): Promise<Game | null>{
        return em.findOne(Game, {$and:[ {username},{gameId}] });
    }

    @Query(() => [Game], { nullable: true })
    getAllGame(
        // @Arg( 'username' ) username: string,
        @Ctx() { em }: MyContext
    ): Promise<Game[] | null>{
        return em.find(Game, { });
    }

    @Query(() => [Game], { nullable: true })
    getAllGameByUsername(
        @Arg( 'username' ) username: string,
        @Ctx() { em }: MyContext
    ): Promise<Game[] | null>{
        return em.find(Game, { username });
    }

    @Mutation(() => GameResponse)
    async updateStartGame(
        @Arg('options') options: StartGameInput,
        @Ctx() { em }: MyContext
    ): Promise<GameResponse> {
        let game;
        const result = await (em as EntityManager)
        .createQueryBuilder(Game)
        .getKnexQuery()
        .insert({
            game_id: options.gameId,
            username: options.username,
            type: options.type,
            difficulty: options.difficulty,
            start_time: new Date(),
            end_time: null,
            score: null,
            total_question: null,
        }).returning("*");
        game = result[0];

        return {game};
    }

    @Mutation(() => GameResponse)
    async updateEndGame(
        @Arg('options') options: EndGameInput,
        @Ctx() { em }: MyContext
    ):  Promise<GameResponse | undefined | null>  {
        const game = await em.findOne(Game, {$and: [{gameId: options.gameId},{username: options.username}]})
        if (game != null){
            game.endTime = new Date();
            game.score = options.score;
            game.totalQuestion = options.totalQuestion;
            await em.persistAndFlush(game);
        } else{
            return null
        }
        return {game};
    }
    
}