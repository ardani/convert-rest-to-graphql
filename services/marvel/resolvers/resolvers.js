const heroResolver = require("./hero");
const {mergeResolvers} = require("@graphql-tools/merge");

module.exports = mergeResolvers([heroResolver]);