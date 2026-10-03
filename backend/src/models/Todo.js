const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "aborted", "completed"],
      default: "pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// we dont need to create id here, mongoose will automatically create an _id field for each document in the collection.

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;