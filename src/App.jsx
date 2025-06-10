import React from 'react';
import Navbar from './Components/Nav/Navbar.jsx';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes.jsx';


function App() {

  return (
    <>
<RouterProvider router={routes} />

    </>
  )
}

export default App
