/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('correctorSesion', {
		idCorrectorSesion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'id_corrector_sesion'
		},
		idSesion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'id_sesion'
		},
		idCorrector: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'id_corrector'
		}
	}, {
		timestamps: false,
		tableName: 'corrector_sesion'
	});
};
