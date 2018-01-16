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
		forma: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: '',
			field: 'forma'
		},
		resSituacionPedagogica: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'res_situacion_pedagogica'
		},
		situacionPedagogica: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'situacion_pedagogica'
		},
		alterResolucionPedagogica: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'alter_resolucion_pedagogica'
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
