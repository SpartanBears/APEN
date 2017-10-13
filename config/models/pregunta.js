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
		enunciado: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'enunciado'
		},
		estimulo: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'estimulo'
		},
		activo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1',
			field: 'activo'
		},
		idTipoEstimulo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'tipo_estimulo',
				key: 'id_tipo_estimulo'
			},
			field: 'id_tipo_estimulo'
		}
	}, {
		timestamps: false,
		tableName: 'pregunta'
	});
};
