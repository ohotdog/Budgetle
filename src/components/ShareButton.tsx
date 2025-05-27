import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Guess } from '../types/game';

interface ShareButtonProps {
  guesses: Guess[];
  won: boolean;
  maxGuesses: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ guesses, won, maxGuesses }) => {
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const generateShareText = () => {
    const today = new Date().toLocaleDateString();
    const guessCount = guesses.length;
    
    let resultText = `Budgetle ${today}\n`;
    resultText += `${won ? guessCount : 'X'}/${maxGuesses}\n\n`;

    // Generate emoji grid
    guesses.forEach(guess => {
      switch (guess.feedback) {
        case 'correct':
          resultText += '🟩';
          break;
        case 'way-too-high':
          resultText += '⬇️⬇️';
          break;
        case 'too-high':
          resultText += '⬇️';
          break;
        case 'way-too-low':
          resultText += '⬆️⬆️';
          break;
        case 'too-low':
          resultText += '⬆️';
          break;
      }
      resultText += ' ';
    });

    resultText += '\n\nPlay at: https://budgetle.com';
    return resultText;
  };

  const handleShare = async () => {
    const shareText = generateShareText();

    try {
      if (navigator.share && navigator.canShare({ text: shareText })) {
        await navigator.share({ text: shareText });
        setSnackbarState({
          open: true,
          message: 'Result shared successfully!',
          severity: 'success'
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setSnackbarState({
          open: true,
          message: 'Result copied to clipboard!',
          severity: 'success'
        });
      }
    } catch (err) {
      // Handle both share and clipboard errors
      let errorMessage = 'Failed to share results. ';
      if (err instanceof Error && err.name === 'NotAllowedError') {
        errorMessage += 'Please allow clipboard access or manually copy the result.';
      } else {
        errorMessage += 'Please try again.';
      }
      setSnackbarState({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarState(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ShareIcon />}
        onClick={handleShare}
        sx={{ mt: 2 }}
      >
        Share Result
      </Button>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarState.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareButton; 