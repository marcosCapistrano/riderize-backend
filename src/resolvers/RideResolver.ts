import { Resolver, Query, Mutation, Arg, Int, InputType, Field } from "type-graphql";
import prisma from "../prisma.ts";
import Ride from "../entities/Ride.ts"; // Import the Ride entity
import { isAfter } from "date-fns";
import UsersOnRides from "entities/UsersOnRides.ts";

@InputType()
class SubscribeToRideInput {
    @Field(_type => Int)
    ride_id: number;

    @Field(_type => Int)
    user_id: number;

    @Field(_type => Date)
    subscription_date: Date;
}


@Resolver(of => Ride)
export class RideResolver {
    // Query to fetch a single ride by ID
    @Query(_returns => Ride, { nullable: true })
    async ride(@Arg("id", _type => Int) id: number): Promise<Ride | null> {
        try {
            const ride = await prisma.ride.findFirst({ where: { id } });
            return ride || null;
        } catch (error) {
            throw new Error(`Unable to fetch ride`);
        }
    }

    // Query to list all rides
    @Query(_returns => [Ride])
    async rides(): Promise<Ride[]> {
        try {
            const allRides = await prisma.ride.findMany({});
            return allRides;
        } catch (error) {
            throw new Error(`Unable to fetch rides`);
        }
    }

    // Mutation to create a new ride
    @Mutation(_returns => Ride)
    async createRide(
        @Arg("name", _type => String) name: string,
        @Arg("start_date", _type => Date) start_date: Date,
        @Arg("start_date_registration", _type => Date) start_date_registration: Date,
        @Arg("end_date_registration", _type => Date) end_date_registration: Date,
        @Arg("start_place", _type => String) start_place: string,
        @Arg("participants_limit", _type => Int, { nullable: true }) participants_limit: number | null,
        @Arg("owner_id", _type => Int) owner_id: number
    ): Promise<Ride> {
        try {
            const ride = await prisma.ride.create({
                data: {
                    name,
                    start_date,
                    start_date_registration,
                    end_date_registration,
                    start_place,
                    participants_limit,
                    owner_id
                }
            });

            return ride;
        } catch (error) {
            throw new Error(`Unable to create ride`);
        }
    }

    @Mutation(_returns => Ride)
    async subscribeToRide(@Arg("input", _type => Date) input: SubscribeToRideInput): Promise<UsersOnRides> {
        try {
            const { ride_id, user_id, subscription_date } = input;

            // Check if the ride exists
            const ride = await prisma.ride.findFirst({ where: { id: ride_id } });
            if (!ride) {
                throw new Error(`Ride with ID ${ride_id} not found.`);
            }

            // Check if the subscription_date is not after end_date_registration
            if (isAfter(subscription_date, ride.end_date_registration)) {
                throw new Error(`Subscription date is after the end of registration for this ride.`);
            }

            // Check if the user exists
            const user = await prisma.user.findFirst({ where: { id: user_id } });
            if (!user) {
                throw new Error(`User with ID ${user_id} not found.`);
            }

            // Create a new UsersOnRides entry to represent the subscription
            const userOnRide = await prisma.usersOnRides.create({
                data: {
                    user_id: user_id,
                    ride_id: ride_id,
                }
            });

            return userOnRide;
        } catch (error) {
            throw new Error(`Unable to subscribe to ride`);
        }
    }
}
