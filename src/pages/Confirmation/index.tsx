import React, { useEffect, useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './Confirmation.module.css';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Clean up timer if component unmounts
  }, [navigate]);

  return (
    <Container className={styles.container} style={{ marginLeft: (screenWidth > 600) ? 240 : 0 }}>
      <Box className={styles.content}>
        <img src={require('../../assets/tick.png')} />
        <Typography variant="h4" className={styles.title}>
          Booking Confirmed!
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Thank you for your booking. You’ll receive a confirmation shortly.
        </Typography>
      </Box>
    </Container>
  );
};

export default Confirmation;
