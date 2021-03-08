import { MikroORM } from "@mikro-orm/core";
//import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";

const main = async () => {
  // connect to database
  const orm = await MikroORM.init(microConfig);

  // run migration
  await orm.getMigrator().up();

  // run sql

  // upload things to sql
  // const post1 = orm.em.create(Post, {title: 'my second post1'});
  // await orm.em.persistAndFlush(post1);

  // find things in sql

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em })
  })

  // app.get('/',(_, res) => {
  //     res.send("hello");
  // })

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })

}

main();

