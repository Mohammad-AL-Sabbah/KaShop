import React from 'react';
import { TextField, InputAdornment, Box, Button, Typography } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { toast, Bounce, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Components/Loader/Loading';
import { useState } from 'react';


function LogIN() {
  const { register, handleSubmit,formState: { errors}, } = useForm({ mode: "onChange" });
  
  const [Loadings, setLoadings] = useState(false);
  const navigate = useNavigate();

  const title = document.querySelector('title');
  title.textContent = "Login | E-commerce";
  const LoginUser = async (data) => {
    try {
      setLoadings(true);
      const response = await axios.post(`${import.meta.env.VITE_BURL}/Account/Login`, data);
      if (response.status === 200) {
        toast.success('Login Successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
      localStorage.setItem("Usertoken", response.data.token);
        setTimeout(() => {
          navigate('/');
        }, 1100);

      }
    } catch (error) {
      toast.error('Login failed. Email or password is incorrect.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      console.error(error);
    }finally {
      setLoadings(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <Typography variant='h3' sx={{ textAlign: 'center', marginTop: '2rem', fontWeight: 'bold' }}>
        Login Here
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          component={"form"}
          sx={{ width: '60%' }}
          className={styles.formControl}
          onSubmit={handleSubmit(LoginUser)}
        >
          <TextField
            {...register("email", { required: "Email is required", minLength:{
              value:5,
              message: "Email must be at least 5 characters long",
            } })}
            label="Email"
           
            sx={{ m: 1 }}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              },
            }}
            helperText={errors.email?.message}
            error={errors.email}

          />

          <TextField
            {...register("password",{ required: "Password is required" , pattern:{
              message: "Password must be at least 8 characters long and contain at least one letter and one number",
            } })}
            label="Password"
            type="password"
            sx={{ m: 1 }}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              },
            }}
            helperText={errors.password?.message }
            error={errors.password}
          />

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant="contained" type="submit" disabled={Loadings}>
              {Loadings?'loading...':'login'}
            </Button>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Button
                variant="text"
                component={Link}
                to="/reset-password"
                sx={{
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  color: '#1976d2',
                  '&:hover': {
                    textDecoration: 'underline',
                    backgroundColor: 'transparent',
                  },
                }}
                                endIcon={<HelpOutlineIcon sx={{ fontSize: '1.2rem' }} />}

              >
                Forgot Password
              </Button >
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1rem',
              }}
            >
              <Typography variant="h6">Don't have an account?</Typography>
              <Button component={Link} to="/register">
                Register here
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LogIN;