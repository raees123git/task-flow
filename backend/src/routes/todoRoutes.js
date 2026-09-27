const express = require("express");
const { getAllTodos } = require("../controllers/todoController");
const { createTodo } = require("../controllers/todoController"); 
const { deleteTodo } = require("../controllers/todoController"); 
const { updateTodo } = require("../controllers/todoController"); 


const router = express.Router();

router.get("/", getAllTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);

module.exports = router;