import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Button,
  CardActions,
  Box,
  Divider
} from '@mui/material';

import { useEffect, useState } from 'react';
import Loading from '../../Components/Loader/Loading';
import { toast, Bounce, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function ProductId() {
  const { id } = useParams();
  const [productid, setProductId] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  const getProductId = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BURL}/products/${id}`);
      setProductId(data);
    } catch (error) {
      toast.error("Failed to load product data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductId();
  }, []);

  useEffect(() => {
    if (productid) {
      document.title = productid.name;
    }
  }, [productid]);

  const addtocart = async (id) => {
    const Usertoken = localStorage.getItem('Usertoken');

    if (!Usertoken) {
      toast.error("You need to log in first", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BURL}/Carts/${id}`, {}, {
        headers: { Authorization: `Bearer ${Usertoken}` }
      });

      toast(
        <Box sx={{ textAlign: 'center' }}>
          Product added to cart ✅ <br />
          <Link to="/cart" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>Go to Cart</Link>
        </Box>,
        {
          position: "top-center",
          autoClose: 3000,
          transition: Bounce,
        }
      );
    } catch (error) {
      toast.error("Something went wrong while adding to cart", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  if (IsLoading) {
    return <Loading />;
  }

  if (!productid) {
    return <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>Product not found</Typography>;
  }

  return (
    <>
      <ToastContainer />
      <Typography
        variant='h4'
        sx={{
          color: "#222",
          fontWeight: "700",
          textAlign: "center",
          mt: 5,
          mb: 5,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}
      >
        Product Details || تفاصيل المنتج
      </Typography>

      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ px: { xs: 2, md: 4 }, mb: 6 }}
        alignItems="center"
      >
        <Grid item xs={12} md={6} lg={5}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: 1.6,
              textAlign: 'justify',
              p: 3,
              bgcolor: '#f9f9f9',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              minHeight: 140,
              whiteSpace: 'pre-line',
              color: '#444',
            }}
          >
            Description:{"\n"} {productid.description}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={5} lg={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.06)', boxShadow: '0 12px 24px rgba(0,0,0,0.18)' },
              maxWidth: 450,
              margin: 'auto',
              bgcolor: '#fff',
            }}
            elevation={4}
          >
            <CardActionArea>
             <CardMedia
  component="img"
  height="210"          // قللت الارتفاع من 280 إلى 180
  image={productid.mainImg || '/fallback.jpg'}
  alt={productid.name}
  sx={{ objectFit: 'cover', bgcolor: '#fafafa', minWidth: 450, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
/>

              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    color: '#1565c0',
                    mb: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                  }}
                  title={productid.name}
                >
                  {productid.name}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#2e7d32', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                >
                  Price: ${productid.price.toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ p: 3 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => addtocart(productid.id)}
                sx={{
                  bgcolor: '#1976d2',
                  fontWeight: '700',
                  fontSize: '1rem',
                  '&:hover': { bgcolor: '#115293' },
                  borderRadius: 2
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductId;
