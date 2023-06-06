import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { JournalApp } from './JournalApp'
import { store } from './store'
import './styles.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store= { store }>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter >
        <JournalApp />
      
      </BrowserRouter>

    </LocalizationProvider>

    </Provider>
    
  </React.StrictMode>
)
