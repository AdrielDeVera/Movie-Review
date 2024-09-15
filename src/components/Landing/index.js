
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';



const Landing = () => {
  const navigate = useNavigate();

  return (
    
    <div >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>


            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/Search')}
            >
                <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                    Search
                </Typography>
            </Link>

            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/Review')}
            >
                <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                    Review
                </Typography>
            </Link>

            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/MyPage')}
            >
                <Typography variant="h6" color="inherit" noWrap sx={{ mx: 2 }}>
                    MyPage
                </Typography>
            </Link>
            
            <Button color="inherit" sx={{ ml: 'auto' }}>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ textAlign: 'center', height: '33vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h1">Welcome to the Movie Review Website!</Typography>
        <Typography variant="h3">Explore and enjoy your experience</Typography>
      
      </Box>
      <Box sx={{ alignItems:"center",display: 'flex', justifyContent:"center" }}>
      <img src="images/Landing.jpg" alt="Shrek" style={{ width: '500px', marginRight: 100}} />
      </Box>

      <Box sx={{ textAlign: 'center', height: '33vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      <Divider>My Favourite Movies</Divider>
      
        <Box sx={{ alignItems:"center",display: 'flex', justifyContent:"center" }}>
            <img src="images/Shrek.jpg" alt="Shrek" style={{ width: '200px', marginRight: 100}} />
            <img src="images/Shrek2.jpg" alt="Shrek2" style={{ width: '200px', marginRight: 100 }} />
            <img src="images/Shrek3.jpg" alt="Shrek2" style={{ width: '200px', marginRight: 100 }} />

    
          </Box>
      </Box>
  
      <Box sx={{ textAlign: 'center', height: '33vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <iframe src="https://www.youtube.com/embed/em9lziI07M4" title="YouTube video" allowfullscreen></iframe>
      </Box>
    </div>

  
  );
}

export default Landing;