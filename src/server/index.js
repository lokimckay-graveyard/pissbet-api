import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import getRootResolver from "./resolvers";

const init = ({ port, path, playground, dbInstance }) => {
  const app = express();
  app.use(
    path,
    graphqlHTTP({
      schema,
      rootValue: getRootResolver({ db: dbInstance }),
      graphiql: playground,
    })
  );
  app.listen(port);
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
};

export default init;
