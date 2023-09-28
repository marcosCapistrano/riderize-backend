import { ObjectType, Field, Int } from "type-graphql";
import User from "./User.ts"; // Import the User entity
import Ride from "./Ride.ts"; // Import the Ride entity

@ObjectType({ description: "Object representing user subscriptions to rides" })
export default class UsersOnRides {
    @Field(_type => Int)
    id!: number;

    @Field(_type => Int)
    user_id!: number;

    @Field(_type => Int)
    ride_id!: number;
}
