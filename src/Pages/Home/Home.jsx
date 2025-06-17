import React from 'react'
import Category from '../../Components/Cotegory/Category';
import Proucts from '../../Components/Products/Priductss';


function Home() {
  const title = document.querySelector('title');
  title.textContent = "Home | E-commerce";
  return (
    <>
    <Category />
    <Proucts />
    
    
    </>
  )
}

export default Home