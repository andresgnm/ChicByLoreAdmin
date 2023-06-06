import { useDispatch, useSelector } from "react-redux"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { ImageGallery } from "../components/ImageGallery"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'


export const NoteView = () => {


    const dispatch = useDispatch();
    const { active: note , messageSaved, isSaving } =  useSelector( state => state.journal );
    const { title, body, date, onInputChange, formState } = useForm( note );
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [ date ]);

    const fileInputRef  = useRef();

    useEffect(() => {
      dispatch( setActiveNote( formState ))
    
    }, [ formState ]);

    useEffect(() => {
      if( messageSaved.length > 0){
            Swal.fire('Servicio actualizado', messageSaved , 'success');
      }
    }, [messageSaved])
    

    const onSaveNote =() => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ( {target} ) => {
        if( target.files === 0 ) return;
        
        dispatch( startUploadingFiles( target.files ))
    }


    const onDelete = () =>{
        dispatch( startDeletingNote() );
    }
    
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' sx={{ mb:1 }}
           
            >
            <Grid item>
                <Typography   fontSize={ 39 } fontWeight='ligth'>{ title }</Typography>
            </Grid>
            
            {/* <Grid item xs={4}>
                <input 
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={ onFileInputChange }
                    style={{ display: 'none'}}
                />

                <IconButton 
                    color="primary"
                    disabled={isSaving}
                    onClick={ ()=>fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>
                <Button 
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color='primary' 
                    sx={{ padding: 2}}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                </Button>
            </Grid> */}
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{ border:'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio en el dia hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt:0 }}
                    color= "primary"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
                <input 
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={ onFileInputChange }
                    style={{ display: 'none'}}
                />

                <Button 
                    color="primary"
                    disabled={isSaving}
                    onClick={ ()=>fileInputRef.current.click() }
                >
                    <UploadOutlined />
                    Subir
                </Button>
                <Button 
                    disabled={ isSaving }
                    onClick={ onSaveNote }
                    color='primary' 
                    sx={{ padding: 2}}
                    >
                        <SaveOutlined  />
                        Guardar
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls }/>
            
        </Grid>
    )
}
