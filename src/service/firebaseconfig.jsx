// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9evo7B92wBOwaIF30dbtCi6RStwoG8dw",
  authDomain: "se-project-2985e.firebaseapp.com",
  projectId: "se-project-2985e",
  storageBucket: "se-project-2985e.appspot.com",
  messagingSenderId: "538350997388",
  appId: "1:538350997388:web:a50ac1efffaef035c810a9",
  measurementId: "G-9DRMHD5TDT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);