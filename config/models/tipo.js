/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipo', {
		idTipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_tipo'
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'descripcion'
		}
    }, {
        timestamps: false,
		tableName: 'tipo'
	});
};
