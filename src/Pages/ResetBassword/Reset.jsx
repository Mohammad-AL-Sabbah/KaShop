import React from 'react'
import { TextField, InputAdornment, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Reset.module.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetBassword() {
  const {register , handleSubmit} = useForm();
   const navigate = useNavigate();
  const ResetBass = async (data) => {
    const response = await axios.post("http://mytshop.runasp.net/api/Account/ForgotPassword", data);
    localStorage.setItem("Usertoken", response.data.token);
    console.log(response);
     if (response.status === 200) {
      toast.success('Check your email', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});

  setTimeout(() => {
    navigate("/verify-code");
  }, 2100);
      }else{
        console.error("Failed to reset password:");
      }
  }
  return (
  <>
  <Box component={"form"} className={styles.formControl}  onSubmit={handleSubmit(ResetBass)}> 
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
        <Button variant='outlined' type='submit' >Send Code</Button>
          <ToastContainer />
  </Box>
  </>
  )
}

export default ResetBassword