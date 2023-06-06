import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles.css'
import { format } from 'date-fns';
import { CalendarModal } from "./Calendar/CalendarModal";


export const BookingTimeComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';
   
    const availableDates = [
        new Date(2023, 4, 10, 2, 0, 0, 0), // incluir la hora, minutos, segundos y milisegundos
        new Date(2023, 4, 15, 3, 0, 0, 0),
        new Date(2023, 4, 20, 4, 0, 0, 0)
      ];
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setIsModalOpen(true);
    };

    const highlightAvailableDates = (date) => {
        return date instanceof Date && availableDates.some((availableDate) =>
          availableDate.getTime() === date.getTime()
        );
      };
 
    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
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
      {selectedDate  && (
                <CalendarModal OpenModal={isModalOpen} />)
                }
      </div>
    );
}
