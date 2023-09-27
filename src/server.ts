import "reflect-metadata";
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSchema, buildSchemaSync } from "type-graphql";
import { resolvers } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import prisma from './prisma.ts';
import { UserResolver } from "./resolvers/User.ts";

const app = express();
const httpServer = http.createServer(app);

export interface Context {
    prisma: PrismaClient
}

const schema = buildSchemaSync({
  resolvers: [UserResolver],
})

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async (): Promise<Context> => ({ prisma }),
    })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);