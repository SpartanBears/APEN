/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('alumno', {
		id_alumno: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		apellido_paterno: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		apellido_materno: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		direccion: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		ciudad: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'alumno'
	});
};
