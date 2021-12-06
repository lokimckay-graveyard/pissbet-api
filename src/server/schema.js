import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        participants(count: Int! offset: Int): [Participant]!
        participant(id: ID!): Participant
        countParticipants: Int!
        playerByTag(tag: String!): Player
        allPlayers: [Player]!
        allBets: [Bet]!
        allMatches: [Match]!
    }

    type Player {
        id: ID!
        tag: String
    }

    type Participant {
        id: ID!
        username: String
        balance: Int
    }

    type Bet {
        id: ID!
        participant_id: ID!
        match_id: ID!
        player_number: Int!
        volume: Int!
    }

    type Match {
        id: ID!
        player_1_id: ID!
        player_2_id: ID!
        betting_open: Boolean
        winning_player_id: ID
    }
`);

export default schema;
