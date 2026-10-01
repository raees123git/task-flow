const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const { getAllTodos } = require("../controllers/todoController");
const { createTodo } = require("../controllers/todoController"); 
const { deleteTodo } = require("../controllers/todoController"); 
const { updateTodo } = require("../controllers/todoController"); 


const router = express.Router();

router.get("/", authMiddleware, getAllTodos);
router.post("/", authMiddleware, createTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.patch("/:id", authMiddleware, updateTodo);

module.exports = router;