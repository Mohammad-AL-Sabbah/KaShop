import React from 'react'
import Navbar from '../Components/Nav/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { Container } from '@mui/material'



function MainLayOut() {
  return (
<>
    <Navbar />
    <Container>
    <Outlet />
    </Container>
    <Footer />
</>
  )
}

export default MainLayOut