id = 0;
const todos = [
        {
            id: id++,
            task: "Learn Node.js",
            status: "Pending"
        },
        {
            id: id++,
            task: "Learn Express",
            status: "completed"
        }
    ];

const getAllTodos = (req, res) => {
    res.json(todos);
};


const createTodo = (req, res) => {
    const { task, status } = req.body;
    todos.push({ id: id++, task, status: status || "Pending" });
    res.status(201).json({ id: id - 1, task, status });
}
    

const deleteTodo = (req, res) => {
    const todoId = Number(req.params.id); 
    const todoIndex = todos.findIndex((todo) => todo.id === todoId); 
    if (todoIndex === -1) 
        { return res.status(404).json({ message: "Todo not found" }); } 
        // "return inside if is sayhing Send this response AND immediately exit this function. without it, the function would continue to execute and try to delete a todo that doesn't exist, which would cause an error also express will complain that we are sending 2 responses."
    
    todos.splice(todoIndex, 1); 
    res.status(204).send(); };



const updateTodo = (req, res) => {
    const todoId = Number(req.params.id);

    const { task, status } = req.body;

    const todo = todos.find(
        (todo) => todo.id === todoId
    );

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (task !== undefined) {
        todo.task = task;
    }

    if (status !== undefined) {
        todo.status = status;
    }

    res.status(200).json(todo);
};



module.exports = {
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo
};