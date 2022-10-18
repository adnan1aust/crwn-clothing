// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeHZxTsHkH1QImmKWNDuevi97pDHM8jXg",
  authDomain: "react-ecom-demo-db-8c36f.firebaseapp.com",
  projectId: "react-ecom-demo-db-8c36f",
  storageBucket: "react-ecom-demo-db-8c36f.appspot.com",
  messagingSenderId: "965078386984",
  appId: "1:965078386984:web:241604e53352e0bca7e81d"
};

// Initialize Firebase
//Reference to the app in the firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

//authenticate user using google auth provider, returns authenticated user
export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
 // same flow as the previous one, the difference is this redirects from the login page and jumps into a new domain
 // so we will be needing to use useEffect hook with getRedirectResult to catch if any redirect actually happened from google.
export const signInwithGoogleRedirect= () => signInWithRedirect(auth, provider)


// create the db
export const db = getFirestore();
//takes in userauthentication object retrived from signInwithGooglePopUp
export const createUserDocumentFromAuth = async (userAuth) => {
    // see if any existing document reference => params : database instance, document name, unique id
    // the returned userDocRef is not yet in the database
    const userDocRef = doc(db, 'users', userAuth.uid);
    // retrive snapshot to detemine if the ref exists in the db
    const userSnapShot = await getDoc(userDocRef);
    //if user data does not exists, create document
    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        } catch(error){
            console.error('Error creating user ', error.message)
        }
    }
    return userDocRef;
}