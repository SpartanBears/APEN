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
			allowNull: true,
			defaultValue: '-',
			field: 'nombre'
		},
		apellidos: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: '-',
			field: 'apellidos'
		},
		run: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: '-',
			field: 'run'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '-',
			field: 'email'
		},
		activo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1',
			field: 'activo'
		}
	}, {
		timestamps: false,
		tableName: 'alumno'
	});
};
