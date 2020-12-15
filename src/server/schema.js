import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        participants(count: Int! offset: Int): [Participant]!
        participant(id: ID!): Participant
        countParticipants: Int!
    }

    type Participant {
        id: ID!
        username: String
        balance: Int
    }

`);

export default schema;
