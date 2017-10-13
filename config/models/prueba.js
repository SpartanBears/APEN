/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prueba', {
		idPrueba: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_prueba'
		},
		codigo: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'codigo'
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'titulo'
		},
		activo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1',
			field: 'activo'
		}
	}, {
		timestamps: false,
		tableName: 'prueba'
	});
};
