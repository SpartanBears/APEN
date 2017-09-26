module.exports = function (sequelize, DataTypes) {
    return sequelize.define('usuario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            get() {
                return this.getDataValue('id');
            },
        },
        user: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                return this.getDataValue('user');
            },
        },
        pass: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                return this.getDataValue('pass');
            },
        }
    }, {
            tableName: 'usuario'
        });
};