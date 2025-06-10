import { createRoot } from 'react-dom/client'
import React from 'react'
import theme from './Theme/index.js'

import './index.css'


import App from './App.jsx'
import { ThemeProvider } from 'styled-components'
import { CssBaseline } from '@mui/material';
createRoot(document.getElementById('root')).render(

    <ThemeProvider theme={theme}>
        
        <CssBaseline />
    <App />
    </ThemeProvider>
)
