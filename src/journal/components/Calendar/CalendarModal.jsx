import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from "moment";

import Swal from 'sweetalert2'
import { useUiStore } from '../../../hooks/useUiStore';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { DatePicker, TimePicker,DateTimePicker } from '@mui/x-date-pickers';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startNewAppointment, startSaveAppointment } from '../../../store/appointment/thunks';
import { setActiveAppointment } from '../../../store/appointment/appointmentSlice';
import { parseISO } from 'date-fns';
//import { useDispatch, useSelector } from 'react-redux';



const customStyles = {
    content: {
        top: '10%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        //marginRight: '-50%',
        //transform: 'translate(-50%, -50%)',
        width: '80%', // ancho del modal
        //maxWidth: '80%', // ancho máximo del modal
        maxWidth: '800px', 
        
      },
  
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
   
      textAlign: 'center', // centrar el contenido
      //minWidth: '80%',
    [theme.breakpoints.up('md')]: {
      // ajustar la anchura del Grid para dispositivos grandes
     // width: '80%',
     
      //top: '50%',
    },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    gridItem: {
        marginBottom: theme.spacing(1),
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(2), // Espacio entre los botones
    },
    cancelButton: {
        color: '#FFF', // Color de letra blanca
        backgroundColor: theme.palette.cancel.main, // Color de fondo del botón cancelar
        '&:hover': {
            backgroundColor: theme.palette.cancelOver.main, // Color de fondo del botón cancelar al pasar el cursor
          },
    },
  }));
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');

const formData ={
    date: new Date(now),
    status: ''
  }
export const CalendarModal = ({selectedDate =null}) => {

    const classes = useStyles();
    const { isDateModalOpen, closeDateModal } = useUiStore();

    const dispatch = useDispatch();
    const { active:appointment, isSaving } = useSelector( state => state.appointment );

    
    
//     useEffect(() => {
//         if(!!appointment){
//         console.log(appointment ,'CalendarModal')

//         status= appointment.status;
//         date= new Date(appointment.date);

//     }else{
//         date=selectedDate;
//     }


//    }, [appointment,selectedDate])

(!!appointment )?console.log(new Date(appointment.date),"first"): console.log('second')
   
    const {
            date=selectedDate,//= (!!appointment )? new Date(appointment.date) : selectedDate,//selectedDate, 
            status="",
            onInputChange, 
            onDateChange,
            onTimeChange,
            formState 
            } = useForm(appointment);
            
    // useEffect(() => {
    //     dispatch( setActiveAppointment( formState ))
        
    // }, [ formState ]);
            console.log(date ,'DateCalendarModal')
    const onCloseModal = () => {
        closeDateModal();
    }

    useEffect(() => {
        dispatch( setActiveAppointment( formState ))
      
      }, [ formState ]);

    const onClickNewAppointment =()=>{
        
        (appointment.id)? dispatch(startSaveAppointment()):dispatch( startNewAppointment(date,status) );
            // closeDateModal();
    }
    const onClickClose =()=>{
       
        closeDateModal();
}
    return (
        <Modal
            isOpen={ isDateModalOpen  }
            // onAfterOpen={ afterOpenModal }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
           
            <div className={classes.root}  style={{ textAlign: 'center' }}>
            <Typography fontSize={39} fontWeight='light' textAlign='center' mb={3}>Nueva Cita</Typography>
                <Grid container direction='row' justifyContent='center'alignItems='center'  sx={{  mb: 1 }} style={{ height: '100%' }}>
                    <Grid item xs={12} sm={12} md={12} className={classes.gridItem}>
                    <FormControl fullWidth >
                        <DateTimePicker fullWidth placeholder="Fecha" label="Fecha" name="date" value={ new Date(date) } ampm={true} format="dd/MM/yyyy hh:mm a" onChange={ onDateChange } />
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12} className={classes.gridItem} >
                         {/* <InputLabel id="demo-simple-select-label">Estado</InputLabel>  */}
                        {/* <Select sx={{ width: '100%' }} id="demo-simple-select" value={status} name="status" onChange={ onInputChange } label="Estado" >
                            <MenuItem value=""><em>Seleccione un estado</em></MenuItem>
                            <MenuItem value="Disponible">Disponible</MenuItem>
                            <MenuItem value="Ocupado">Ocupado</MenuItem>
                        </Select> */}
                        <FormControl fullWidth >
                            <InputLabel  id="demo-simple-select-label">Estado</InputLabel>
                            <Select id="demo-simple-select" value={status} name="status" onChange={onInputChange} label="Estado" >
                                <MenuItem value=""><em>Seleccione un estado</em></MenuItem>
                                <MenuItem value="Disponible">Disponible</MenuItem>
                                <MenuItem value="Ocupado">Ocupado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <div className={classes.buttonContainer}>

                    <Button onClick={onClickNewAppointment} variant="contained" color="primary">
                        Guardar
                    </Button>
                    <Button onClick={onClickClose} variant="contained"  className={classes.cancelButton}>
                        Cerrar
                    </Button>
                </div>
            </div>

            



           

           
        </Modal>
    )
}
