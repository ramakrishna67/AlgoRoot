require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");
const app = express();
const Task = require("./models/Task");

// Middleware
// app.use(cors());
app.use(express.json());

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Seed data
    // const tasks = await Task.find({});
    // if (!tasks.length) {
    //   await Task.create([
    //     { title: "Task 1", description: "First task" },
    //     { title: "Task 2", description: "Second task" },
    //     { title: "Task 3", description: "Third task" },
    //   ]);
    // }
    // console.log("tasks created");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Routes

app.use("/api/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on port ${PORT}`);
});
