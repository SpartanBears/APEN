/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('asignacion', {
		id_asignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_usuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			}
		},
		id_respuesta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'respuesta',
				key: 'id_respuesta'
			}
		},
		estado: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		}
	}, {
		tableName: 'asignacion'
	});
};
