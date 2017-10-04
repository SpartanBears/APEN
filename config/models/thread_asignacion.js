/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('thread_asignacion', {
		id_thread_asignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		id_thread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'thread',
				key: 'id_thread'
			}
		},
		id_asignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'asignacion',
				key: 'id_asignacion'
			}
		}
	}, {
		tableName: 'thread_asignacion'
	});
};
