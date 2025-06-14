
import React from 'react';
import Link from 'next/link';

const About = () => {
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

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          AceIt was created to help you master your time, stay focused, and achieve your goals—one task at a time.<br /><br />
          Whether you’re a student, a working professional, or someone managing multiple roles, AceIt empowers you with simple,
          visual task planning by month and category.<br /><br />
          We believe in soft aesthetics, strong habits, and the joy of crossing things off your list.
        </p>
      </section>

      <footer>
        <p>&copy; 2025 AceIt &nbsp;|&nbsp; Stay productive!</p>
      </footer>
    </div>
  );
};

export default About;

