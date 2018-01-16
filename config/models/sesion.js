/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sesion', {
		idSesion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_sesion'
		},
		idEquipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'id_equipo'
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: '-',
			field: 'nombre'
		},
		fecha: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'fecha'
		},
		activo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1',
			field: 'activo'
		}
	}, {
		timestamps: false,
		tableName: 'sesion'
	});
};
