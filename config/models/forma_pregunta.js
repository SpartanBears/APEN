/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('forma_pregunta', {
		id_forma_pregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_forma: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'forma',
				key: 'id_forma'
			}
		},
		id_pregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'pregunta',
				key: 'id_pregunta'
			}
		}
	}, {
		tableName: 'forma_pregunta'
	});
};
