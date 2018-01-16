/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('respuesta', {
		idRespuesta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_respuesta'
		},
		idPregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'pregunta',
				key: 'id_pregunta'
			},
			field: 'id_pregunta'
		},
		idAlumno: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'alumno',
				key: 'id_alumno'
			},
			field: 'id_alumno'
		},
		valor: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'valor'
		},
		activo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1',
			field: 'activo'
		}
	}, {
		timestamps: false,
		tableName: 'respuesta'
	});
};
