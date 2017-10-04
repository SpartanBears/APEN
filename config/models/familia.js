/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('familia', {
		id_familia: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'familia'
	});
};
