import '../styles/index.css';
import React from 'react';
import { Analytics } from '@vercel/analytics/react'; // ✅ Add this line

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics /> {/* ✅ Add this line */}
    </>
  );
}

export default MyApp;
