/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipoEstimulo', {
		idTipoEstimulo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'id_tipo_estimulo'
		},
		descripcion: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'descripcion'
		}
	}, {
		timestamps: false,
		tableName: 'tipo_estimulo'
	});
};
