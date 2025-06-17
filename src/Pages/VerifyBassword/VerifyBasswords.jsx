import React from 'react'
import { TextField, InputAdornment, Box, Button } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './Verify.module.css';
import PasswordIcon from '@mui/icons-material/Password';
import SecurityIcon from '@mui/icons-material/Security';



function VerifyBasswords() {
  const {register , handleSubmit} = useForm();
  const verifyBasswords = async (data) => {
    const response = await axios.patch(`${import.meta.env.VITE_BURL}/Account/SendCode`, data);
    console.log(response);
  }

    
  const title = document.querySelector('title');
  title.textContent = "Verify Bassword | E-commerce";
  return (
  <>

  <Box component={"form"} className={styles.formControl} onSubmit={handleSubmit(verifyBasswords)}> 
          <TextField
          {...register("email")}
          label="Email"

          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>,
            },
          }}
        />  

 <TextField
          {...register("code")}
          label="code to verify"
          type="number"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <SecurityIcon />
              </InputAdornment>,
            },
          }}
        />
        <TextField
          {...register("password")}
          label="Bassword"
          type="password"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>,
            },
          }}
        />


          <TextField
          {...register("ConfirmPassword")}
          label="confirm Password"
          type="password"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>,
            },
          }}
        />



        <Button variant='outlined' type='submit'>Reset Password</Button>
        
  


  </Box>
 
  </>
  )
}

export default VerifyBasswords