/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usuario', {
		idUsuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_usuario'
		},
		idTipoUsuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'tipo_usuario',
				key: 'id_tipo_usuario'
			},
			field: 'id_tipo_usuario'
		},
		usuario: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true,
			field: 'usuario'
		},
		contrasena: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: '-',
			field: 'contraseña'
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: '-',
			field: 'nombre'
		},
		apellidoPaterno: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: '-',
			field: 'apellido_paterno'
		},
		apellidoMaterno: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: '-',
			field: 'apellido_materno'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '-',
			field: 'email'
		},
		especialidad: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: '-',
			field: 'especialidad'
		},
		misc: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'misc'
		},
		activo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1',
			field: 'activo'
		}
	}, {
		timestamps: false,
		tableName: 'usuario'
	});
};
