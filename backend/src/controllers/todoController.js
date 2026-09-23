const getAllTodos = (req, res) => {
    const todos = [
        {
            id: 1,
            task: "Learn Node.js",
            completed: false
        },
        {
            id: 2,
            task: "Learn Express",
            completed: false
        }
    ];

    res.json(todos);
};

module.exports = {
    getAllTodos
};