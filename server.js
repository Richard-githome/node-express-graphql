const path = require("path")
const express = require("express");
const { graphqlHTTP } = require("express-graphql")
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"))
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"))

const PORT = 3000

const schema = makeExecutableSchema({ 
  typeDefs: typesArray,
  resolvers: resolversArray
 });

const app = express();

app.use(
  "/graph",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Running a graphql server...@ port ${PORT}`);
});
