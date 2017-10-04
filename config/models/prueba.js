/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prueba', {
		id_prueba: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		codigo: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'prueba'
	});
};
