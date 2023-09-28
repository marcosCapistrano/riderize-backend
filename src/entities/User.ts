import { ObjectType, Field, Int } from "type-graphql";

@ObjectType({ description: "Object representing a user" })
export default class User {
    @Field(_type => Int)
    id!: number;

    @Field(_type => String)
    email!: string;

    @Field(_type => String, { nullable: true })
    name: string | null;
}
