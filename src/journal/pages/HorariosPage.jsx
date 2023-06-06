
import React, { useEffect, useState } from "react";
import { JournalLayout } from '../layout/JournalLayout'
import { BookingTimeComponent } from '../components/BookingTime'
import { useUiStore } from '../../hooks/useUiStore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles.css'
import { format } from 'date-fns';
import { CalendarModal } from "../components/Calendar/CalendarModal";
import { AvailableHours } from "../components/AvailableHours";
import { useSelector } from "react-redux";


export const HorariosPage = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const { active,appointments } = useSelector( state => state.appointment);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
  const { openDateModal } = useUiStore();
   const availableDates = appointments
                            .filter(appointment => appointment.status ==="Disponible")
                            .map(appointment => new Date(appointment.date)); 
 
  //[
  //     new Date(2023, 4, 10, 2, 0, 0, 0), // incluir la hora, minutos, segundos y milisegundos
  //     new Date(2023, 4, 15, 3, 0, 0, 0),
  //     new Date(2023, 4, 20, 4, 0, 0, 0)
  //   ];

  useEffect(() => {
      
  
    if (!!active) {
      openDateModal();
      
    }else {return;}
    
    
  }, [active]);
    useEffect(() => {
      
     
      if (!selectedDate) {
        setAvailableHours([]);
        return;
      }
      
      const availableHours = [];
      
      for (let obj of appointments) {
        if (obj.date !== null) {
          const arrayDate = new Date(obj.date);
          const selectedDateString = selectedDate.toISOString().substr(0, 10);
          const arrayDateString = arrayDate.toISOString().substr(0, 10);
          
          if (selectedDateString === arrayDateString) {
            const time = arrayDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            availableHours.push({id:obj.id,hour:time, date:obj.date,status:obj.status});
          }
        }
      }
      
      setAvailableHours(availableHours);
    }, [selectedDate, appointments]);
    // useEffect(() => {
    //   console.log(appointments)
    //   //if (selectedDate ===null) return false;
    //   const avail = appointments.map(obj => {
    //     if(obj.date !== null && selectedDate !== null){

    //       const arrayDate = new Date(obj.date);//obj.date;//new Date(obj.date.seconds * 1000);
    //       let arrayTime = []
    //       let time='';
    //       console.log(selectedDate,arrayDate)
    //       const selectedDateString = selectedDate.toISOString().substr(0, 10);
    //       const arrayDateString = arrayDate.toISOString().substr(0, 10);
    //       console.log(selectedDateString,arrayDateString ,"ISOString")
    //       if(selectedDateString === arrayDateString){
    //         time = arrayDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    //       }else{
    //         setAvailableHours([])
    //       }
    //       console.log(arrayTime,'time')
    //       if(time !== ''){
    //         arrayTime.push(time)
    //         setAvailableHours(arrayTime)

    //       }
          
    //     }
    //   });
    // }, [selectedDate,appointments])
    
    const hours = appointments.map(obj => {
      if (selectedDate ===null) return false;
      const arrayDate = new Date(obj.date);
      const arrayTime = arrayDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      return arrayTime;
    });
    

    const [availableHours, setAvailableHours] = useState( [] );
    //console.log(availableHours.length); // ['10:30 AM', '3:45 PM', '6:00 PM']
  const handleDateChange = (date) => {
    setSelectedDate(date);
    //setIsModalOpen(true);
    //openDateModal();
  };
  
  
  return (
    <JournalLayout >
      <div className="booking-time">
          <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Select a date"
          minDate={new Date()}
          maxDate={null}
          inline
          highlightDates={availableDates}
          
          
        />
        
      </div>
       <AvailableHours selectedDate={selectedDate} availableHours={availableHours} />
        
       
        <CalendarModal selectedDate={selectedDate} />

      
    </JournalLayout>
  )
}
