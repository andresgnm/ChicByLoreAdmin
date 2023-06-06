import { Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ButtonItem } from './ButtonItem';

export const AvailableHours = ({ selectedDate={}, availableHours }) => {

  const [selectedButton, setSelectedButton] = useState("")
  const dispatch = useDispatch()
    const { openDateModal } = useUiStore();
    const handleAddNewHours = () => {
        //setSelectedDate(date);
        //setIsModalOpen(true);
        openDateModal();
      };

   
  return (
    <Card>
  <CardContent>
    <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
      <Grid item>
        <Typography variant="h5" component="h2">
          Horas disponibles para {selectedDate?.toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={ handleAddNewHours }>
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
    {availableHours.map((obj) => (
      <ButtonItem key={obj.id} {...obj} />
      
    ))}
  </CardContent>
</Card>
  );
};