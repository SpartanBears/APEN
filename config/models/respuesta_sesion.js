/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('respuestaSesion', {
		idRespuestaSesion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_respuesta_sesion'
		},
		idSesion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'id_sesion'
		},
		idRespuesta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'id_respuesta'
		}
	}, {
		timestamps: false,
		tableName: 'respuesta_sesion'
	});
};
