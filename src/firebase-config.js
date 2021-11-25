import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  signOut
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAylF1mA1FSK_BAmpwKj4XYu8lfv3pffSE",
  authDomain: "activity-today-bc757.firebaseapp.com",
  projectId: "activity-today-bc757",
  storageBucket: "activity-today-bc757.appspot.com",
  messagingSenderId: "439376781374",
  appId: "1:439376781374:web:5a7d857c097892ef2bb16f",
  measurementId: "G-YW066HKM62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const projectStorage = getStorage();

export const logout = () => {
  signOut(auth)
  }

const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
}

const providerFb = new FacebookAuthProvider()
export const signInWithFacebook = () => {
  signInWithPopup(auth, providerFb).then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
}

export {auth, db, app, projectStorage}