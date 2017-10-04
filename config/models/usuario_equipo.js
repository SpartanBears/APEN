/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usuario_equipo', {
		id_usuario_equipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_usuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			}
		},
		id_equipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'equipo',
				key: 'id_equipo'
			}
		}
	}, {
		tableName: 'usuario_equipo'
	});
};
