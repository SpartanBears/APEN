/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pregunta', {
		idPregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_pregunta'
		},
		idTipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'tipo',
				key: 'id_tipo'
			},
			field: 'id_tipo'
		},
		idPrueba: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'prueba',
				key: 'id_prueba'
			},
			field: 'id_prueba'
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'titulo'
		},
		enunciado: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'enunciado'
		}
    }, {
        timestamps: false,
		tableName: 'pregunta'
	});
};
