/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('alumno', {
		idAlumno: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_alumno'
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'nombre'
		},
		apellidoPaterno: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'apellido_paterno'
		},
		apellidoMaterno: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'apellido_materno'
		},
		direccion: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'direccion'
		},
		ciudad: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'ciudad'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'email'
		}
    }, {
        timestamps: false,
		tableName: 'alumno'
	});
};
