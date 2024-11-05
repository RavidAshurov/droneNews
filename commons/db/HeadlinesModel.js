const { DataTypes } = require('sequelize');
const droneNewsDb = require('./sqldb.js');
const HeadlinesModel = droneNewsDb.define('headlines', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true
  },
  source_id: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING(30)
  },
  title: {
    type: DataTypes.STRING(100)
  },
  description:{
    type: DataTypes.STRING(200)
  },
  url: {
    type: DataTypes.STRING(100)
  },
  urlToImage: {
    type: DataTypes.STRING(100)
  },
  publishedAt: {
    type: DataTypes.DATE
  },
  content: {
    type: DataTypes.STRING(200)
  },
  ttl: {
    type: DataTypes.DATE
  }
}, {
  createdAt: true
});

HeadlinesModel.sync();

module.exports = HeadlinesModel;