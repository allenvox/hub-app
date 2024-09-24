const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// GET all schedules or schedules for a specific group
router.get('/', async (req, res) => {
    const groupId = req.query.groupId;

    try {
        let schedules;
        if (groupId) {
            schedules = await Schedule.findAll({ where: { GroupId: groupId } });
        } else {
            schedules = await Schedule.findAll();
        }
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching schedules.' });
    }
});

// Get all schedules for a specific group (you already have this)
router.get('/:group_id', async (req, res) => {
    try {
        const schedules = await Schedule.findAll({ where: { GroupId: req.params.group_id } });
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new schedule for a group
router.post('/', async (req, res) => {
    const { subject, lecturer, day, startTime, endTime, room, groupId } = req.body;
    try {
        const schedule = await Schedule.create({
            subject,
            lecturer,
            day,
            startTime,
            endTime,
            room,
            GroupId: groupId
        });
        res.status(201).json(schedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing schedule
router.put('/:id', async (req, res) => {
    const { subject, lecturer, day, startTime, endTime, room, groupId } = req.body;
    try {
        const schedule = await Schedule.findByPk(req.params.id);
        if (schedule) {
            schedule.subject = subject;
            schedule.lecturer = lecturer;
            schedule.day = day;
            schedule.startTime = startTime;
            schedule.endTime = endTime;
            schedule.room = room;
            schedule.GroupId = groupId;
            await schedule.save();
            res.json(schedule);
        } else {
            res.status(404).json({ message: 'Schedule not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a schedule
router.delete('/:id', async (req, res) => {
    try {
        const schedule = await Schedule.findByPk(req.params.id);
        if (schedule) {
            await schedule.destroy();
            res.json({ message: 'Schedule deleted' });
        } else {
            res.status(404).json({ message: 'Schedule not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
