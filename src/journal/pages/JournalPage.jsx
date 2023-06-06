
import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { SideBar } from '../components'

const drawerWidth = 280;

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { active, isSaving } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }
  return (
    <>
      
    
      <JournalLayout>
        {/* <Typography>Sint do amet id consequat dolore culpa. Veniam cillum nostrud esse excepteur aliqua labore ullamco ea quis. Minim nulla qui tempor aliquip ullamco adipisicing laborum ut consequat eu et.</Typography> */}
        
        {
          (!!active)
            ?<NoteView /> 
            :<NothingSelectedView />
        }
        {/* <NothingSelectedView /> */}
        
        {/* <NoteView /> */}

        <IconButton 
          onClick={ onClickNewNote }
          sixe='large'
          disabled= { isSaving }
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': {backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
        >
          <AddOutlined sx= {{ fontSize: 30}}/>
        </IconButton>
      </JournalLayout>
    </>
  )
}
 