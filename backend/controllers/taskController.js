const Task = require("../models/Task");

// GET all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

// GET one task
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
};

// CREATE task
const createTask = async (req, res) => {
  try {
    const { name, priority, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Task name is required",
      });
    }

    const task = await Task.create({
      name: name.trim(),
      priority: priority || "Medium",
      status: status || "Pending",
      user: req.user,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

// UPDATE task
const updateTask = async (req, res) => {
  try {
    const { name, priority, status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (name !== undefined) {
      task.name = name.trim();
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (status !== undefined) {
      task.status = status;
    }

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};