import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        task
      );
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          completed: !currentStatus,
        }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 to-fuchsia-500 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Task Management
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <TaskForm
            createTask={createTask}
            updateTask={updateTask}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        </div>

        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
