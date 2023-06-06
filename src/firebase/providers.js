import { GoogleAuthProvider ,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { allowedEmails } from "../../config";

const googleProvider = new GoogleAuthProvider();


export const singInWithGoogle = async() => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName,email, photoURL,uid} = user;
        //Verificar el correo electrónico permitido
        //const allowedEmails = ['andresgnm13@gmail.com'];
        if (!allowedEmails.includes(email)) {
        // Denegar el acceso si el correo electrónico no está permitido
        throw new Error('Correo electrónico no permitido');
        }//
        return{
            ok:true,
            //user info
            displayName,email,photoURL,uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message; 
        
        return{
            ok:false,
            errorMessage: error.message
        }
    }
}



export const registerUserWithEmailPassword = async ({email, password, displayName }) =>{
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user
       
        //TODO: actualizar user en firebase
        await updateProfile( FirebaseAuth.currentUser , { displayName });
        
        return {
            ok: true,
            uid,photoURL, email, displayName
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}


export const loginWithEmailPassword = async ({ email, password }) => {
    // signInWithEmailAndPassword
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid,photoURL, email, displayName
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}



export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut();
}