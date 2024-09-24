const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const path = require('path');

// Import routes
const groupRoute = require('./routes/groups');
const scheduleRoute = require('./routes/schedule');

const app = express();
app.use(bodyParser.json());
app.use(cors());

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database');
        await sequelize.sync(); // Sync models with DB
        console.log('Database synced');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
})();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Root route for serving frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});


// Use routes
app.use('/groups', groupRoute);
app.use('/schedule', scheduleRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
