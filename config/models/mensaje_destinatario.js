/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mensaje_destinatario', {
		id_thread_destinatario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_thread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'thread',
				key: 'id_thread'
			}
		},
		id_usuario_destino: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			}
		},
		estado_lectura: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		}
	}, {
		tableName: 'mensaje_destinatario'
	});
};
