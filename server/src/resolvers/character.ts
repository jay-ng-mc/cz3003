import { MyContext } from "src/types";
import { Query, Arg, Ctx, Resolver, Mutation, InputType, Field, ObjectType } from "type-graphql";
import { Character } from "../entities/Character";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class CharacterInput {
    @Field()
    username: string;
    @Field()
    characterId: number;
}

@ObjectType()
class CharacterResponse {
    @Field(() => Character, { nullable: true })
    character?: Character
}

@Resolver()
export class CharacterResolver {

    @Query(() => Character, { nullable: true })
    getCharacter(
        @Arg( 'username' ) username: string,
        @Ctx() { em }: MyContext
    ): Promise<Character | null>{
        return em.findOne(Character, { username });
    }

    @Mutation(() => CharacterResponse)
    async createCharacter(
        @Arg('options') options: CharacterInput,
        @Ctx() { em }: MyContext
    ) {
        var character
        const result = await (em as EntityManager)
            .createQueryBuilder(Character)
            .getKnexQuery()
            .insert({
                username: options.username,
                character_id: options.characterId
            }).returning("*");
        character = result[0]
    }

    @Mutation(() => CharacterResponse)
    async updateCharacter(
        @Arg('options') options: CharacterInput,
        @Ctx() { em }: MyContext
    ): Promise<CharacterResponse | null> {
        var character
        character = await em.findOne(Character, { username: options.username })
        if (character != null){
            character.characterId = options.characterId;
            await em.persistAndFlush(character);
        } else{
            return null
        }
        return {character}
    }

}