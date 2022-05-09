const express = require("express");
const router = express.Router();
const {
    getTodos,
    getDoneTodos,
    getUpcomingTodos,
    addTodo,
    updateForm,
    updateTodo,
    deleteTodo,
} = require("../controllers/task_controller");


router.get("/", getTodos);

router.get("/getDoneTodos", getDoneTodos);

router.get("/getUpcomingTodos", getUpcomingTodos);

router.get("/add", (req, res) => res.render('todo_form', { task: '', title: 'Create Task' }));

router.post("/add", addTodo);

router.get("/update/:id", updateForm);

router.post("/update/:id", updateTodo);

router.get("/delete/:id", (req, res) => res.render('delete_form'));

router.post("/delete/:id", deleteTodo);

module.exports = router;