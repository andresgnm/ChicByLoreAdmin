import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";



export const loadAppointments = async ( uid = '') =>{
    //if( !uid ) throw new Error('El UID del ususario no existe');

    const collectionRef = collection( FirebaseDB, `appointments`);//`${uid}/calendar/appointments`
    const docs = await getDocs( collectionRef );
  
    const appointments = [];
    docs.forEach( doc => {
        const myTimestamp = doc.data().date;
        const myDate = myTimestamp.toLocaleString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        
        appointments.push({
             id:doc.id,//date:doc.data().date.toDate(),status:doc.data().status
             ...doc.data()
        })
    });
    
    return appointments;
}