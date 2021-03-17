import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDIwJwZ-BizHRBFSx3-IvD8Oxxx-7-yNd4",
    authDomain: "duplicates-232a8.firebaseapp.com",
    projectId: "duplicates-232a8",
    storageBucket: "duplicates-232a8.appspot.com",
    messagingSenderId: "714870414099",
    appId: "1:714870414099:web:6721ee70fb58c15fffd8e6",
    measurementId: "G-5CCWKBMR96",
  });
}

 const firestore = firebase.firestore();
 const auth = firebase.auth();
 

 export {firestore, auth}
