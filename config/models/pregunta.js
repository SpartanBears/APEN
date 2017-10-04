/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pregunta', {
		id_pregunta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_tipo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'tipo',
				key: 'id_tipo'
			}
		},
		id_prueba: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'prueba',
				key: 'id_prueba'
			}
		},
		titulo: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		enunciado: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'pregunta'
	});
};
