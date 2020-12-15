import { selectById, selectCount, selectOrderedByField } from "../db/ops";

const getRootResolver = ({ db }) => {
  return {
    participants: async ({ count, offset }) => {
      const results = await selectOrderedByField({
        db,
        table: "participants",
        count,
        offset,
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
  };
};

export default getRootResolver;
