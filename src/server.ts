//@ts-nocheck
import "reflect-metadata";
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSchema, buildSchemaSync } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import prisma from './prisma.ts';
import { UserResolver } from "./resolvers/UserResolver.ts";
import { RideResolver } from "./resolvers/RideResolver.ts";

import {auth} from 'express-openid-connect'

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: 'http://localhost:3000',
    clientID: 'Kv5gjN9Jt45DrAE5KJbH1TPgYGN5rvb1',
    issuerBaseURL: 'https://dev-n66nw56pxek0yoll.us.auth0.com'
};

const app = express();
const httpServer = http.createServer(app);

export interface Context {
    prisma: PrismaClient
}

const schema = buildSchemaSync({
    resolvers: [UserResolver, RideResolver],
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
    auth(config),
    expressMiddleware(server, {
        context: ({ req, res }) => {
            // Get the user information from the Auth0 authentication
            const user = req.oidc.user;

            // Add the user object to the context
            return { user };
        },
    })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);