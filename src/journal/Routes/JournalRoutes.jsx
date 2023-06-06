
import { Navigate, Route, Routes } from 'react-router-dom'
import { JournalPage } from '../pages/JournalPage'
import { HorariosPage } from '../pages/HorariosPage'
import { NavBar } from '../components'
import { allowedEmails } from '../../../config';
import { useSelector } from 'react-redux';


const drawerWidth = 280;
export const JournalRoutes = () => {
  const { email } = useSelector( state => state.auth);
  return (
    <>
      <NavBar drawerWidth = { drawerWidth } /> 
    <Routes >
    {
      (allowedEmails.includes(email))?
        <Route path="/journal" element= { <JournalPage /> }/>:''
      
    }
        <Route path="/horarios" element= { <HorariosPage /> }/>

        
    {
      (allowedEmails.includes(email))?
      <Route path="/*" element= { <Navigate to="/journal"/> }/>:<Route path="/*" element= { <Navigate to="/horarios"/> }/>
      
    }
    {/* <Route path="/*" element= { <Navigate to="/journal"/> }/> */}
    </Routes>
    </>
  )
}
