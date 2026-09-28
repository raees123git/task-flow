const Todo = require("../models/Todo");

const getAllTodos = async () => {
    return await Todo.find();
};

const createTodo = async (task, status) => {
    return await Todo.create({
        task: task,
        status: status || "pending"
    });
};

const deleteTodo = async (todoId) => {
    return await Todo.findByIdAndDelete(todoId);
};

const updateTodo = async (todoId, task, status) => {
    const updateData = {};

    if (task !== undefined) {
        updateData.task = task;
    }

    if (status !== undefined) {
        updateData.status = status;
    }

    return await Todo.findByIdAndUpdate(
        todoId,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
};

module.exports = {
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo
};