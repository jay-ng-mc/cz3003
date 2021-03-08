import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default{
    migrations: {
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Post],
    dbName: 'postgres',
    type: 'postgresql',
    password: 'postgres',
    debug: !__prod__,
  }as Parameters<typeof MikroORM.init>[0];
