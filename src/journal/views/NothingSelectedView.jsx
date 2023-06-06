import { DeleteOutline, StarOutline } from '@mui/icons-material'
import { Button, Card, CardContent, Container, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { MainList } from '../components/MainList'
import { useSelector } from 'react-redux';
import { SideBarItem } from '../components';


export const NothingSelectedView = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const { displayName } = useSelector( state => state.auth);
  const { notes } = useSelector( state => state.journal);
  return (
    <>

     
      

        <Grid 
        className='animate__animated animate__fadeIn animate__faster'
        container 
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
         sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main' ,borderRadius: 3 }}
        //sx={{  backgroundColor: 'primary.main' ,borderRadius: 3 }}
        >
          <Grid item xs={ 12 }>
              {/* <StarOutline sx={{ fontSize: 100, color: 'white'  }} /> */}
              <img
        src="src/images/chic_logo1.PNG"
        style={{ width: '200px',height: '150px' }}
        alt='e'
      />
          </Grid>
          <Grid item xs={ 12 }>
              <Typography color='white' variant='h5'>Selecciona o crea un servicio</Typography>
          </Grid>
        </Grid>
        
    
    </>
  )
}
