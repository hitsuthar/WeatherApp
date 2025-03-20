// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_5UJb9Z8invcdtvFsOM74GDhVraV7lNM",
    authDomain: "weatherapp-747af.firebaseapp.com",
    projectId: "weatherapp-747af",
    storageBucket: "weatherapp-747af.firebasestorage.app",
    messagingSenderId: "79298903895",
    appId: "1:79298903895:web:d774a26062458b0276c812",
    measurementId: "G-SEB9NQ2JG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)