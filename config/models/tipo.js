/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipo', {
		id_tipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'tipo'
	});
};
