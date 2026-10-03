const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token decoded", decoded);
    // Store user ID in request
    req.userId = decoded.userId;

    // Continue to the controller
    next();
  }catch (error) {
    console.log(error);

    return res.status(401).json({
        message: "Invalid or expired token",
        error: error.message
    });
}
};

module.exports = authMiddleware;