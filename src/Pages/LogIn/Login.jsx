import React from 'react'
import { TextField, InputAdornment, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import DateRangeIcon from '@mui/icons-material/DateRange';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
function LogIN() {
  const {register , handleSubmit} = useForm();
  const LoginUser = async (data) => {
    const response = await axios.post("http://mytshop.runasp.net/api/Account/Login", data);
    localStorage.setItem("Usertoken", response.data.token);
    console.log(response);
  }
  return (
  <>

  <Box component={"form"} className={styles.formControl} onSubmit={handleSubmit(LoginUser)}> 
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


    
        
        <Button variant='outlined' type='submit' >Login</Button>
  


  </Box>
 
  </>
  )
}

export default LogIN