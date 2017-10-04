/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('filtro', {
		id_filtro: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_codigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'codigo',
				key: 'id_codigo'
			}
		},
		id_familia: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'familia',
				key: 'id_familia'
			}
		}
	}, {
		tableName: 'filtro'
	});
};
