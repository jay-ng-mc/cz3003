import { MyContext } from "src/types";
import { Query, Arg, Ctx, Resolver } from "type-graphql";
import { Character } from "../entities/Character";

@Resolver()
export class CharacterResolver {

    @Query(() => Character, { nullable: true })
    getCharacter(
        @Arg( 'username' ) username: string,
        @Ctx() { em }: MyContext
    ): Promise<Character | null>{
        return em.findOne(Character, { username });
    }

}