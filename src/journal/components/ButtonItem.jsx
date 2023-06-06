import { Button } from '@mui/material';
import React from 'react'
import { setActiveAppointment } from '../../store/appointment/appointmentSlice';
import { useDispatch } from 'react-redux';

export const ButtonItem = ({id,hour,status,date}) => {
    const dispatch = useDispatch()
    const onClickHour =() =>{
       //let newDate=new Date(date);
      dispatch( setActiveAppointment({ id, date,status}) )
      // openAppointment({id,date,status})
    }
        
        
  return (
    <Button 
      variant="contained" 
      color="primary" 
      style={{marginRight: '8px'}}
      onClick={ onClickHour }
        >
        {hour}
      </Button>
  )
}
