/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('familia', {
		idFamilia: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_familia'
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'titulo'
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'descripcion'
		}
    }, {
        timestamps: false,
		tableName: 'familia'
	});
};
