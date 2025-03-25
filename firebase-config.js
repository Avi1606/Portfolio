// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARXQN-Y3vJlU02cAKd5Ft9j8ibRtIhO3c",
    authDomain: "my-portfolio-a2911.firebaseapp.com",
    projectId: "my-portfolio-a2911",
    storageBucket: "my-portfolio-a2911.firebasestorage.app",
    messagingSenderId: "1096502584316",
    appId: "1:1096502584316:web:cd8651f45be30e0f250879",
    measurementId: "G-W2WEEWSETQ"
};

// Initialize Firebase with compat version (for use with your existing code)
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();