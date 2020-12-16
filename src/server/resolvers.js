import {
  selectAll,
  selectById,
  selectCount,
  selectOrderedByField,
} from "../db/ops";

const getRootResolver = ({ db }) => {
  return {
    participants: async ({ count, offset }) => {
      const results = await selectOrderedByField({
        db,
        table: "participants",
        count,
        offset,
        orderBy: "balance",
        direction: "DESC",
      });
      return results;
    },
    participant: async ({ id }) => {
      const result = selectById({ db, table: "participants", id });
      return result;
    },
    countParticipants: async () => {
      const total = await selectCount({ db, table: "participants" });
      return total["COUNT(*)"];
    },
    allBets: async () => {
      const results = selectAll({ db, table: "bets" });
      return results;
    },
    allMatches: async () => {
      const results = selectAll({ db, table: "matches" });
      return results;
    },
  };
};

export default getRootResolver;
