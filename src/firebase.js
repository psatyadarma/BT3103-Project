import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyC6ZPsVoPGjQaktjEZPDc7bJdkrEq3Kq2w",
    authDomain: "bt3103-project-7907e.firebaseapp.com",
    projectId: "bt3103-project-7907e",
    storageBucket: "bt3103-project-7907e.appspot.com",
    messagingSenderId: "420175747456",
    appId: "1:420175747456:web:30dab30706dc8167c78965",
    measurementId: "G-K2PNQBX9ZC"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
var db = firebase.firestore();
export default db;