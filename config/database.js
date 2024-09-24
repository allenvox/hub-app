const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Read the password from pass.key
const passwordFilePath = path.join(__dirname, 'pass.key');
let password;

try {
    // Read the first line of the pass.key file
    const fileContents = fs.readFileSync(passwordFilePath, 'utf8');
    password = fileContents.split('\n')[0]; // Get the first line (password)
} catch (error) {
    console.error('Error reading the password file:', error);
    process.exit(1); // Exit the process if password file can't be read
}

// Create a Sequelize instance with the read password
const sequelize = new Sequelize('university_schedule', 'root', password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
