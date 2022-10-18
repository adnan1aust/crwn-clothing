import { signInWithGooglePopUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () =>{
        //authenticate use and get the user info back
        const {user} = await signInWithGooglePopUp();
        console.log('auth response', user)
        //insert user to db and return or fetch the user from db
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log('firebase response', userDocRef)
    }
    return (
    <div>
        <h1>Sign In</h1>
        <button onClick={logGoogleUser}>Login With Google Popup</button>
    </div>
    )
}

export default SignIn;