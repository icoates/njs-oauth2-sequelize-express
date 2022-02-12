var Sequelize = require('sequelize')
const db = new Sequelize(process.env.database, process.env.username, process.env.password,  {
    host: process.env.host,
    dialect : process.env.dialect,
    logging: true,
    timezone: "-03:00"

})

module.exports = db