import React from 'react'
import { TextField, InputAdornment, Box, Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Register.module.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const {register , handleSubmit} = useForm();
  const RegisterData = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_BURL}/Account/register`, data);
    console.log(response.data);
  }
  
  const title = document.querySelector('title');
  title.textContent = "Register | E-commerce";
  return (
  <>
<Box className={styles.registerContainer}>
  <Typography variant='h3' sx={{color:"black" , fontWeight:"bold"}} className='mt-3 mb-2'>
    Register Here
  </Typography>
  <Box component={"form"} className={styles.formControl} onSubmit={handleSubmit(RegisterData)}> 
   <TextField
   {...register("firstName")}
          label="First name"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>,
            },
          }}
        />


          <TextField
             {...register("lastName")}

          label="Last name"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>,
            },
          }}
        />

  <TextField
               {...register("userName")}

          label="User name"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>,
            },
          }}
        />


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
          {...register("confirmPassword")}
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
        

           <TextField
          {...register("birthOfDate")}
          label="birth Of Date"
          type="date"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>,
            },
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center' }}>
        <Button variant='contained' type='submit' sx={{width:"20%", height:"40px"}} >Register</Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}> 
          <Typography>
              Have an account ?
          </Typography>
        <Button variant='text'
        component={Link}
        to="/login"
        > Login here</Button>

        </Box>

        </Box>
  


  </Box>
  </Box>
 
  </>
  )
}

export default Register