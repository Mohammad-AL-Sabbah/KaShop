import React from 'react'
import Navbar from '../Components/Nav/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { Container } from '@mui/material'
import CartContextProvuder from '../Context/ContextCart'



function MainLayOut() {
  return (
<>
    <CartContextProvuder>
    <Navbar />
    <Container>
    <Outlet />
    </Container>
    <Footer />
     </CartContextProvuder>
</>
  )
}

export default MainLayOut