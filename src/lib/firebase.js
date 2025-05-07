import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJZuRrRHvM7fYrU1AVNwMrA8RkrPdwrxY",
  authDomain: "cms-orbit.firebaseapp.com",
  projectId: "cms-orbit",
  storageBucket: "cms-orbit.firebasestorage.app",
  messagingSenderId: "1060717678858",
  appId: "1:1060717678858:web:098e443e52a04f81826af3",
  measurementId: "G-HR40W7L91D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app.analytics);

// Analytics는 클라이언트 사이드에서만 초기화
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics }; 