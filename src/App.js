
import { useState } from "react";
import "./App.css"; // Import the CSS file

export default function App() {
  const [curTask, setCurTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (curTask.trim() === "") return; // Prevent adding empty tasks
    let newlist = [...allTask, { text: curTask, completed: false }];
    setAllTask(newlist);
    setCurTask("");
    setCount(count + 1);
  };

  const del = (index) => {
    let newlist = [...allTask];
    if (!newlist[index].completed) setCount(count - 1);
    newlist.splice(index, 1);
    setAllTask(newlist);
  };

  const toggleCompletion = (i) => {
    let newlist = [...allTask];
    newlist[i].completed = !newlist[i].completed;
    setCount(newlist[i].completed ? count - 1 : count + 1);
    setAllTask(newlist);
  };

  const updateTask = (i) => {
    const updatedTask = prompt("Enter the Updated Task:", allTask[i].text);
    if (updatedTask !== null) {
      let newlist = [...allTask];
      newlist[i].text = updatedTask;
      setAllTask(newlist);
    }
  };

  const filteredTasks = allTask.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <p className="quote">
    The best way to get things done is to begin.
  </p>
      <div className="input-section">
        <h3>
          Enter a Task:{" "}
          <input
            type="text"
            value={curTask}
            onChange={(e) => setCurTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </h3>
      </div>
      <div className="status-section">
        <h3>All Tasks: {count}</h3>
        <h3>
          <label>
            Filter:{" "}
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </h3>
      </div>
      <ol>
        {filteredTasks.map((task, i) => (
          <li key={i} className={task.completed ? "completed" : ""}>
            <span>{task.text}</span>
            <div className="actions">
              <button onClick={() => toggleCompletion(i)}>
                {task.completed ? "Mark Active" : "Complete"}
              </button>
              <button onClick={() => updateTask(i)}>Update</button>
              <button onClick={() => del(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}