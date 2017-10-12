/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mensaje', {
		idMensaje: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_mensaje'
		},
		idThread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'thread',
				key: 'id_thread'
			},
			field: 'id_thread'
		},
		idRemitente: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			},
			field: 'id_remitente'
		},
		estadoLectura: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'estado_lectura'
		},
		estadoEnvio: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'estado_envio'
		}
	}, {
		timestamps: false,
		tableName: 'mensaje'
	});
};
