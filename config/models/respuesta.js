/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('respuesta', {
		id_respuesta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_pregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'pregunta',
				key: 'id_pregunta'
			}
		},
		id_alumno: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'alumno',
				key: 'id_alumno'
			}
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		descripcion: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'respuesta'
	});
};
