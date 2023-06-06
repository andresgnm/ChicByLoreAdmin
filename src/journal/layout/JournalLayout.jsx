import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar,SideBar } from '../components';
import { useLocation } from 'react-router-dom';


const drawerWidth = 280;

export const JournalLayout = ({ children }) => {

  const location = useLocation();
  
  return (
    <Box sx={{ display: 'flex'}} className='animate__animated animate__fadeIn animate__faster' >

        {/* <NavBar drawerWidth = { drawerWidth } /> */}

        {
          (location.pathname === '/journal')
          ? <SideBar drawerWidth={ drawerWidth } />
          :''
        }
        {/* <SideBar drawerWidth={ drawerWidth } /> */}
        {/* <SideBar drawerWidth={ drawerWidth } /> */}

        {/* Sidebar drawerWidth = 240;*/}

        <Box 
            component='main'
            sx={{ flexGrow:1, p:3}}
        >
            <Toolbar />


            {children}
        </Box>
    </Box>
  )
}
