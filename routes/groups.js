const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new group
router.post('/', async (req, res) => {
    const { name, courseYear } = req.body;
    try {
        const group = await Group.create({ name, courseYear });
        res.status(201).json(group);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a group
router.put('/:id', async (req, res) => {
    const { name, courseYear } = req.body;
    try {
        const group = await Group.findByPk(req.params.id);
        if (group) {
            group.name = name;
            group.courseYear = courseYear;
            await group.save();
            res.json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a group
router.delete('/:id', async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id);
        if (group) {
            await group.destroy();
            res.json({ message: 'Group deleted' });
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
