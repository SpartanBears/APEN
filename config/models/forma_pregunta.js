/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('formaPregunta', {
		idFormaPregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_forma_pregunta'
		},
		idForma: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'forma',
				key: 'id_forma'
			},
			field: 'id_forma'
		},
		idPregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'pregunta',
				key: 'id_pregunta'
			},
			field: 'id_pregunta'
		}
    }, {
        timestamps: false,
		tableName: 'forma_pregunta'
	});
};
