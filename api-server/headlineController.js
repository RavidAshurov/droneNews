const HeadlinesModel = require('./db/HeadlinesModel');
const { Op } = require('sequelize');
const SEARCH_FIELDS = ['title', 'content', 'author', 'description'];

module.exports = {
  async getHeadlines(req) { 
    const options = {
      order: ['publishedAt'],
      attributes: {exclude:[ 'ttl']}
    };

    if (req.query?.search?.length) { 
      const keyword = req.query?.search;

      // Validate search words (alphanumeric and punctuation marks, at least 2 characters)
      if (!keyword.match(/^[ a-zA-Z0-9,.-:]{2,}$/)) { 
        throw new Error("Invalid search phrase");
      }

      options.where = {
        [Op.or]: SEARCH_FIELDS.map(field => ({ [field]: { [Op.substring]: keyword } }))
      };
      console.warn(options);
    }

    const recentHeadlines = await HeadlinesModel.findAll(options);
    console.log(`${recentHeadlines?.length} headlines retrieved.`)
    return recentHeadlines;
  }
}