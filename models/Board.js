const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Board', BoardSchema);