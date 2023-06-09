const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

module.exports = class Connection extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            hostUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // references: {
                //     model: 'users',
                //     key: 'id'
                // }
            },
            guestUserId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                // references: {
                //     model: 'users',
                //     key: 'id'
                // }
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'pending' // 매칭이 성사되면 'matched'로 변경됩니다.
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'meeting' // 배달일 경우 'deliver'로 표기됩니다.
            },
            url: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'url' // 배달 전용입니다. 해당 음식점의 배민 url을 표기합니다.
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            // 실시간 위치 정보 // TODO
            locate: {
                type: DataTypes.STRING,
                allowNull: true
            },
            // 후기 정보 // TODO
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Connection',
            tableName: 'connections',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // db.Connection.belongsTo(db.User, { foreignKey: 'hostUserId', targetKey:'id', as: 'Host' });
        // db.Connection.belongsTo(db.User, { foreignKey: 'guestUserId', targetKey: 'id', as: 'Guest' });
    }
}
