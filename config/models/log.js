/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('log', {
		id_log: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_usuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'usuario',
				key: 'id_usuario'
			}
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: false
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'log'
	});
};
