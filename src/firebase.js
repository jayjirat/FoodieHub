import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxLJk9P7knFKnJ7L70nCaiOguCTTDSjfo",
  authDomain: "foodiehub-3512f.firebaseapp.com",
  databaseURL:
    "https://foodiehub-3512f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodiehub-3512f",
  storageBucket: "foodiehub-3512f.firebasestorage.app",
  messagingSenderId: "1060567580502",
  appId: "1:1060567580502:web:ec7f0c9e814a344bf760f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8081);

export { db };
