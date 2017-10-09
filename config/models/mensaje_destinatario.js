/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mensajeDestinatario', {
		idThreadDestinatario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_thread_destinatario'
		},
		idThread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'thread',
				key: 'id_thread'
			},
			field: 'id_thread'
		},
		idUsuarioDestino: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			},
			field: 'id_usuario_destino'
		},
		estadoLectura: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			field: 'estado_lectura'
		}
    }, {
        timestamps: false,
		tableName: 'mensaje_destinatario'
	});
};
