/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipo_usuario', {
		id_tipo_usuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'tipo_usuario'
	});
};
