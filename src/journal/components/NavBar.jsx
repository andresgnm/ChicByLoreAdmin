import { AppBar ,IconButton,Toolbar, Grid, Typography, Button, useMediaQuery, Box, Avatar, Menu, MenuItem, useTheme, Divider} from '@mui/material'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../store/auth/thunks';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { allowedEmails } from '../../../config';



export const NavBar = ({ drawerWidth }) => {

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch( startLogout() );
  }
  const { displayName, photoURL ,email} = useSelector( state => state.auth);
  const location = useLocation();
  const sizeName= 280;
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isAdmin= allowedEmails.includes(email)? '':'none';

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  

  return (

    <AppBar position="fixed" sx={{ width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 ,maxHeight:'55.99px'}}>
  <Toolbar>
    {isSmallScreen && (
      <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={handleClick}>
        <MenuOutlined />
      </IconButton>
    )}
    <div style={{ flexGrow: 1}}>
      <img
        src="src/images/chic_logo1.PNG"
        style={{ width: '74.17px', height: '55.99px' }}
        alt='e'
      />
    </div>
    <Box sx={{ flexGrow: 1 }} />
    {!isSmallScreen && (
      <>
      {allowedEmails.includes(email) ?
        <Button color="inherit" component={Link} to="/journal" >
          Servicios
        </Button>:''}
        <Button color="inherit" component={Link} to="/horarios" >
          Horarios
        </Button>
      </>
    )}
    <IconButton color="inherit" onClick={handleAnchorClick}>
      <Avatar alt={displayName} src={photoURL} />
    </IconButton>
  </Toolbar>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    color="primary" 
  >
    <MenuItem onClick={handleClose}>{displayName}</MenuItem>
    <MenuItem onClick={onLogout}>
      <IconButton color="error" onClick={onLogout} sx={{ display: 'block' }}>
        <LogoutOutlined />
      </IconButton>
      Salir
    </MenuItem>
  </Menu>
  {isSmallScreen && (
    <div style={{ display: open ? 'block' : 'none' , backgroundColor:theme.palette.primary.main}}>
       {allowedEmails.includes(email) ?
      <Button color="inherit" component={Link} to="/journal" sx={{ display: 'block' }} onClick={()=>setOpen(false)}>
        Servicios
      </Button>:''}
      <Divider />
      <Button color="inherit" component={Link} to="/horarios" sx={{ display: 'block' }} onClick={()=>setOpen(false)}>
        Horarios
      </Button>
    </div>
  )}
</AppBar>
    // <AppBar 
    //     position="fixed" 
    //     sx={{ 
    //         width:{ sm: `calc(100% - ${ drawerWidth }px)`},
    //         ml: {sm: `${ drawerWidth }px` }
    //     }}
    // >
    //   <Toolbar>
    //     <IconButton 
    //           color='inherit'
    //           edge='start'
    //           sx={{ mr: 2, display: { sm: 'none'} }}
    //       >
    //         <MenuOutlined />
    //       </IconButton> 
          
    //     <Typography variant="h6" sx={{ flexGrow: 1 }}>
    //       Chic by Lore Solis
    //     </Typography>
    //     <Button color="inherit" component={Link} to="/journal">
    //       Servicios
    //     </Button>
    //     <Button color="inherit" component={Link} to="/horarios">
    //       Horarios
    //     </Button>
    //     <IconButton 
    //         color='error'
    //         onClick={ onLogout }
    //         >
    //           <LogoutOutlined />
    //       </IconButton>
    // </Toolbar>
    //   {/* <Toolbar>
    //     <IconButton 
    //         color='inherit'
    //         edge='start'
    //         sx={{ mr: 2, display: { sm: 'none'} }}
    //     >
    //       <MenuOutlined />
    //     </IconButton> 
        
    //     <Grid container direction='row' justifyContent='space-between' alignItems='center'>
    //       <Typography  variant='h6' noWrap component='div'>JournalAPP</Typography>
    //       <Typography  variant='h6' noWrap component='div'>Horarios</Typography>

    //       <IconButton 
    //         color='error'
    //         onClick={ onLogout }
    //         >
    //           <LogoutOutlined />
    //       </IconButton>
    //     </Grid>
        
    //   </Toolbar> */}
    // </AppBar>
  )
}
