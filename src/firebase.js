

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAESr3ovv7uZyCHuMaVcP2aSmZs9vLMgyQ",
  authDomain: "tweetx-web-app.firebaseapp.com",
  projectId: "tweetx-web-app",
  storageBucket: "tweetx-web-app.appspot.com",
  messagingSenderId: "625688087488",
  appId: "1:625688087488:web:b78563ca6c1bf51f0a5625",
  measurementId: "G-08EV072E4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);


const auth = getAuth();

export {app, auth};