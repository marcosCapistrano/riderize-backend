import "reflect-metadata";
import { Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import prisma from "../prisma.ts";

@ObjectType()
export class User {
    @Field((type) => Int)
    id: number

    @Field((type) => String)
    email: string

    @Field((type) => String, { nullable: true })
    name?: string | null
}

@Resolver(User)
export class UserResolver {
    @Query((returns) => [User], { nullable: true })
    async allUsers() {
        return prisma.user.findMany()
    }
}