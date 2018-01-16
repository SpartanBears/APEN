var Sequelize = require('sequelize')
var conf = require('./dataDB')


/*
Se realiza la conexión a la base de datos, obteniendo los datos que se encuentran en el archivo
dataDB.json
*/
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('YYYY-MM-DD HH:mm:ss');
};
var sequelize = new Sequelize(conf.mysql.database, conf.mysql.user, conf.mysql.pass, {
    host: conf.mysql.host,
    timezone: '-03:00',
    dialect: conf.mysql.dialect,
    pool: {
        max: 130,
        min: 10,
        idle: 180000,
        evict: 180000,
        acquire: 180000
    }
})

module.exports = sequelize