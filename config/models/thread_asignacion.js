/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('threadAsignacion', {
		idThreadAsignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id_thread_asignacion'
		},
		idThread: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'thread',
				key: 'id_thread'
			},
			field: 'id_thread'
		},
		idAsignacion: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'asignacion',
				key: 'id_asignacion'
			},
			field: 'id_asignacion'
		}
    }, {
        timestamps: false,
		tableName: 'thread_asignacion'
	});
};
