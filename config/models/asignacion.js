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
		}
    }, {
        timestamps: false,
		tableName: 'asignacion'
	});
};
