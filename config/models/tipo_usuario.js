/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipoUsuario', {
		idTipoUsuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_tipo_usuario'
		},
		nombre: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'nombre'
		},
		descripcion: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'descripcion'
		}
    }, {
        timestamps: false,
		tableName: 'tipo_usuario'
	});
};
