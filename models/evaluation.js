// const Sequelize = require('sequelize');
// var DataTypes = require('sequelize/lib/data-types');
// const User = require('./user');

// module.exports = class Evaluation extends Sequelize.Model {
//     static init(sequelize) {
//         return super.init({
//             id: {
//                 type: DataTypes.UUID,
//                 defaultValue: DataTypes.UUIDV4,
//                 primaryKey: true,
//             },
//             UserId: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 references: {
//                     model: 'users',
//                     key: 'id'
//                 },
//                 unique: true,
//             },
            
//         }, {
//             sequelize,
//             timestamps: true,
//             paranoid: true,
//             modelName: 'Evaluation',
//             tableName: 'evaluations',
//             charset: 'utf8',
//             collate: 'utf8_general_ci',
//         });
//     }
//     static associate(db) {
//         db.Evaluation.belongsTo(db.User, {
//             foreignKey: "UserId",
//             targetKey: 'id',
//             onDelete: "cascade",
//         });
//     }
// };