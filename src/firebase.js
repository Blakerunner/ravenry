import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAu5pFNnz1Jt5xv67jz9-MbXbZoYO-Q4Gs",
  authDomain: "ravenry-app.firebaseapp.com",
  databaseURL: "https://ravenry-app.firebaseio.com",
  projectId: "ravenry-app",
  storageBucket: "ravenry-app.appspot.com",
  messagingSenderId: "787092149150",
  appId: "1:787092149150:web:f2b140eed5eff2f49c7c8f",
  measurementId: "G-YBHEFT43EL",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
