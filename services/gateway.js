const { stitchSchemas } = require('@graphql-tools/stitch');
const marvelSchema = require('./marvel/schema');

const gateway = stitchSchemas({
  subschemas: [
    marvelSchema
  ]
});

module.exports = gateway;