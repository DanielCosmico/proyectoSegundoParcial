import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyA31iU0x2ZXe0W6W52lpsstmdKHeyM0qGU",
    authDomain: "vue-todo-2021-ccb8a.firebaseapp.com",
    projectId: "vue-todo-2021-ccb8a",
    storageBucket: "vue-todo-2021-ccb8a.appspot.com",
    messagingSenderId: "857773971078",
    appId: "1:857773971078:web:8e78c096968e7623ef2307"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()