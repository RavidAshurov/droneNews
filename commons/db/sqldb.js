const { Sequelize } = require('sequelize')
const droneNewsDb = new Sequelize({
  dialect: 'sqlite',
  storage: `${process.env.DB_LOCATION}/droneNewsDB.sqlite`,
})

module.exports = droneNewsDb
