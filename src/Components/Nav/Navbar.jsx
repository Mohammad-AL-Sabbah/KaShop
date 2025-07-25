import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';


function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const pagesGuest = [
  { label: 'Register', path: '/register' },
  { label: 'Login', path: '/login' },
];
const pagesAuth =  [
    { label: 'Cart', path: '/cart',},
]

const settings = ['Profile', 'Account', 'Dashboard', 'Logout' ];
  // const isLoggedIn = localStorage.getItem('Usertoken');
  
const isLoggedIn = localStorage.getItem("Usertoken") ? true : false;

  const handleLogout = () =>{
    localStorage.removeItem('Usertoken');
    window.location.href = '/login'; 
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              ria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
                <MenuItem
                  key={page.label} 
                  onClick={handleCloseNavMenu} 
                  component={Link} 
                  to={page.path}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                </MenuItem>
              ))}
              {isLoggedIn && (
                <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                  <Typography sx={{ textAlign: 'center' }}>LogOut</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          

          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.label}
              </Button>
            ))}
            {isLoggedIn ? (
              <Button onClick={handleLogout} sx={{ my: 2, color: 'white', display: 'block' }} >LogOut</Button>
            ):null}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
           <Tooltip title="Open settings">
  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    {isLoggedIn? (
      <Avatar alt="Remy Sharp" src="/Profile/pexels-photo-2379005.jpeg" />
    ) : (
      <Avatar alt="Guest" src="/static/images/avatar/1.jpg" />
    )}
  </IconButton>
</Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar; 