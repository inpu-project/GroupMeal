const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const User = require("./user");

module.exports = class Request extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            requestUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            hostUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            conectionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Connection',
                    key: 'id'
                }
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'pending' // 매칭이 성사되면 'matched', 거절되면 'rejected'로 변경됩니다.
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Request',
            tableName: 'requests',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Request.belongsTo(db.User, { foreignKey: 'requestUserId', as: 'Requester' });
        db.Request.belongsTo(db.User, { foreignKey: 'hostUserId', as: 'Host' });
        db.Request.belongsTo(db.Connection, { foreignKey: 'connectionId', as: 'Connection' });
    }
}
