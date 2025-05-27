import React from 'react';
import { Box, Link, Stack } from '@mui/material';
import { getRandomMovie } from '../data/movies';

const DebugBanner: React.FC = () => {
  const handleReset = () => {
    // Clear all localStorage
    localStorage.clear();
    // Reload the page to reset the game state
    window.location.reload();
  };

  const handleNextMovie = () => {
    // Get a random movie
    const nextMovie = getRandomMovie();
    
    // Create a new game state with the random movie
    const newGameState = {
      currentMovie: nextMovie,
      guesses: [],
      gameOver: false,
      won: false,
      maxGuesses: 5
    };
    
    // Update the game state in localStorage
    localStorage.setItem('budgetle_game_state', JSON.stringify(newGameState));
    
    // Reload the page to start fresh
    window.location.reload();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ff4d4d',
        color: '#ffffff',
        padding: '4px',
        fontSize: '0.8rem',
        textAlign: 'center',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid #ff3333'
      }}
    >
      <span>🚧 Work in Progress 🚧</span>
      <Stack direction="row" spacing={2}>
        <Link
          component="button"
          variant="body2"
          onClick={handleReset}
          sx={{
            color: 'inherit',
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          Reset Game
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={handleNextMovie}
          sx={{
            color: 'inherit',
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          Random Movie →
        </Link>
      </Stack>
    </Box>
  );
};

export default DebugBanner; 