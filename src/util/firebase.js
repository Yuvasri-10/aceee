import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCn21_py1UI6OoAnh-tveRFsLCPBq9fDww",
  authDomain: "qwerty-3fbb7.firebaseapp.com",
  projectId: "qwerty-3fbb7",
  storageBucket: "qwerty-3fbb7.appspot.com",
  messagingSenderId: "616441235578",
  appId: "1:616441235578:web:796c08c174d6a5a74e13c3",
  measurementId: "G-B8MT48BMYM",
};

// ✅ Prevent re-initializing during hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Firestore init
const db = getFirestore(app);

// ✅ Analytics (only if supported and window exists)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
