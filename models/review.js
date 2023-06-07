const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
const User = require('./user');
const Evaluation = require('./evaluation');
const Connection = require('./connection');

module.exports = class Review extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            reviewId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            }
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
        db.Review.belongsTo(db.User, {
            foreignKey: "userEvaluateId",
            targetKey: 'id',
            onDelete: "cascade",
        });
        db.Review.belongsTo(db.User, {
            foreignKey: "userRecieveId",
            targetKey: 'id',
            onDelete: "cascade",
        });
    }
};