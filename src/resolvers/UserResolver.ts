import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import User from "../entities/User.ts"; // Import the User entity
import prisma from "../prisma.ts";

@Resolver(of => User)
export class UserResolver {
    // Query to fetch a single user by ID
    @Query(_returns => User, { nullable: true })
    async user(@Arg("id", _type => Int) id: number): Promise<User | null> {
        try {
            const user = await prisma.user.findFirst({where: {id}});
            return user || null;
        } catch (error) {
            throw new Error(`Unable to fetch user`);
        }
    }

    // Query to list all users
    @Query(_returns => [User])
    async users(): Promise<User[]> {
        try {
            const allUsers = await prisma.user.findMany();
            return allUsers;
        } catch (error) {
            throw new Error(`Unable to fetch users`);
        }
    }

    // Implement other resolver functions as needed
}
