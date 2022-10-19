import { useState, useContext } from "react";
import { signInWithGooglePopUp, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";

const DEFAULT_FORM_FIELDS = {
    email: '',
    password: '',
}

const SignInFrom = () => {

    const[formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
    const { email, password } = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const onChangeHanler = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {user} =  await signInUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            setFormFields(DEFAULT_FORM_FIELDS);
        } catch (error){
            if(error.code === 'auth/wrong-password'){
                alert('Incorrect password for email');
            } else if(error.code === 'auth/user-not-found'){
                alert('Can not find the user with the email');
            }
            console.error(error);
        }
    }

    const logGoogleUser = async () =>{
        //authenticate use and get the user info back
        const {user} = await signInWithGooglePopUp();
        console.log('auth response', user)
        //insert user to db and return or fetch the user from db
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <h1>Sign In With Email & Password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='text' name='email' value={email} onChange={onChangeHanler} required/>
                <FormInput label='Password' type='password' name='password' value={password} onChange={onChangeHanler} required/>
                <div className="buttons-container">
                    <Button type='submit'>LogIn</Button>
                    <Button type='button' onClick={logGoogleUser} buttonType='google'>Google LogIn</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInFrom;