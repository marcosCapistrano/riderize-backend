import { ObjectType, Field, Int } from "type-graphql";
import User from "./User"; // Import the User entity

@ObjectType({ description: "Object representing a user's profile" })
export default class Profile {
    @Field(_type => Int)
    id!: number;

    @Field()
    bio: string | null;

    @Field()
    user_id: number;
}
