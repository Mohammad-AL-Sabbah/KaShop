import * as React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Box
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import stylis from './Products.module.css';
function Proucts() {
  const [Products, setProducts] = useState([]);

  const GetProducts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BURL}/products`);
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <>
      <Box width="100%" textAlign="center" mt={5}>
        <Typography variant="h4" sx={{  color: "#1976d2", fontWeight: "bold",mb:2 }}>Products || المنتجات</Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center" className={stylis.cont}>
        {Products.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ maxWidth: 345, margin: 'auto' }} className={stylis.contaier}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  className={stylis.img}
                  image={item.mainImg}
                  alt={item.name}
                  
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                       <Typography variant="span" color="">
                            Price and more in details
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button fullWidth color="primary" component={Link} to={`/product/${item.id}`}>
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid> 
        ))}
      </Grid>
    </>
  );
}

export default Proucts;
