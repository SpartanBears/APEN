/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('asignacionCodigo', {
		idAsignacionCodigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_asignacion_codigo'
		},
		idAsignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'asignacion',
				key: 'id_asignacion'
			},
			field: 'id_asignacion'
		},
		idCodigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'codigo',
				key: 'id_codigo'
			},
			field: 'id_codigo'
		}
    }, {
        timestamps: false,
		tableName: 'asignacion_codigo'
        });
};
