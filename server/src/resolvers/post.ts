import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    // query is for getting data
    // @Query(() => Post, { nullable: true })
    // post(
    //     @Arg('id', () => Int) id: number,
    //     @Ctx() { em }: MyContext
    // ): Promise<Post | null> {
    //     return em.findOne(Post, { id });
    // }

    //mutation is for updating data, deleting, inserting
    @Mutation(() => Post)
    async createPost(
        @Arg('title', () => String) title: String,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, {title});
        await em.persistAndFlush(post);
        return post;
    }

}