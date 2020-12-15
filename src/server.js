import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const init = ({ port, dbInstance }) => {
  // Construct a schema, using GraphQL schema language
  const schema = buildSchema(`
        type Query {
            hello: String
        }
    `);

  // The root provides a resolver function for each API endpoint
  const root = {
    hello: () => {
      return "Hello world!";
    },
  };

  const app = express();
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
  app.listen(port);
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
};

export default init;