import { MyContext } from "src/types";
import { Query, Arg, Ctx, Resolver, Mutation, InputType, Field } from "type-graphql";
import { Character } from "../entities/Character";

@InputType()
class CharacterInput {
    @Field()
    username: string;
    @Field()
    characterId: number;
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

    @Mutation(() => Character)
    async updateCharacter(
        @Arg('options') options: CharacterInput,
        @Ctx() { em }: MyContext
    ): Promise<Character | null> {
        const character = await em.findOne(Character, { username: options.username })
        if (character != null){
            character.characterId = options.characterId;
            
            await em.persistAndFlush(character);
        } else{
            return null
        }
        return character;
    }

}