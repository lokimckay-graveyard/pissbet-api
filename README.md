# Pissbet-API

## Get started

1. `git clone https://github.com/sneyed/pissbet-api.git`
1. `npm install`
1. `npm run dev`

- An express + GraphQL server will boot up
- A local SQLite3 database will spawn and populate with mock data

Visit the GraphiQL playground interface to play around with test queries.  
By default it is at [`localhost:4000`](http://localhost:4000)

## Deployment

1. `git clone https://github.com/sneyed/pissbet-api.git`
1. `npm install`
1. `npm start`

### Options

```
npm run start -- <options>

-d (devMode)        Developer mode - populates the SQLite3 db with mockdata if enabled
-p (playground)     Enable/disable the GraphiQL playground
--port              Specify which port the GraphQL API will run on (default 4000)
--path              Specify the URL path where the GraphQL API is accessible (default /graphQL)

```

Example

```
npm run start -dp --port=1234 path="/myGraphQLEndpoint"
```
