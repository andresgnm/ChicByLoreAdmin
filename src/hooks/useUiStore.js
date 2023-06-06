
import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';
import { setInactiveAppointment } from '../store/appointment/appointmentSlice';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isDateModalOpen
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch ( setInactiveAppointment() )
        dispatch( onCloseDateModal() )
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }



    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        closeDateModal,
        openDateModal,
        toggleDateModal,
    }

}
