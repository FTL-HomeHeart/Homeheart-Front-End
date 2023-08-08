import React from "react"; 
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh', 
          gap: '3rem'
        }}
      >
        <Typography variant="h1" style={{ color: '#7693B0' }}>
          404
        </Typography>
        <Typography variant="h6" style={{ color: "#7693B0" }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" component={Link} to="/" sx={{backgroundColor: "#7693B0"}}>Back Home</Button>
      </Box>
    );
};

export default NotFound; 