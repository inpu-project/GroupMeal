const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const User = require('./user');

module.exports = class Evaluation extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
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
            again: {
                type: Sequelize.INTEGER, // 또만나고싶어요
                allowNull: false,
                defaultValue: 0,
            },
            comfortable: {
                type: Sequelize.INTEGER, // 분위기편안해요
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Evaluation',
            tableName: 'evaluations',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Evaluation.belongsTo(db.User, {
            foreignKey: "UserId",
            targetKey: 'id',
            onDelete: "cascade",
        });
        db.Evaluation.hasMany(db.review, {
            foreignKey: "EvaluationId",
            sourceKey: 'id',
            onDelete: "cascade",
        });
    }
};