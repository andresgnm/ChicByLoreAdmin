

import {Drawer, Box, Toolbar, Typography,Divider, ListItemIcon, ListItemButton, ListItem, List, Grid, ListItemText, useMediaQuery, Fab, Icon} from '@mui/material'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import { useSelector } from 'react-redux';
import { SideBarItem } from './';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const SideBar = ({ drawerWidth =240 }) => {

  
  const { displayName } = useSelector( state => state.auth);
  const { notes } = useSelector( state => state.journal);
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false)

  return (
    <>
    {!isSmallScreen && (
  <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
    <Drawer
      variant="permanent"
      open
      anchor="left"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Toolbar>
        {/* <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography> */}
      </Toolbar>
      {location.pathname === '/journal' && (
        <List>
          {notes.map(note => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      )}
    </Drawer>
  </Box>
)}

{isSmallScreen && (
  <>
    <Box
      sx={{
        borderRadius: '0 8px 8px 0',
        width: '20px',
        height: '48px',
        position: 'fixed',
        top: '100px',
        left: `${open ? drawerWidth : 0}px`,
        zIndex: 2,
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: theme => open ? 'none' : theme.shadows[2],
        transition: 'left 0.2s ease-out, box-shadow 0.2s ease-out'
      }}
    >
      <Fab
        sx={{
          borderRadius: 'inherit',
          width: '100%',
          height: '100%',
        }}
        color="neutral"
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowLeftOutlinedIcon /> : <KeyboardArrowRightOutlinedIcon />}
      </Fab>
    </Box>
    <Box
      component="nav"
      sx={{
        flexGrow: 1,
        display: { xs: 'none', sm: 'flex' },
        position: 'fixed',
        top: '100px',
        marginLeft: `${open ? drawerWidth : 64}px`,
        transition: 'margin-left 0.2s ease-out',
      }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          {/* <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography> */}
        </Toolbar>
        {location.pathname === '/journal' && (
          <List>
            {notes.map(note => (
              <SideBarItem key={note.id} {...note} />
            ))}
          </List>
        )}
      </Drawer>
    </Box>
  </>
  )}
</>

    // <Box
    //     component = 'nav'
    //     sx={{ width: {sm: drawerWidth }, flexShrink: { sm: 0 }}}
    // >
    //     <Drawer 
    //         variant="permanent" 
    //         //variant="temporary"
    //         open
    //         sx={{ 
    //             display: { xs: 'block' },
    //             '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth }
    //         }}
    //     >
    //       <Toolbar title="">
    //         <Typography variant='h6' noWrap component= 'div'>
    //             { displayName } 
    //         </Typography>
    //       </Toolbar>
    //       {/* <Divider /> */}
    //       {
    //         (location.pathname === '/journal')
    //         ?<List>
    //           {
    //               notes.map( note => (
    //                 <SideBarItem key={ note.id } { ...note } />
    //               ))
    //           }
    //         </List>
    //         :''

    //       }
    //       {/* <List>
    //         {
    //             notes.map( note => (
    //               <SideBarItem key={ note.id } { ...note } />
    //             ))
    //         }
    //       </List> */}
    //     </Drawer>
    // </Box>
  )
}
