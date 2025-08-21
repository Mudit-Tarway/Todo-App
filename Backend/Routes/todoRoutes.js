const express = require("express");
const Todo = require("../Schema/TodoSchema");
const User = require("../Schema/UserSchema");
const auth = require("../authentication/auth");
const Joi = require("joi");

const router = express.Router();

// -------------------- Joi Validation Schemas --------------------

const todoSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required()
});

const updateTodoSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional()
});

// ------------------------ Add Todo ------------------------

router.post("/add", auth, async (req, res) => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
      user: req.user.id
    });

    await todo.save();

    // Add todo reference to User
    await User.findByIdAndUpdate(req.user.id, { $push: { todos: todo._id } });

    res.status(201).json({ message: "Todo added successfully", todo });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------ Update Todo ------------------------

router.put("/update/:id", auth, async (req, res) => {
  try {
    const { error } = updateTodoSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated", todo: updatedTodo });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------ Delete Todo ------------------------

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await User.findByIdAndUpdate(req.user.id, { $pull: { todos: req.params.id } });

    res.json({ message: "Todo deleted", todo });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------ Get All Todos ------------------------

router.get("/get", auth, async (req, res) => {

  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------ Get Single Todo by ID ------------------------

router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
