/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('forma', {
		idForma: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_forma'
		},
		idPrueba: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'prueba',
				key: 'id_prueba'
			},
			field: 'id_prueba'
		},
		forma: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'forma'
		}
    }, {
        timestamps: false,
		tableName: 'forma'
	});
};
