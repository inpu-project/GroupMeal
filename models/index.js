const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Connection = require('./connection');
const Request = require('./request');
// const Review = require('./review');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Connection = Connection;
db.Request = Request;
// db.Review = Review;

User.init(sequelize);
Connection.init(sequelize);
Request.init(sequelize);
// Review.init(sequelize);

User.associate(db);
Connection.associate(db);
Request.associate(db);
// Review.associate(db);

module.exports = db;