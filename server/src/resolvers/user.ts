import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { EntityManager } from "@mikro-orm/postgresql";
import { COOKIE_NAME } from "../constants";

@InputType()
class RegisterInput {
    @Field()
    email: string;
    @Field()
    username: string;
    @Field()
    password: string;
    @Field()
    password2: string;
}

@InputType()
class LoginInput {
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User
}

@Resolver()
export class UserResolver {

    @Query(() => User, {nullable: true})
    async me(
        @Ctx() { em, req }: MyContext
    ) {
        if (!req.session.userId){
            return null
        } 
        const user = await em.findOne(User, {id: req.session.userId});
        return user;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: RegisterInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        if (options.username.length <= 2){
            return {
                errors: [{
                    field: 'username',
                    message: 'length must be greater than 2'
                }]
            }
        }
        if (options.password.length <= 3){
            return {
                errors: [{
                    field: 'password',
                    message: 'length must be greater than 3'
                }]
            }
        }
        if (options.password != options.password2){
            return{
                errors: [{
                    field: 'password',
                    message: 'different passwords entered'
                }]
            }
        }
        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            const result = await (em as EntityManager)
            .createQueryBuilder(User)
            .getKnexQuery()
            .insert({
                email: options.email,
                username: options.username,
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date(),
            }).returning("*");
            user = result[0];
        }catch(err){
            if (err.detail.includes("email")) {
                return {
                    errors: [{
                        field: "email",
                        message: "email already taken",
                    }]
                }
            }
            if (err.detail.includes("username")) {
                return {
                    errors: [{
                        field: "username",
                        message: "username already taken",
                    }]
                }
            }
        }

        return {user};
    }

    
    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: LoginInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username });
        if (!user) {
            return{
                errors: [{
                    field: 'username',
                    message: "incorrect username or password",
                }],
            };
        }
        const valid = await argon2.verify(user.password, options.password);
        if (!valid){
            return {
                errors: [{
                    field: 'password',
                    message: "incorrect username or password",
                }],
            };
        }
        
        req.session.userId = user.id;

        return {
            user
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext){
        return new Promise( (resolve) => 
            req.session.destroy((err) =>{
                res.clearCookie(COOKIE_NAME);
                if(err){
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        )
    }
}
