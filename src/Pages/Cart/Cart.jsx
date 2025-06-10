import React, { useEffect } from 'react';
import axios from 'axios';
import { Box, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@mui/material/Card';
import { Remove,Add, Delete } from '@mui/icons-material';
import { useState } from 'react';
import Loading from '../../Components/Loader/Loading';
import { Button } from '@mui/material';
import { toast, Bounce, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';



function Cart() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const CartProducts = async () => {
    const Usertoken = localStorage.getItem('Usertoken');
  
    const { data } = await axios.get(`http://mytshop.runasp.net/api/Carts`, {
      headers: {
        Authorization: `Bearer ${Usertoken}`
      }

    });
    setCart(data.cartResponse);
    setIsLoading(false);
  };

    const increse = async (id) =>{
    const Usertoken = localStorage.getItem('Usertoken');
    const {data} = await axios.patch(`http://mytshop.runasp.net/api/Carts/increaseCount/${id}`,{},{
      headers: {
        Authorization: `Bearer ${Usertoken}` 
      }
    });
  // await CartProducts();
  const updateProduct = cart.map((product)=>{
    if(product.id == id){
      return {...product , count: product.count + 1}
    }else{
      return product;
    }
  });
  setCart(updateProduct);
  } 

   const decrese = async (id) =>{
    const Usertoken = localStorage.getItem('Usertoken');
    const {data} = await axios.patch(`http://mytshop.runasp.net/api/Carts/decreaseCount/${id}`,{},{
      headers: {
        Authorization: `Bearer ${Usertoken}` 
      }
    });
  // await CartProducts();
  let updateProduct = cart.map((product)=>{
    if(product.id == id){
      return {...product , count: product.count - 1}
    }else{
      return product;
    }
  }).filter((product)=>{
    return product.count > 0;
  });

  setCart(updateProduct);
  } 


  const RemoveItem = async (id) =>{
    const Usertoken = localStorage.getItem('Usertoken');
    const {data} = await axios.delete(`http://mytshop.runasp.net/api/Carts/${id}`,{
      headers: {
        Authorization: `Bearer ${Usertoken}` 
      }
    });

    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== id);
    }); 
  }


  const ClearCart = async () => {
    const Usertoken = localStorage.getItem('Usertoken');
    const {data} = await axios.delete(`http://mytshop.runasp.net/api/Carts/clearCart`,{
      headers: {
        Authorization: `Bearer ${Usertoken}` 
      }
      
    })
        toast.success('Cart is empty', {
position: "top-center",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
    
    setCart([]);

  }
  useEffect(() => {
    CartProducts();

  }, []); 


   if(isLoading){
    return <Loading />
  }

  return (
   
      <Box className="container text-center" >
      <ToastContainer />


        <Typography variant="h3" className=" mt-5" gutterBottom>Shopping Cart</Typography>
        <Grid container spacing={4}>
          <Grid item size={{xs:12,md:8}}>

                 {cart.map((item)=>{
                  return <Card sx={{display:"flex",alignItems:"center" ,textAlign:"center",p:2 , mb:2}} key={item.id}>
              <CardMedia component={"img"} image='https://placehold.co/200'  sx={{borderRadius:"8px" , width:"200px"}} ></CardMedia>
              <CardContent>
                <Typography variant="h5" gutterBottom>{item.name} </Typography>
                <Typography variant="h5" color='primary' gutterBottom>{item.price} $ </Typography>
              </CardContent>

              <Box sx={{display:"flex",alignItems:"center" , justifyContent:"center" , gap:1}}>
                <IconButton onClick={()=>decrese(item.id)}><Remove /></IconButton>
                <Typography variant="span" className=" mt-2" color='gray'  gutterBottom>{item.count}</Typography>
                <IconButton onClick={()=>increse(item.id)}><Add /></IconButton>
                <IconButton><Delete onClick={()=>RemoveItem(item.id)} color='error'/></IconButton>
              </Box>
              

            </Card>
            
          })}

{cart.length < 1 && (
  <Box  sx={{display:"flex",alignItems:"center" , justifyContent:"center" , gap:1}}>
  <Typography variant="h5" color='error' sx={{width:"50%", mt:2,p:2,textAlign:"center",border:"1px solid red",borderRadius:"8px"}} >Your Cart is Empty</Typography>

  </Box>
)}
{cart.length > 0 && (
  <Button variant="contained" color="error" onClick={ClearCart}>
    <Delete /> Clear Cart
  </Button>
)}

           



          </Grid>

          <Grid item size={{xs:12,md:4}}>
            <Card>
              <Typography variant="h3" gutterBottom>Order Summary</Typography>
            </Card>
          </Grid>




        </Grid>
      </Box>
  );
}

export default Cart;
