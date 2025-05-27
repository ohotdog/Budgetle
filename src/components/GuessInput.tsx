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

  const formatAsCurrency = (numericValue: string): string => {
    if (!numericValue) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(numericValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Extract only numbers from the input
    const numericValue = rawValue.replace(/[^0-9]/g, '');
    
    // Don't allow more than 12 digits (trillions)
    if (numericValue.length > 12) return;
    
    setValue(formatAsCurrency(numericValue));
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, home, end, arrows
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'Home', 'End', 'ArrowLeft', 'ArrowRight'
    ];
    
    // Allow numbers (both main keyboard and numpad)
    const isNumber = /^[0-9]$/.test(e.key);
    const isNumpadNumber = /^Numpad[0-9]$/.test(e.code);
    
    if (!allowedKeys.includes(e.key) && !isNumber && !isNumpadNumber) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numericValue = pastedData.replace(/[^0-9]/g, '');
    if (numericValue) {
      setValue(formatAsCurrency(numericValue));
    }
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
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          error={!!error}
          helperText={error}
          disabled={disabled}
          placeholder="$1,000,000"
          variant="outlined"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            'aria-label': 'Enter movie budget in dollars',
            style: { fontSize: '1.1rem' }
          }}
          onFocus={(e) => {
            const target = e.target as HTMLInputElement;
            requestAnimationFrame(() => {
              target.scrollLeft = target.scrollWidth;
              target.setSelectionRange(0, target.value.length);
            });
          }}
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