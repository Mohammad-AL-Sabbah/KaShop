import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CardActions, CardContent, Typography, Card, Grid, Box } from '@mui/material';
import Styles from './Category.module.css';

function Categorys() {
  const [Categorys, setCategorys] = useState([]);

  const getCategorey = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BURL}/categories`);
    setCategorys(data);
  };

  useEffect(() => {
    getCategorey();
  }, []);

  return (
    <>
      <Box width="100%" textAlign="center" sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold", letterSpacing: 1 }}>
          Categories || الأصناف
        </Typography>
      </Box>

      <Box className={Styles.cont}>
        {Categorys.map((item) => (
          <Card className={Styles.card} key={item.id} raised>
            <CardContent>
              <Typography
                component="h4"
                sx={{ fontWeight: '600', fontSize: '1.2rem', color: '#0d47a1', textAlign: 'center' }}
              >
                {item.name}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  color: 'white',
                  borderColor: '#1976d2',
                  fontWeight: 'bold',
                }}
              >
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default Categorys;
