
import React from 'react';
import Link from 'next/link';

import MotivationQuote from '../components/MotivationQuote';
import DailyGoalTracker from '../components/DailyGoalTracker';

const Tracker = () => {
  return (
    <div>
      <header>
        <h1>AceIt</h1>
        <p>Your Monthly Productivity Tracker</p>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/services">Planner</Link>
          <Link href="/tracker">Tracker</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>

      <section className="tracker-section">
        <h2>Your Productivity Tracker</h2>
        <p>
          Stay on top of your goals and track your progress with AceIt.
          See how you're doing at a glance and celebrate your achievements!
        </p>

        {/* Optional components below */}
        <MotivationQuote />
        <DailyGoalTracker />

        <div className="tracker-container">
          <div className="tracker-card">
            <h3>Task Completion</h3>
            <p>Overall progress on your daily tasks.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}>75%</div>
            </div>
          </div>

          <div className="tracker-card">
            <h3>Study Hours</h3>
            <p>Hours dedicated to learning and studying this month.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}>60%</div>
            </div>
          </div>

          <div className="tracker-card">
            <h3>Project Milestones</h3>
            <p>Progress on your current key projects.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '90%' }}>90%</div>
            </div>
          </div>

          <div className="tracker-card">
            <h3>Habit Streak</h3>
            <p>Days you've maintained a positive habit.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '85%' }}>85%</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 AceIt &nbsp;|&nbsp; Stay productive!</p>
      </footer>
    </div>
  );
};

export default Tracker;
