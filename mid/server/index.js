const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define task schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

//  Get tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a task
app.post("/api/tasks", async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: false,
  });

  try {
    const savedTasks = await newTask.save();
    res.status(201).json(savedTasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req);
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listening to the server
app.listen(port, () => console.log(`Server listening on port ${port}`));

//module.exports = index;
