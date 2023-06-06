import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

import { fileUpload, loadAppointments } from "../../helpers";
import { addNewEmptyAppointment, deleteAppointmentById, savingNewAppointment, setActiveAppointment, setAppointments, setSaving, updateAppointment } from "./appointmentSlice";
import { useUiStore } from "../../hooks/useUiStore";


export const startNewAppointment= (date,status) => {

    return async ( dispatch, getState ) =>{
        //TODO : dispatch 
        dispatch ( savingNewAppointment() );

        const { uid } = getState().auth;
       
       // const myTimestamp = doc.data().date;
       const myDate = date.toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      console.log(date,'date',date.toISOString(),'date.toISOString')
        const newAppointment = {
            date: date.toISOString(),
            status: status,
        }

        const newDoc = doc( collection( FirebaseDB, `appointments` ) );// `${ uid }/calendar/appointments`
        const setDocResp =await setDoc( newDoc , newAppointment );

        newAppointment.id = newDoc.id;


        //dispatch 
        dispatch ( addNewEmptyAppointment( newAppointment) )
        dispatch ( setActiveAppointment( {id:newAppointment.id,date:date,status:status}  ) )
    }

}



export const startLoadingAppointments = ( ) => {
    return async( dispatch, getState )  => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del ususario no existe');
        
        const appointments = await loadAppointments(uid);

        dispatch( setAppointments( appointments ) )

    }
}  

export const startSaveAppointment = () => {
    return async( dispatch ,getState ) => {
        dispatch( setSaving() );
        //const { isDateModalOpen, closeDateModal } = useUiStore();
        const { uid } = getState().auth;
        const { active:appointment  } = getState().appointment;
       // appointment.date=appointment.date.toISOString();
        console.log("llega aqui", appointment)
        const appointmentToFireStore = { id:appointment.id,date:appointment.date.toISOString(),status:appointment.status };//...appointment 
        delete appointmentToFireStore.id;
        
        const docRef = doc(FirebaseDB, `appointments/${ appointment.id }`);//`${uid}/calendar/appointments/${ appointment.id }`
        await setDoc( docRef, appointmentToFireStore, { merge: true  });

        dispatch( updateAppointment( appointment ) );
        //dispatch( closeDateModal() );

         


    }
}


// export const startUploadingFiles = (files =[] ) => {
//     return async( dispatch ) => {
//         dispatch( setSaving() );

//         //await fileUpload( files[0] );
//         const fileUploadPromises= [];

//         for (const file of files) {
//             fileUploadPromises.push( fileUpload( file ) );
//         }
//         const photosUrls = await Promise.all( fileUploadPromises );
        
//         dispatch( setPhotosToActiveNote(photosUrls) );
        
//     }

// }

export const startDeletingAppointment= () =>{
    return async( disapatch, getState )=>{
        const { uid } = getState().auth;
        const { active:appointment } = getState().appointment;
        
        const docRef = doc( FirebaseDB, `appointment/${appointment.id }`);// `${ uid }/calendar/appointment/${appointment.id }`

        await deleteDoc( docRef );

        disapatch( deleteAppointmentById( appointment.id ))
        
    }
}