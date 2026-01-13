require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('🚀 MongoDB Connected!'))
    .catch(err => console.error('❌ Connection Error:', err));

// --- API ROUTES ---

// GET: Fetch all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ order: 1 });
        res.json(tasks);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// PATCH: Update status (for Drag and Drop)
app.patch('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE: Remove a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) { res.status(400).json({ error: err.message }); }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));