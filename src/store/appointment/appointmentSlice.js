import { createSlice } from '@reduxjs/toolkit';


export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
         isSaving: false,
         messageSaved: '',
         appointments: [],
         active:null,
         // active: {
         //     id:'ABC123',
         //     title:'',
         //     body:'',
         //     date: 1234567,
         //     imageUrls: [],
         // }
 
    },
    reducers: {
         savingNewAppointment:( state ) =>{
            state.isSaving= true; 
            
         },
         addNewEmptyAppointment:(state, action ) =>{
            
        //     const myTimestamp = action.payload.date.getTime();
        //     const myDate = myTimestamp.toLocaleString('es-ES', { 
        //     day: '2-digit', 
        //     month: '2-digit', 
        //     year: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     second: '2-digit'
        //   });
             state.appointments.push( action.payload);
             state.isSaving=false ;
         },
         setActiveAppointment:(state, action ) =>{
            
             state.active = action.payload;
             state.messageSaved = '';
         },
         setInactiveAppointment:(state ) =>{
           
             state.active = null;
             state.messageSaved = '';
         },
         setAppointments:(state, action ) =>{
            
             state.appointments= action.payload;
         },
         setSaving :(state ) =>{
             state.isSaving = true;
             state.messageSaved = '';
             //TODO: mensaje de error...
         },
         updateAppointment:(state, action ) =>{
            console.log("llega aqui")
             state.isSaving = false;
             state.appointments = state.appointments.map( note => {
                 if( note.id === action.payload.id ){
                     return action.payload;
                 }
                 return note
             });
             //mostrar mensaje de actualizacion
 
             state.messageSaved =`${ action.payload.title } , actualizada correctamente`;
         },
        //  setPhotosToActiveNote: (state, action ) =>{
        //      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
        //      state.isSaving= false ;
        //  },
         clearAppointmentsLogout:  (state ) =>{
             state.isSaving= false ;
             state.messageSaved='';
             state.appointments=[];
             state.active= null;
         },
         deleteAppointmentById:(state, action ) =>{
             state.active=null;
             state.appointments= state.appointments.filter( note => note.id !== action.payload );
             
         },
    }
 });

 // Action creators are generated for each case reducer function
export const {
    addNewEmptyAppointment,
    clearAppointmentsLogout,
    deleteAppointmentById,
    savingNewAppointment,
    setActiveAppointment,
    setInactiveAppointment,
    setAppointments,
    //setPhotosToActiveNote,
    setSaving,
    updateAppointment,
 } = appointmentSlice.actions;
