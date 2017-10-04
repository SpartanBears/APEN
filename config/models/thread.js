/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('thread', {
		id_thread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_remitente: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		mensaje: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: false
		},
		tipo: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'thread'
	});
};
