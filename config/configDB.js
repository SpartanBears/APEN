var Sequelize = require('sequelize')
var conf = require('./dataDB')


/*
Se realiza la conexión a la base de datos, obteniendo los datos que se encuentran en el archivo
dataDB.json
*/
var sequelize = new Sequelize(conf.mysql.database, conf.mysql.user, conf.mysql.pass, {
    host: conf.mysql.host,
    dialect: conf.mysql.dialect,
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    }
})

module.exports = sequelize