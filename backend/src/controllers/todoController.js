const getAllTodos = (req, res) => {
    const todos = [
        {
            id: 1,
            title: "Learn Node.js",
            completed: false
        },
        {
            id: 2,
            title: "Learn Express",
            completed: false
        }
    ];

    res.json(todos);
};

module.exports = {
    getAllTodos
};