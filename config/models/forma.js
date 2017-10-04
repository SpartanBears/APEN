/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('forma', {
		id_forma: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_prueba: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'prueba',
				key: 'id_prueba'
			}
		},
		forma: {
			type: DataTypes.STRING(45),
			allowNull: false
		}
	}, {
		tableName: 'forma'
	});
};
