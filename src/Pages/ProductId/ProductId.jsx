import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Box,
  Button,
  CardActions
} from '@mui/material';

import { useEffect, useState } from 'react'
import Loading from '../../Components/Loader/Loading';
import { toast, Bounce, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


function ProductId() {
   const {id} = useParams('id');
   const [productid , setProductId] = useState([]);
   const [IsLoading, setIsLoading] = useState(true);
  
   const getProductId = async () => {
    const {data} = await axios.get(`http://mytshop.runasp.net/api/products/${id}`);
    setProductId(data);
    setIsLoading(false);
   }

const addtocart = async (id) => {
  const Usertoken = localStorage.getItem('Usertoken');
  console.log(Usertoken);
  // eslint-disable-next-line no-unused-vars
  const {data} = await axios.post(`http://mytshop.runasp.net/api/Carts/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${Usertoken}`
    }
  });
          toast.success('Product added to cart ✅', {
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
}

   useEffect(() => {
    getProductId();
   }, []);

    if (IsLoading) {
    return <Loading />
   }
  return (
    <>
    <Grid container spacing={2} justifyContent="center" sx={{mt:5}}>
           <ToastContainer />
     
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={productid.mainImg}
                  alt={productid.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {productid.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {productid.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
           <CardActions>
            <Button size="small" onClick={() => addtocart(productid.id)} >Add to Cart</Button>
          </CardActions>
            </Card>
          </Grid> 
      
        
      </Grid>
    
    
    
    </>
  )
}

export default ProductId





















      


