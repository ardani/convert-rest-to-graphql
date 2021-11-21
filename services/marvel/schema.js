const { join } = require('path');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const {loadSchemaSync} = require("@graphql-tools/load");
const {GraphQLFileLoader} = require("@graphql-tools/graphql-file-loader");
const resolvers = require('./resolvers/resolvers');

const schema = loadSchemaSync(join(__dirname, './schema/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

module.exports = {
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers
  })
}