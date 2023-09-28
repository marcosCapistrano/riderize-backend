import { ObjectType, Field, Int } from "type-graphql";
import User from "./User.ts"; // Import the User entity

@ObjectType({ description: "Object representing the rides" })
export default class Ride {
    @Field(_type => Int)
    id!: number;

    @Field(_type => String)
    name!: string;

    @Field(_type => Date)
    start_date!: Date;

    @Field(_type => Date)
    start_date_registration!: Date;

    @Field(_type => Date)
    end_date_registration!: Date;

    @Field(_type => String, { nullable: true })
    additional_information: string | null;

    @Field(_type => String)
    start_place!: string;

    @Field(_type => Int, { nullable: true })
    participants_limit: number | null;

    @Field(_type => Int)
    owner_id: number;
}
