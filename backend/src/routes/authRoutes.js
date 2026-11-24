const express = require("express");

const { signup } = require("../controllers/authController");
const { login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Verify the authenticated user from the python (langgraph) server
router.get("/verify", authMiddleware, (req, res) => {
  res.status(200).json({
    authenticated: true,
    userId: req.userId
  });
});


module.exports = router;