// import { initializeApp } from 'firebase/app';
// import * as firebase from "firebase";
// import "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDBjkRwEnXlfRZ1NiFlFWb9KV5zgc_kOz8",
    authDomain: "panga-13e9d.firebaseapp.com",
    databaseURL: "https://panga-13e9d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "panga-13e9d",
    storageBucket: "panga-13e9d.appspot.com",
    messagingSenderId: "443829492321",
    appId: "1:443829492321:web:bc4dafc5396d843f48e820",
    measurementId: "G-Y8Q89TMLP2"
};

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);

// export const fireDB = FIREBASE_APP.firestore();

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

const Firebase = {
    // auth
    loginWithEmail: (email: string, password: string) => {
        return signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    },
    signupWithEmail: (email: string, password: string) => {
        return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    },
    signOut: () => {
        return signOut(FIREBASE_AUTH)
    },
    checkUserAuth: (user: any) => {
        return onAuthStateChanged(FIREBASE_AUTH, user)
    },

    // firestore
    /*createNewUser: (userData: any) => {
        return FIRESTORE_DB
            firestore()
            .collection('users')
            .doc(`${userData.uid}`)
            .set(userData)
    }*/
};

export default Firebase
