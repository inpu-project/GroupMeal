const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const Connection = require('./connection');

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
                defaultValue: "https://aaabbca182@gmail.com",
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
                defaultValue: false,
                allowNull: false,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 20,
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
            /* my personality */
            extrovert: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            introvert: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            emotional: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            rational: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            planned: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            impromptu: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },

            /* evaluation */
            nice: {
                type: Sequelize.INTEGER, // 친절해요
                allowNull: false,
                defaultValue: 0,
            },
            ontime: {
                type: Sequelize.INTEGER, // 늦지않았어요
                allowNull: false,
                defaultValue: 0,
            },
            fun: {
                type: Sequelize.INTEGER, // 재밌었어요
                allowNull: false,
                defaultValue: 0,
            },
            communication: {
                type: Sequelize.INTEGER, // 대화가즐거워요
                allowNull: false,
                defaultValue: 0,
            },
            comfortable: {
                type: Sequelize.INTEGER, // 분위기편안해요
                allowNull: false,
                defaultValue: 0,
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
        // db.User.hasOne(db.Evaluation, {
        //     foreignKey: "UserId",
        //     sourceKey: 'id',
        //     onDelete: "cascade",
        // });
        // db.User.hasMany(db.Review, {
        //     foreignKey: "userEvaluateId",
        //     sourceKey: 'id',
        // });
        // db.User.hasMany(db.Review, {
        //     foreignKey: "userRecieveId",
        //     sourceKey: 'id',
        // });
        // db.User.hasMany(db.Connection, { foreignKey: 'hostUserId', sourceKey: 'id' });
        // db.User.hasMany(db.Connection, { foreignKey: 'guestUserId', sourceKey: 'id' });
    }
};