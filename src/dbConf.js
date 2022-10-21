import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
  
const firebaseConfig = {
  apiKey: "AIzaSyCpny7mqsrDEYoVytz-o7TFnc0DLwT2coE",
  authDomain: "bathworld-8b1e5.firebaseapp.com",
  projectId: "bathworld-8b1e5",
  storageBucket: "bathworld-8b1e5.appspot.com",
  messagingSenderId: "511133271197",
  appId: "1:511133271197:web:e03d964c7fa76239948074"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

