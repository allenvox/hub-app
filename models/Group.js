// Ensure you only import once
const { DataTypes } = require('sequelize'); // Importing DataTypes from sequelize
const sequelize = require('../config/database'); // Importing the Sequelize instance

// Define the Group model
const Group = sequelize.define('Group', {
    name: { type: DataTypes.STRING, allowNull: false },
    courseYear: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false
});

module.exports = Group;
