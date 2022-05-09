const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model("Task", taskSchema);