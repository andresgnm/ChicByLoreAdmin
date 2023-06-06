import { List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

export const MainList = () => {

   // const { displayName } = useSelector( state => state.auth);
    const { notes } = useSelector( state => state.journal);
   // const location = useLocation();
  return (
    <List>
      {notes.map(note => (
        <ListItem key={note.id}>
          <ListItemText primary={note.title} secondary={note.description} />
        </ListItem>
      ))}
    </List>
  );
};