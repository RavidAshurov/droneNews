const { Sequelize } = require('sequelize');
const droneNewsDb = new Sequelize({
  dialect: 'sqlite',
  storage: '/Users/ravidashurov/Documents/POCs/DroneNews/droneNewsDB.sqlite',
});

module.exports = droneNewsDb;