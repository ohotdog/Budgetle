import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, Stack } from '@mui/material';
import { Guess } from '../types/game';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface GuessListProps {
  guesses: Guess[];
}

const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  const getGuessColor = (feedback: Guess['feedback']) => {
    switch (feedback) {
      case 'correct':
        return 'success.main';
      case 'way-too-high':
      case 'too-high':
        return 'error.main';
      case 'way-too-low':
      case 'too-low':
        return 'warning.main';
      default:
        return 'text.primary';
    }
  };

  const getFeedbackIcon = (feedback: Guess['feedback']) => {
    switch (feedback) {
      case 'correct':
        return <CheckCircleIcon color="success" />;
      case 'way-too-high':
        return (
          <Stack direction="row">
            <ArrowDownwardIcon color="error" />
            <ArrowDownwardIcon color="error" />
          </Stack>
        );
      case 'too-high':
        return <ArrowDownwardIcon color="error" />;
      case 'way-too-low':
        return (
          <Stack direction="row">
            <ArrowUpwardIcon color="warning" />
            <ArrowUpwardIcon color="warning" />
          </Stack>
        );
      case 'too-low':
        return <ArrowUpwardIcon color="warning" />;
      default:
        return null;
    }
  };

  if (guesses.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Previous Guesses
      </Typography>
      <List>
        {guesses.map((guess, index) => (
          <ListItem
            key={index}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
              mb: 1,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    component="span"
                    sx={{ color: getGuessColor(guess.feedback) }}
                  >
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(guess.amount)}
                  </Typography>
                  {getFeedbackIcon(guess.feedback)}
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GuessList; 