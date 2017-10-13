/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('thread', {
		idThread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_thread'
		},
		idRemitente: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'id_remitente'
		},
		mensaje: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'mensaje'
		},
		fecha: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'fecha'
		},
		tipo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'tipo'
		}
	}, {
		timestamps: false,
		tableName: 'thread'
	});
};
