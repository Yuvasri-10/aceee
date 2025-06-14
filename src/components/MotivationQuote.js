import React, { useEffect, useState } from 'react';

const MotivationQuote = () => {
  const [quote, setQuote] = useState('Loading...');

  useEffect(() => {
    const quotes = [
      "Believe in yourself!",
      "You are doing great!",
      "Keep pushing forward!",
      "Success starts with self-discipline.",
      "Progress, not perfection!"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div style={styles.card}>
      <h3>Motivation of the Day</h3>
      <p>"{quote}"</p>
    </div>
  );
};

const styles = {
  card: {
    background: '#ffe6eb',
    padding: '20px',
    margin: '10px auto',
    borderRadius: '20px',
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Segoe UI',
    color: '#ff6f87'
  }
};

export default MotivationQuote;
