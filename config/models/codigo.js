/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('codigo', {
		id_codigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		valor: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'codigo'
	});
};
