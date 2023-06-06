import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'




export const purpleTheme = createTheme ({
    palette:{
        primary:{
            //main: '#262254'
            //main:'#a086d3'
            main:'#A28497'

        },
        secondary :{
            main:'#543884'
        },
        error:{
            //main: red.A400
            //main: '#EBBAB9'
            main: '#6F5E5C'

        },
        cancel:{
            //main: red.A400
            //main: '#EBBAB9'
            main: '#C1292E'

        },
        cancelOver: {
            main:'#A82428'
        }
    }
})