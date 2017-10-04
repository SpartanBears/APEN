/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('asignacion_codigo', {
		id_asignacion_codigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_asignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'asignacion',
				key: 'id_asignacion'
			}
		},
		id_codigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'codigo',
				key: 'id_codigo'
			}
		}
	}, {
		tableName: 'asignacion_codigo'
	});
};
