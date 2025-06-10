// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAC75q8h2gBzm8KStRfa6QGpSGSNlDlu_E",
    authDomain: "copymind-test-task.firebaseapp.com",
    projectId: "copymind-test-task",
    storageBucket: "copymind-test-task.firebasestorage.app",
    messagingSenderId: "669861318641",
    appId: "1:669861318641:web:7dab5ba3b4e98c617cbe50",
    measurementId: "G-41QKZF2EJL"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();