import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const difference = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Then update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="body1" color="text.secondary">
        Next Budgetle in
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontFamily: 'monospace' }}>
        {timeLeft}
      </Typography>
    </Box>
  );
};

export default CountdownTimer; 