import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal/journalSlice'
import { uiSlice } from './ui/uiSlice'
import { appointmentSlice } from './appointment/appointmentSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
    ui: uiSlice.reducer,
    appointment: appointmentSlice.reducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ]
})