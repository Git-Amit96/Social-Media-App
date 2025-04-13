import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import Routes from './Routes.jsx'
import AuthProvider from './utils/AuthProvider.jsx'
import '@fontsource/open-sans';
import ThemeProvider from './utils/ThemeContext.jsx';




createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={Routes} />
    </ThemeProvider>
  </AuthProvider>

)
