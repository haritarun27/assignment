import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔄 Fetch tasks (runs on load + after every action)
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ➕ Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Error adding task");
    }
  };

  // ✏️ Update task
  const updateTask = async (id) => {
    if (!editText.trim()) return;

    try {
      await API.put(`/tasks/${id}`, { title: editText });
      setEditId(null);
      setEditText("");
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Error updating task");
    }
  };

  // ❌ Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks(); // 🔥 important for persistence after refresh
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Task Dashboard
      </h2>

      {/* ADD TASK */}
      <div className="flex gap-2 mb-6">
        <input
          className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>

      {/* TASK LIST */}
      <div className="w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            {/* EDIT MODE */}
            {String(editId) === String(task._id) ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-2 py-1 rounded w-full mr-2"
                />
                <button
                  onClick={() => updateTask(task._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-700 flex-1">{task.title}</p>

                <button
                  onClick={() => {
                    setEditId(task._id);
                    setEditText(task.title);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
              </>
            )}

            {/* DELETE */}
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}