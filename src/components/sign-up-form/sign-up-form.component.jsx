import { useState } from "react";
import { loginUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const DEFAULT_FORM_FIELDS = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword : ''
}

const SignUpFrom = () => {

    const[formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
    const { displayName, email, password, confirmPassword } = formFields;

    const onChangeHanler = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert('Pass dont match');
            return;
        }
        try{
            const response = await loginUserWithEmailAndPassword(email, password);
            const {user} = response;
            await createUserDocumentFromAuth({...user, displayName: displayName});

            alert('Account created successfully, welcome ' + displayName);
            setFormFields(DEFAULT_FORM_FIELDS);
        } catch (error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Provided email and password combination is already registered.');
            }
            console.error(error);
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <h1>Sign Up With Email & Password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' name='displayName' value={displayName} onChange={onChangeHanler} required/>
                <FormInput label='Email' type='text' name='email' value={email} onChange={onChangeHanler} required/>
                <FormInput label='Password' type='password' name='password' value={password} onChange={onChangeHanler} required/>
                <FormInput label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} onChange={onChangeHanler} required/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpFrom;