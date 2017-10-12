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
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'titulo'
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'descripcion'
		}
	}, {
		timestamps: false,
		tableName: 'respuesta'
	});
};
