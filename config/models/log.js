/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('log', {
		idLog: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_log'
		},
		idUsuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			},
			field: 'id_usuario'
		},
		fecha: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'fecha'
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'descripcion'
		}
	}, {
		timestamps: false,
		tableName: 'log'
	});
};
