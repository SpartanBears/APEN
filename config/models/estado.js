/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('estado', {
		idEstado: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_estado'
		},
		descripcion: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'descripcion'
		}
    }, {
        timestamps: false,
		tableName: 'estado'
	});
};
