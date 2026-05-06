// ═══════════════════════════════════════════
// FIREBASE CONFIGURATION
// ═══════════════════════════════════════════

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCclOlFqdZ80pOY070Z8dTNU-KXxG4G_do",
  authDomain: "rc-center-98e47.firebaseapp.com",
  projectId: "rc-center-98e47",
  storageBucket: "rc-center-98e47.firebasestorage.app",
  messagingSenderId: "849354228554",
  appId: "1:849354228554:web:9b01a7d7bc78151ab7f7b3",
  measurementId: "G-CWVBRDS1DZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

console.log('✓ Firebase initialized successfully');
