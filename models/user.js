const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            gender: {
                type: Sequelize.BOOLEAN, // 여자는 false, 남자는 true
                allowNull: false,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            mbti: {
                type: Sequelize.STRING(4),
                allowNull: true,
            },
            report: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            }
            // img: {
            //     type: DataTypes.BLOB('long'),
            //     allowNull: true,
            // }
            // 실시간 위치 정보 추가
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasOne(db.Evaluation, {
            foreignKey: "UserId",
            sourceKey: 'id',
            onDelete: "cascade",
        });
        db.User.hasMany(db.Review, {
            foreignKey: "userEvaluateId",
            sourceKey: 'id',
            onDelete: "cascade",
        });
        db.User.hasMany(db.Review, {
            foreignKey: "userRecieveId",
            sourceKey: 'id',
            onDelete: "cascade",
        });
    }
};