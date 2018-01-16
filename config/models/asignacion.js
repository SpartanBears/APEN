/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('asignacion', {
		idAsignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_asignacion'
		},
		idUsuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			},
			field: 'id_usuario'
		},
		idRespuesta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'respuesta',
				key: 'id_respuesta'
			},
			field: 'id_respuesta'
		},
		idEstado: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'estado',
				key: 'id_estado'
			},
			field: 'id_estado'
		},
		duda: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'duda'
		},
		isEc: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '0',
			field: 'isEC'
		},
		eCdocente: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'ECdocente'
		},
		eCestudiante: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'ECestudiante'
		},
		eCescuela: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'ECescuela'
		},
		eCotros: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'ECotros'
		},
		fundamentoFund: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'fundamento_fund'
		},
		fundamentoParcial: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'fundamento_parcial'
		},
		fundamentoNoFund: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'fundamento_no_fund'
		},
		fundamentoEstereotipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '-1',
			field: 'fundamento_estereotipo'
		},
		idSesion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
			references: {
				model: 'sesion',
				key: 'id_sesion'
			},
			field: 'id_sesion'
		},
		activo: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: '1',
			field: 'activo'
		}
	}, {
		timestamps: false,
		tableName: 'asignacion'
	});
};
