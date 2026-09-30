const Todo = require("../models/Todo");

const getAllTodos = async (userId) => {
    return await Todo.find({ user: userId });
};

const createTodo = async (task, status, userId) => {
    return await Todo.create({
        task: task,
        status: status || "pending",
        user: userId
    });
};

const deleteTodo = async (todoId, userId) => {
    return await Todo.findOneAndDelete({
        _id: todoId,
        user: userId
    });
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