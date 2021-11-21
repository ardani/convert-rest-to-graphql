const { ApolloServer } = require('apollo-server');
const env = require('dotenv').config();
const dataSources = require('./dataSources/index');
const schema = require('./services/gateway');

if (env.error) {
  throw env.error
}

const server = new ApolloServer({
  schema,
  dataSources
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});