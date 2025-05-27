import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface GuessInputProps {
  onGuess: (amount: number) => void;
  disabled: boolean;
  remainingGuesses: number;
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuess, disabled, remainingGuesses }) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = Number(value.replace(/[^0-9]/g, ''));
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    onGuess(amount);
    setValue('');
    setError('');
  };

  const formatValue = (input: string) => {
    // Remove non-numeric characters and format as currency
    const numericValue = input.replace(/[^0-9]/g, '');
    if (numericValue) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(Number(numericValue));
    }
    return input;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setValue(formatValue(rawValue));
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="body1" gutterBottom>
        Remaining guesses: {remainingGuesses}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Enter movie budget"
          value={value}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          disabled={disabled}
          placeholder="$1,000,000"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={disabled || !value}
          sx={{ minWidth: '100px' }}
        >
          Guess
        </Button>
      </Box>
    </Box>
  );
};

export default GuessInput; 