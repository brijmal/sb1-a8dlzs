import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCWo31BX8nJ8PKlsPE7nh1T26cGCPfvFwM",
  authDomain: "cookjobs4u.firebaseapp.com",
  projectId: "cookjobs4u",
  storageBucket: "cookjobs4u.firebasestorage.app",
  messagingSenderId: "424964677119",
  appId: "1:424964677119:web:c9ffdb63d78a460e8c9bca",
  measurementId: "G-V6H28CR3G5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize analytics only in production and in browser environment
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Enable offline persistence
import { enableIndexedDbPersistence } from 'firebase/firestore';

try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support persistence.');
    }
  });
} catch (err) {
  console.warn('Error enabling persistence:', err);
}