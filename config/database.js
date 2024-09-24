const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// BY DEFAULT READ PASSWORD FROM ./pass.key
const passwordFilePath = path.join(__dirname, 'pass.key');
let password;

try {
    // Read the first line of the file
    const fileContents = fs.readFileSync(passwordFilePath, 'utf8');
    password = fileContents.split('\n')[0]; // Get the first line (password)
} catch (error) {
    console.error('Error reading the password file:', error);
    process.exit(1); // Exit the process if password file can't be read
}

// CHANGE 'university_schedule' TO YOUR DB NAME, 'root' TO YOUR USER NAME
const sequelize = new Sequelize('university_schedule', 'root', password, {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;
