/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('filtro', {
		idFiltro: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_filtro'
		},
		idCodigo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'codigo',
				key: 'id_codigo'
			},
			field: 'id_codigo'
		},
		idFamilia: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'familia',
				key: 'id_familia'
			},
			field: 'id_familia'
		}
	}, {
		timestamps: false,
		tableName: 'filtro'
	});
};
