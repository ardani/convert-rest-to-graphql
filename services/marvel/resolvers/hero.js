const {map, first} = require('lodash');

const resolvers = {
  Query: {
    hero: async (_, {id}, {dataSources}) => {
      const res = await dataSources.marvelApi.getHero(id);
      const data = res.data;
      const item = first(data.results);
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        thumbnail: item.thumbnail
      }
    },
    heros: async (_, {name = null, offset, limit}, {dataSources}) => {
      const res = await dataSources.marvelApi.getHeros(name, offset, limit);
      const data = res.data;

      // formatted results
      const edges = map(data.results, function (item) {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          thumbnail: item.thumbnail
        }
      });

      return {
        edges: edges,
        page_info: {
          limit: data.limit,
          offset: data.offset,
          total: data.total
        }
      }
    },
  },
  Hero: {
    comics: async (parent, {offset, limit }, { dataSources }) => {
      const res = await dataSources.marvelApi.getHeroComics(parent.id, offset, limit);
      const data = res.data;
      // formatted results
      const edges = map(data.results, function (item) {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          resourceURI: item.resourceURI
        }
      });

      return {
        edges: edges,
        page_info: {
          limit: data.limit,
          offset: data.offset,
          total: data.total
        }
      }
    }
  }
}

module.exports = resolvers;