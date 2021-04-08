import { MikroORM } from "@mikro-orm/core";
//import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import "reflect-metadata";
import cors from "cors";
import { MyContext } from "./types";
import { COOKIE_NAME, __prod__ } from "./constants";
import session from "express-session";
import { QuestionResolver } from "./resolvers/question";
import { GameResolver } from "./resolvers/game";
import { StudentTeacherResolver } from "./resolvers/studentTeacher";
import { CharacterResolver } from "./resolvers/character";

const main = async () => {
  // connect to database
  const orm = await MikroORM.init(microConfig);

  // run migration
  await orm.getMigrator().up();

  //create app()
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(express.urlencoded({extended: false}));

  //create session

  app.use(session({
    name: COOKIE_NAME,
    saveUninitialized: false,
    cookie:{
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      sameSite: 'lax',
      secure: __prod__,
    },
    secret: 'secret',
    resave: false,
  }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ UserResolver, QuestionResolver, GameResolver, StudentTeacherResolver, CharacterResolver ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res })
  });

  apolloServer.applyMiddleware({ 
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })

}

main();

