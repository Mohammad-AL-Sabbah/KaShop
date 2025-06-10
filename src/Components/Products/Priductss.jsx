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
function Proucts() {
  const [Products, setProducts] = useState([]);

  const GetProducts = async () => {
    const { data } = await axios.get(`http://mytshop.runasp.net/api/products`);
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <>
      <Box width="100%" textAlign="center" mt={5}>
        <h2>Products || المنتجات</h2>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {Products.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
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
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" component={Link} to={`/product/${item.id}`}>
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
