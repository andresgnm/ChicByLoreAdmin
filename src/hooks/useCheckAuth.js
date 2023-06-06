import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";
import { startLoadingAppointments } from "../store/appointment/thunks";
import { allowedEmails } from "../../config";

//const allowedEmails = ['andresgnm13@gmail.com'];
export const useCheckAuth = () => {
    
    const { status } = useSelector( state => state.auth);

    const dispatch = useDispatch(  ) 

    useEffect(() => {

      onAuthStateChanged( FirebaseAuth, async( user ) =>{
        if( !user ) return dispatch( logout() );
        
        const { uid, email, displayName, photoURL,providerData } = user;
        
        if(providerData[0].providerId =='google.com'){
          if (allowedEmails.includes(email)) {
            dispatch( login({ uid, email, displayName, photoURL }) )
            dispatch( startLoadingNotes() )
            dispatch( startLoadingAppointments() )
          }else{
            dispatch( logout() );
          }

        }else{
          dispatch( login({ uid, email, displayName, photoURL }) )
          dispatch( startLoadingNotes() )
          dispatch( startLoadingAppointments() )
        }
        


      } );
    
      
    }, [ ]);

    return status;

}
