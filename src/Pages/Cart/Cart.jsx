import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Card,
  Button
} from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import Loading from '../../Components/Loader/Loading';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
  const [Products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  let test = 0;

  const CartProducts = async () => {
    const Usertoken = localStorage.getItem('Usertoken');
    const { data } = await axios.get(`${import.meta.env.VITE_BURL}/Carts`, {
      headers: {
        Authorization: `Bearer ${Usertoken}`
      }
    });
    setProducts(data.cartResponse);
    setTotalPrice(data.totalPrice);
    data.cartResponse.forEach((product) => {
      test = test + product.count;
    });
    setTotalItems(test);
    setIsLoading(false);
  };

  const increse = async (id) => {
    const Usertoken = localStorage.getItem('Usertoken');
    await axios.patch(`${import.meta.env.VITE_BURL}/Carts/increaseCount/${id}`, {}, {
      headers: { Authorization: `Bearer ${Usertoken}` }
    });
    const updateProduct = Products.map((product) =>
      product.id === id ? { ...product, count: product.count + 1 } : product
    );
    setProducts(updateProduct);
  };

  const decrese = async (id) => {
    const Usertoken = localStorage.getItem('Usertoken');
    await axios.patch(`${import.meta.env.VITE_BURL}/Carts/decreaseCount/${id}`, {}, {
      headers: { Authorization: `Bearer ${Usertoken}` }
    });
    let updateProduct = Products.map((product) =>
      product.id === id ? { ...product, count: product.count - 1 } : product
    ).filter((product) => product.count > 0);
    setProducts(updateProduct);
  };

  const RemoveItem = async (id) => {
    const Usertoken = localStorage.getItem('Usertoken');
    await axios.delete(`${import.meta.env.VITE_BURL}/Carts/${id}`, {
      headers: { Authorization: `Bearer ${Usertoken}` }
    });
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const ClearCart = async () => {
    const Usertoken = localStorage.getItem('Usertoken');
    await axios.delete(`${import.meta.env.VITE_BURL}/Carts/clearCart`, {
      headers: { Authorization: `Bearer ${Usertoken}` }
    });
    toast.success('Cart is empty', {
      position: 'top-center',
      autoClose: 3000,
      transition: Bounce
    });
    setProducts([]);
  };

  useEffect(() => {
    CartProducts();
    document.title = "Cart | E-commerce";
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Box className="container text-center">
      <ToastContainer />

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          mt: 5,
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(to right, #1565c0, #42a5f5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        Shopping Cart
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 , display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Grid item xs={12} md={8}>
          {Products.map((item) => (
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
                mb: 2,
                gap: 2
              }}
              key={item.id}
            >
              <CardMedia
                component="img"
                image="https://placehold.co/200"
                sx={{
                  borderRadius: '8px',
                  width: { xs: '100%', sm: '200px' },
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>{item.name}</Typography>
                <Typography variant="h5" color="primary" gutterBottom>{item.price} $</Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  flexWrap: 'wrap',
                  mt: { xs: 1, sm: 0 }
                }}
              >
                <IconButton onClick={() => decrese(item.id)}><Remove /></IconButton>
                <Typography variant="span" className="mt-2" color="gray">{item.count}</Typography>
                <IconButton onClick={() => increse(item.id)}><Add /></IconButton>
                <IconButton><Delete onClick={() => RemoveItem(item.id)} color="error" /></IconButton>
              </Box>
            </Card>
          ))}

          {Products.length < 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="h5"
                color="error"
                sx={{
                  width: "100%",
                  mt: 2,
                  p: 2,
                  textAlign: "center",
                  border: "1px solid red",
                  borderRadius: "8px"
                }}
              >
                Your Cart is Empty
              </Typography>
            </Box>
          )}

          {Products.length > 0 && (
            <Button variant="contained" color="error" onClick={ClearCart}>
              <Delete /> Clear Cart
            </Button>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              width: '100%'
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}
            >
              Order Summary
            </Typography>

            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <MonetizationOnIcon sx={{ mr: 1, color: '#43a047' }} />
                Total Price:
                <Typography component="span" sx={{ fontWeight: 'bold', color: '#2e7d32', ml: 1 }}>
                  {totalPrice} $
                </Typography>
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                🛒 Total Items:
                <Typography component="span" sx={{ fontWeight: 'bold', color: '#1565c0', ml: 1 }}>
                  {totalItems}
                </Typography>
              </Typography>

              <Box mt={3}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  🚚 Shipping Info
                </Typography>
                <Typography variant="body2" color="textSecondary">- West Bank: $12</Typography>
                <Typography variant="body2" color="textSecondary">- Jerusalem: $20</Typography>
                <Typography variant="body2" color="textSecondary">- Inside 1948 Areas: $30</Typography>
              </Box>
            </CardContent>

            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              sx={{
                width: '100%',
                mt: 3,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 3,
                background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                color: 'white',
                textTransform: 'none',
                transition: '0.3s',
                '&:hover': {
                  background: 'linear-gradient(to right, #1565c0, #1e88e5)',
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Card>

          <Card className="mt-3 p-3">
            <Typography variant="span" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Note: If the purchase value exceeds <br /> $1,000 or more,<br />
              delivery to the customer is free <br /> and packaging is free.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
