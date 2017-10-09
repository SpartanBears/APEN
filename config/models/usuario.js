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
			allowNull: false,
			field: 'contraseña'
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
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'email'
		}
    }, {
        timestamps: false,
		tableName: 'usuario'
	});
};
