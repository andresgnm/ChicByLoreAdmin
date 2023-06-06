import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/Routes/JournalRoutes'
import { CheckingAuth } from '../ui/'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  const status  = useCheckAuth();
  



  if( status === 'checking'){
    return <CheckingAuth />
  }
  return (
    <Routes>

        { 
          (status === 'authenticated')
          ?  <Route  path="/*" element ={ <JournalRoutes />}/>
          : <Route path="/auth/*" element ={ <AuthRoutes />}/>

        }

        <Route path='/*' element={ <Navigate to='/auth/login' />} />
        {/* LOGIN REGISTRO */}
        {/* <Route path="/auth/*" element ={ <AuthRoutes />}/> */}
        {/* JournaApp */}
        {/* <Route  path="/*" element ={ <JournalRoutes />}/> */}
    </Routes>
  )
}
