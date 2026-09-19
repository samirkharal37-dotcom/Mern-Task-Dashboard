import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskApi";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showRegister, setShowRegister] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------
  // Load tasks after login
  // --------------------------------
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      // Handles different possible backend response formats
      if (Array.isArray(data)) {
        setTasks(data);
      } else if (Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else if (Array.isArray(data.data)) {
        setTasks(data.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("Load tasks error:", err);

      if (err.response?.status === 401) {
        logout();
        return;
      }

      setError(
        err.response?.data?.message || "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Login
  // --------------------------------
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  // --------------------------------
  // Register
  // --------------------------------
  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
  };

  // --------------------------------
  // Logout
  // --------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setTasks([]);
  };

  // --------------------------------
  // Add Task
  // --------------------------------
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      setError("Please enter a task name.");
      return;
    }

    try {
      setError("");

      const newTask = await createTask({
        name: taskName.trim(),
        priority: priority,
        status: "Pending",
      });

      // Handle different backend response formats
      const task =
        newTask.task ||
        newTask.data ||
        newTask;

      setTasks((previousTasks) => [
        ...previousTasks,
        task,
      ]);

      setTaskName("");
      setPriority("Medium");

    } catch (err) {
      console.error("Add task error:", err);

      if (err.response?.status === 401) {
        logout();
        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to add task."
      );
    }
  };

  // --------------------------------
  // Toggle task status
  // --------------------------------
  const handleToggleTask = async (task) => {
    try {
      const newStatus =
        task.status === "Completed"
          ? "Pending"
          : "Completed";

      const response = await updateTask(task._id, {
        name: task.name,
        priority: task.priority,
        status: newStatus,
      });

      const updatedTask =
        response.task ||
        response.data ||
        response;

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item._id === task._id
            ? updatedTask
            : item
        )
      );

    } catch (err) {
      console.error("Update task error:", err);

      if (err.response?.status === 401) {
        logout();
        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to update task."
      );
    }
  };

  // --------------------------------
  // Delete task
  // --------------------------------
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task._id !== id
        )
      );

    } catch (err) {
      console.error("Delete task error:", err);

      if (err.response?.status === 401) {
        logout();
        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to delete task."
      );
    }
  };

  // --------------------------------
  // SHOW LOGIN / REGISTER
  // --------------------------------

  if (!user) {
    if (showRegister) {
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setShowRegister(false)}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  // --------------------------------
  // DASHBOARD
  // --------------------------------

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Task Dashboard</h1>

          <p>
            Welcome,{" "}
            <strong>{user.name}</strong>
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <main className="dashboard">

        {/* ADD TASK */}
        <section className="add-task-section">
          <h2>Add New Task</h2>

          <form onSubmit={handleAddTask}>

            <input
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) =>
                setTaskName(e.target.value)
              }
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>
            </select>

            <button type="submit">
              Add Task
            </button>

          </form>
        </section>

        {/* ERROR */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* TASKS */}
        <section className="tasks-section">
          <div className="tasks-header">
            <h2>My Tasks</h2>

            <button onClick={loadTasks}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found.</p>
              <p>
                Add your first task above.
              </p>
            </div>
          ) : (
            <div className="task-list">

              {tasks.map((task) => (
                <div
                  className="task-card"
                  key={task._id}
                >

                  <div className="task-info">

                    <h3
                      className={
                        task.status === "Completed"
                          ? "completed"
                          : ""
                      }
                    >
                      {task.name}
                    </h3>

                    <p>
                      Priority:{" "}
                      <strong>
                        {task.priority}
                      </strong>
                    </p>

                    <p>
                      Status:{" "}
                      <strong>
                        {task.status}
                      </strong>
                    </p>

                  </div>

                  <div className="task-actions">

                    <button
                      onClick={() =>
                        handleToggleTask(task)
                      }
                    >
                      {task.status === "Completed"
                        ? "Mark Pending"
                        : "Complete"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteTask(task._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default App;