/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usuario', {
		id_usuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_tipo_usuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'tipo_usuario',
				key: 'id_tipo_usuario'
			}
		},
		usuario: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true
		},
		contraseña: {
			type: DataTypes.STRING(45),
			allowNull: false
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
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'usuario'
	});
};
