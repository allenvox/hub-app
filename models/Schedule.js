const { DataTypes } = require('sequelize'); // Import only once
const sequelize = require('../config/database'); // Import your Sequelize instance
const Group = require('./Group'); // Import Group model to define association

const Schedule = sequelize.define('Schedule', {
    subject: { type: DataTypes.STRING, allowNull: false },
    lecturer: { type: DataTypes.STRING, allowNull: false },
    day: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    room: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false
});

// Define the foreign key association
Schedule.belongsTo(Group);
Group.hasMany(Schedule);

module.exports = Schedule;
