const crypto = require('crypto');
const { RESTDataSource } = require('apollo-datasource-rest');
const { ApolloError } = require('apollo-server-errors');

class MarvelApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://gateway.marvel.com:443/v1';
  }

  willSendRequest(request) {
    const ts = Math.floor( Date.now()/1000);
    const hashRaw = ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_API_KEY
    request.params.set('apikey', process.env.MARVEL_API_KEY);
    request.params.set('ts', ts);
    request.params.set('hash', crypto.createHash('md5').update(hashRaw).digest('hex'));
  }

  /**
   * @param {null} name
   * @param {Object|Object[]|undefined} offset
   * @param {Object|Object[]|undefined} limit
   */
  async getHeros(name, offset = 0, limit = 20) {
    let params = {
      offset,
      limit
    };

    if (name) {
      params.name = name;
    }

    return await this.get('public/characters', params);
  }

  /**
   * @param {string} id
   */
  async getHero(id) {
    const res = await this.get('public/characters/' + id);
    if (res.code !== 200) {
      throw new ApolloError('hero not found');
    }

    return res;
  }

  /**
   * @param {string} id
   * @param {Object|Object[]|undefined} offset
   * @param {Object|Object[]|undefined} limit
   */
  async getHeroComics(id, offset = 0, limit = 20) {
    return await this.get('public/characters/' + id + '/comics', {
      offset,
      limit
    });
  }
}

module.exports = new MarvelApi();