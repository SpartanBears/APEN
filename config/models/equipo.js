/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('equipo', {
		idEquipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_equipo'
		},
		nombre: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'nombre'
		}
	}, {
		timestamps: false,
		tableName: 'equipo'
	});
};
