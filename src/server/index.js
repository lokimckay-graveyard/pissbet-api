import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import getRootResolver from "./resolvers";

const init = ({ domain, port, url, playground, dbInstance }) => {
  const app = express();
  app.use(
    url,
    graphqlHTTP({
      schema,
      rootValue: getRootResolver({ db: dbInstance }),
      graphiql: playground,
    })
  );
  app.listen(port, domain);
  console.log(`Running a GraphQL API server at http://${domain}:${port}${url}`);
};

export default init;
