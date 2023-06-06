import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {

    return async ( dispatch, getState ) =>{
        //TODO : dispatch 
        dispatch ( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getDate(),
        }

        const newDoc = doc( collection( FirebaseDB, `tecnicas` ) );//`${uid}/servicios/tecnicas`
        const setDocResp =await setDoc( newDoc , newNote );

        newNote.id = newDoc.id;

        //dispatch 
        dispatch ( addNewEmptyNote( newNote) )
        dispatch ( setActiveNote( newNote ) )
    }

}



export const startLoadingNotes = ( ) => {
    return async( dispatch, getState )  => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del ususario no existe');
        
        const notes = await loadNotes(uid);

        dispatch( setNotes( notes ) )

    }
}  

export const startSaveNote = () => {
    return async( disapatch ,getState ) => {
        disapatch( setSaving() );
        const { uid } = getState().auth;
        const { active:note  } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        
        const docRef = doc(FirebaseDB, `tecnicas/${ note.id }`);//${uid}/servicios/tecnicas/${ note.id }
        await setDoc( docRef, noteToFireStore, { merge: true  });

        disapatch( updateNote( note ) );

         


    }
}


export const startUploadingFiles = (files =[] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        //await fileUpload( files[0] );
        const fileUploadPromises= [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }
        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote(photosUrls) );
        
    }

}

export const startDeletingNote = () =>{
    return async( disapatch, getState )=>{
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        const docRef = doc( FirebaseDB, `tecnicas/${note.id }`);//`${uid}/servicios/tecnicas/${note.id }`

        await deleteDoc( docRef );

        disapatch( deleteNoteById( note.id ))
        
    }
}