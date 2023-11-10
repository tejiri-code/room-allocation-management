// Import the functions you need from the SDKs you need
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjA4xMVC5eJTrDjscD48ap3pyzV1q6CvQ",
  authDomain: "room-allocation-b8501.firebaseapp.com",
  projectId: "room-allocation-b8501",
  storageBucket: "room-allocation-b8501.appspot.com",
  messagingSenderId: "382783820637",
  appId: "1:382783820637:web:635aee3eb46e606b6b8eb4",
  measurementId: "G-BNFSPP6P5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
