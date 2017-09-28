var Sequelize = require('sequelize')
var conf = require('./dataDB')


/*
Se realiza la conexión a la base de datos, obteniendo los datos que se encuentran en el archivo
dataDB.json
*/
var sequelize = new Sequelize(conf.postgres.database, conf.postgres.user, conf.postgres.pass, {
    host: conf.postgres.host,
    dialect: conf.postgres.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = sequelize