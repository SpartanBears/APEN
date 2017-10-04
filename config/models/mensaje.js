/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mensaje', {
		id_mensaje: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_thread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'thread',
				key: 'id_thread'
			}
		},
		id_remitente: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			}
		},
		estado_lectura: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		estado_envio: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		}
	}, {
		tableName: 'mensaje'
	});
};
