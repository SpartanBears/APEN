/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usuarioEquipo', {
		idUsuarioEquipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_usuario_equipo'
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
		idEquipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'equipo',
				key: 'id_equipo'
			},
			field: 'id_equipo'
		}
    }, {
        timestamps: false,
		tableName: 'usuario_equipo'
	});
};
