import React from 'react'
import { TextField, InputAdornment, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Register.module.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useForm } from 'react-hook-form';
import axios from 'axios';
function Register() {
  const {register , handleSubmit} = useForm();
  const RegisterData = async (data) => {
    const response = await axios.post("http://mytshop.runasp.net/api/Account/register", data);
    console.log(response.data);
  }
  return (
  <>

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
        
        <Button variant='outlined' type='submit' >Register</Button>
  


  </Box>
 
  </>
  )
}

export default Register