const todoService = require("../services/todoService");


const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos(req.userId);

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch todos",
            error: error.message
        });
    }
};


const createTodo = async (req, res) => {
    try {
        const { task, status } = req.body;

        const todo = await todoService.createTodo(task, status, req.userId);

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create todo",
            error: error.message
        });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        const todo = await todoService.deleteTodo(todoId, req.userId);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete todo",
            error: error.message
        });
    }
};


const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { task, status } = req.body;

        const todo = await todoService.updateTodo(
            todoId,
            task,
            status,
            req.userId
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update todo",
            error: error.message
        });
    }
};


module.exports = {
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo
};