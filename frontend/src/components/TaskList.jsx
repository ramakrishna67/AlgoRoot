import { FaTrash, FaEdit, FaCheck, FaUndo } from "react-icons/fa";

const TaskList = ({ tasks, deleteTask, setEditingTask, toggleComplete }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No tasks found. Add a task to get started!
        </p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                task.completed ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`mt-1 text-sm ${
                        task.completed ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => toggleComplete(task._id, task.completed)}
                    className={`p-2 rounded-full ${
                      task.completed
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    } hover:opacity-80`}
                    title={
                      task.completed ? "Mark as incomplete" : "Mark as complete"
                    }
                  >
                    {task.completed ? (
                      <FaUndo size={14} />
                    ) : (
                      <FaCheck size={14} />
                    )}
                  </button>

                  <button
                    onClick={() => setEditingTask(task)}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:opacity-80"
                    title="Edit task"
                  >
                    <FaEdit size={14} />
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:opacity-80"
                    title="Delete task"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
