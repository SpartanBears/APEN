/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('codigo', {
		idCodigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_codigo'
		},
		valor: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'valor'
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'titulo'
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'descripcion'
		}
	}, {
		timestamps: false,
		tableName: 'codigo'
	});
};
