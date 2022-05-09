const Task = require('../models/task');
const { check, validationResult } = require("express-validator");

function catchAsync(func) {
    return function(req, res, next) {
        func(req, res, next).catch(next);
    };
}

const getTodos = catchAsync(async(req, res, next) => {
    const tasks = await Task.find({});
    res.render('get_todos', { tasks: tasks });
});

const getDoneTodos = catchAsync(async(req, res, next) => {
    const tasks = await Task.find({ completed: true });
    return res.json({
        tasks: tasks
    });
});

const getUpcomingTodos = catchAsync(async(req, res, next) => {
    const todayDate = new Date();
    const tasks = await Task.find({ date: { $lte: todayDate.toISOString() }, completed: false });
    return res.json({
        tasks: tasks
    });
});

const addTodo = [
    check("name", "Task name is required").escape().trim().notEmpty(),
    check("description", "Task description is required").escape().trim().notEmpty(),
    check("date", "Task date is required").escape().trim().notEmpty(),
    check("time", "Task time is required").escape().trim().notEmpty(),

    catchAsync(async(req, res, next) => {
        const errors = validationResult(req);
        let completed = false;
        if (req.body.completed == "true") {
            completed = true;
        }
        const task = {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            completed: completed
        }
        if (!errors.isEmpty()) {
            res.render('todo_form', { title: 'Create Task', errors: errors.array(), task: task });
            return;
        }
        await Task.create(task);
        res.redirect('/');
    })
]

const updateForm = catchAsync(async(req, res, next) => {
    const task = await Task.findById(req.params.id);
    res.render('todo_form', { task: task, title: 'Update Task' });
});

const updateTodo = [
    check("name", "Task name is required").escape().trim().notEmpty(),
    check("description", "Task description is required").escape().trim().notEmpty(),
    check("date", "Task date is required").escape().trim().notEmpty(),
    check("time", "Task time is required").escape().trim().notEmpty(),

    catchAsync(async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('todo_form', { title: 'Update Task', errors: errors.array(), task: task });
            return;
        }
        let completed = false;
        if (req.body.completed == "true") {
            completed = true;
        }
        const task = {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            completed: completed,
        }
        const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, {
            name: task.name,
            description: task.description,
            date: task.date,
            time: task.time,
            completed: task.completed
        });
        res.redirect('/');
    })
]

const deleteTodo = catchAsync(async(req, res, next) => {
    await Task.deleteOne({ _id: req.params.id });
    res.redirect('/');
});


module.exports = {
    getTodos,
    getDoneTodos,
    getUpcomingTodos,
    addTodo,
    updateForm,
    updateTodo,
    deleteTodo,
};