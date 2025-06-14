import React, { useState, useEffect } from 'react';

const DailyGoalTracker = () => {
  const [goal, setGoal] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const savedGoal = localStorage.getItem('dailyGoal');
    const savedStatus = localStorage.getItem('goalDone');
    if (savedGoal) setGoal(savedGoal);
    if (savedStatus === 'true') setCompleted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('dailyGoal', goal);
    localStorage.setItem('goalDone', completed);
  }, [goal, completed]);

  return (
    <div style={styles.tracker}>
      <h3>Today's Goal</h3>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal"
        style={styles.input}
      />
      <button onClick={() => setCompleted(!completed)} style={styles.button}>
        {completed ? 'Mark as Incomplete' : 'Mark as Done'}
      </button>
      <p>Status: {completed ? '✅ Completed' : '❌ Not Completed'}</p>
    </div>
  );
};

const styles = {
  tracker: {
    background: '#fff0f5',
    padding: '20px',
    margin: '10px auto',
    borderRadius: '20px',
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Segoe UI',
    color: '#ff6f87'
  },
  input: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ff6f87',
    width: '60%',
    marginBottom: '10px',
    fontFamily: 'Segoe UI',
  },
  button: {
    background: '#ff6f87',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default DailyGoalTracker;
