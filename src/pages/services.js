import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const defaultTasks = {
  professional: ["Finish project report", "Attend team meeting", "Send client follow-up email", "Review quarterly goals"],
  health: ["Go for a 30-minute run", "Drink 8 glasses of water", "Stretch for 10 minutes", "Book dentist appointment", "Prepare healthy meals for the week"],
  lifegoals: ["Plan next week’s schedule", "Read a chapter of a personal development book", "Meditate for 15 minutes", "Practice a new skill or hobby", "Set monthly savings goal"],
  finance: ["Review monthly budget", "Pay credit card bill", "Track daily expenses", "Research investment options", "Organize tax documents"],
  selfcare: ["Meditate for 10 minutes", "Take a relaxing bath", "Read a favorite book", "Journal thoughts and feelings", "Listen to calming music"],
  entertainment: ["Watch a movie", "Call a friend for a chat", "Play a board game", "Listen to a podcast", "Try a new recipe"]
};

const STORAGE_KEY_BASE = 'AceItMonthlyTasks_';

const getStorageKey = (month) => STORAGE_KEY_BASE + month;
const getDaysInMonth = (monthStr) => {
  const [year, month] = monthStr.split('-').map(Number);
  return new Date(year, month, 0).getDate();
};

const TaskPlanner = () => {
  const [currentMonth, setCurrentMonth] = useState('2025-06');
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState('');
  const [category, setCategory] = useState('professional');
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth('2025-06'));
  const [todoistTasks, setTodoistTasks] = useState([]);

  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(currentMonth));
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTasks(parsed);
        setDaysInMonth(getDaysInMonth(currentMonth));
      } catch {
        initializeTasks();
      }
    } else {
      initializeTasks();
    }
  }, [currentMonth]);

  useEffect(() => {
    if (!token) return;

    fetch('https://api.todoist.com/rest/v2/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Todoist tasks:', data);
        setTodoistTasks(data.map(task => task.content));
      })
      .catch((err) => console.error('Error fetching Todoist tasks:', err));
  }, [token]);

  const initializeTasks = () => {
    const taskSet = {};
    Object.keys(defaultTasks).forEach(cat => {
      taskSet[cat] = {};
      defaultTasks[cat].forEach(task => {
        taskSet[cat][task] = new Array(getDaysInMonth(currentMonth)).fill(false);
      });
    });
    setTasks(taskSet);
    localStorage.setItem(getStorageKey(currentMonth), JSON.stringify(taskSet));
  };

  const saveTasks = (updatedTasks) => {
    localStorage.setItem(getStorageKey(currentMonth), JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (!taskInput.trim()) return alert('Please enter a task.');
    if (tasks[category]?.[taskInput]) return alert('Task already exists.');

    const updated = {
      ...tasks,
      [category]: {
        ...tasks[category],
        [taskInput]: new Array(daysInMonth).fill(false)
      }
    };
    setTaskInput('');
    saveTasks(updated);
  };

  const toggleCheckbox = (cat, task, dayIndex) => {
    const updated = { ...tasks };
    updated[cat][task][dayIndex] = !updated[cat][task][dayIndex];
    saveTasks(updated);
  };

  const deleteTask = (cat, task) => {
    if (!window.confirm(`Delete task "${task}"?`)) return;
    const updated = { ...tasks };
    delete updated[cat][task];
    saveTasks(updated);
  };

  return (
    <section id="planner">
      <Link href="/" className="btn-home">Home</Link>

      <div className="planner-header">
        <label htmlFor="monthSelect">Select Month:</label>
        <select
          id="monthSelect"
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const month = (i + 1).toString().padStart(2, '0');
            return (
              <option key={month} value={`2025-${month}`}>
                {new Date(2025, i).toLocaleString('default', { month: 'long' })}
              </option>
            );
          })}
        </select>
      </div>

      <h2>Tasks by Category</h2>

      <div id="input-area">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <select
          id="categorySelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {Object.keys(defaultTasks).map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div id="categories">
        {Object.entries(tasks).map(([cat, catTasks]) => (
          <div key={cat} className="category" id={cat}>
            <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
            <ul>
              {Object.entries(catTasks).map(([taskText, completionArray]) => (
                <li key={taskText}>
                  <div className="task-row">
                    <button
                      className="delete-task-btn"
                      onClick={() => deleteTask(cat, taskText)}
                      title={`Delete task "${taskText}"`}
                    >
                      ✖
                    </button>
                    <div className="task-label">{taskText}</div>
                    <div className="day-grid">
                      {completionArray.map((completed, i) => (
                        <div className="day-cell" key={i}>
                          <span className="day-num" title={`Day ${i + 1}`}>{i + 1}</span>
                          <input
                            type="checkbox"
                            checked={completed}
                            title={`Mark task "${taskText}" on day ${i + 1}`}
                            onChange={() => toggleCheckbox(cat, taskText, i)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {todoistTasks.length > 0 && (
        <div className="todoist-section">
          <h3>📝 Synced Todoist Tasks</h3>
          <ul>
            {todoistTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default TaskPlanner;
