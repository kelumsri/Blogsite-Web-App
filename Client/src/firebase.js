// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCywsv5KqTGPWrDUOvRtvF4V7O66P8wzkc",
  authDomain: "wisdompedia-8e39c.firebaseapp.com",
  projectId: "wisdompedia-8e39c",
  storageBucket: "wisdompedia-8e39c.appspot.com",
  messagingSenderId: "348862424201",
  appId: "1:348862424201:web:a03f287371fa41395e9258",
  measurementId: "G-T0VES75JDX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app)
export const imageDb = getStorage(app)
export const auth = getAuth(app)







// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCywsv5KqTGPWrDUOvRtvF4V7O66P8wzkc",
//   authDomain: "wisdompedia-8e39c.firebaseapp.com",
//   projectId: "wisdompedia-8e39c",
//   storageBucket: "wisdompedia-8e39c.appspot.com",
//   messagingSenderId: "348862424201",
//   appId: "1:348862424201:web:a03f287371fa41395e9258",
//   measurementId: "G-T0VES75JDX"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);