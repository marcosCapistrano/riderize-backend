import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import Profile from "../entities/Profile"; // Import the Profile entity
import prisma from "../prisma";

@Resolver(of => Profile)
export class ProfileResolver {
    // Query to fetch a single profile by ID
    @Query(_returns => Profile, { nullable: true })
    async profile(@Arg("id", _type => Int) id: number): Promise<Profile | null> {
        try {
            const profile = await prisma.profile.findFirst({where: {id}});
            return profile || null;
        } catch (error) {
            throw new Error(`Unable to fetch profile`);
        }
    }

    // Query to list all profiles
    @Query(_returns => [Profile])
    async profiles(): Promise<Profile[]> {
        try {
            const allProfiles = await prisma.profile.findMany();
            return allProfiles;
        } catch (error) {
            throw new Error(`Unable to fetch profiles`);
        }
    }

    // Implement other resolver functions as needed
}
