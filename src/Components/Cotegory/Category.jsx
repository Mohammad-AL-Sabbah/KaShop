import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CardActions, CardContent, Typography, Card, Grid, Box } from '@mui/material';
import Styles from './Category.module.css';

function Categorys() {
  const [Categorys, setCategorys] = useState([]);

  const getCategorey = async () => {
    const { data } = await axios.get(`http://mytshop.runasp.net/api/categories`);
    setCategorys(data);
  };

  useEffect(() => {
    getCategorey();
  }, []);

  return (
    <>
      <Box width="100%" textAlign="center">
        <h2>Categories || الأصناف</h2>
      </Box>

      <Grid container spacing={2} className={Styles.cont}>
        {Categorys.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card className={Styles.card}>
              <CardContent>
                <Typography component="h4">{item.name}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </>
  );
}

export default Categorys;
