import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD9b2jXzYJWDXRlMLKUcVD8P8qJc3EW5Tk",
    authDomain: "fintech-8b1b2.firebaseapp.com",
    projectId: "fintech-8b1b2",
    storageBucket: "fintech-8b1b2.firebasestorage.app",
    messagingSenderId: "1087916716163",
    appId: "1:1087916716163:web:68c4a52247504311606bb6",
    measurementId: "G-FXMXQ6BSZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore Database
const storage = getStorage(app); // Firebase Storage (for images, documents)

export { auth, db, storage };
