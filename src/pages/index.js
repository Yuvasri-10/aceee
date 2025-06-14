import React, { useState } from 'react';
import Link from 'next/link';
import FileUploader from '../components/FileUploader'; // ✅ Make sure this path is correct

const Home = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      setInput("Give me a productivity tip");
    }

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input || "Give me a productivity tip" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setResponse(data.result || "No result returned.");
    } catch (error) {
      console.error("Frontend error:", error.message);
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI', padding: '1rem' }}>
      <header style={{ textAlign: 'center', paddingBottom: '1rem' }}>
        <h1 style={{ color: '#ff6f87' }}>AceIt</h1>
        <p>Your Monthly Productivity Tracker</p>
        <nav style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '1rem'
        }}>
          <Link href="/">Home</Link>
          <Link href="/services">Planner</Link>
          <Link href="/tracker">Tracker</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>

      <section style={{ padding: '1rem 0', textAlign: 'center' }}>
        <h2
        style={{
       fontSize: '2em',
        color: '#ff96ad',
        marginBottom: '15px',
       fontFamily: 'Georgia, Times New Roman, Times, serif',
       fontWeight: '600'
  }}
>
  Welcome to AceIt
</h2>


        <p style={{ color: '#7a4450', fontWeight: '500' }}> 
         Stay on track and crush your monthly goals with ease! <br />
         Organize your tasks by category, check progress daily, and celebrate consistency. <br />
        Ready to get started?
        </p>

      </section>

      {/* ✅ File Upload Section */}
      <section style={{
        padding: '1rem',
        backgroundColor: '#ffe6eb',
        borderRadius: '15px',
        maxWidth: '700px',
        margin: '1rem auto',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#ff6f87' }}>Visual Victory !</h2>
        <h4 style={{ color: '#7a4450', fontWeight: 500 }}>
        You can upload proof of completing habits
        </h4>

        <FileUploader />
      </section>

      <section style={{
        padding: '2rem',
        backgroundColor: '#ffe6eb',
        borderRadius: '15px',
        maxWidth: '700px',
        margin: '2rem auto'
      }}>
        <h2 style={{ color: '#ff6f87' }}>Talk to AceIt AI</h2>
        <textarea
          rows={4}
          aria-label="Enter your question"
          style={{ width: '100%', padding: '10px', borderRadius: '10px', fontSize: '1rem' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AceIt AI anything..."
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            borderRadius: '10px',
            backgroundColor: loading ? '#ffc2d1' : '#ff96ad',
            border: 'none',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Thinking...' : 'Submit'}
        </button>
        <div style={{
          marginTop: '1rem',
          background: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          whiteSpace: 'pre-wrap',
          minHeight: '80px'
        }}>
          {response}
        </div>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        <p>&copy; 2025 AceIt &nbsp;|&nbsp; Stay productive!</p>
      </footer>
    </div>
  );
};

export default Home;
