import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyB3w2QaihNgunLIyQqE4HGAzY0VelYjGsA",
    authDomain: "blog-bd333.firebaseapp.com",
    projectId: "blog-bd333",
    storageBucket: "blog-bd333.appspot.com",
    messagingSenderId: "1095038806184",
    appId: "1:1095038806184:web:7d37ec620c363e654f3a9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();