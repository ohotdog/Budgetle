import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { GameStats } from '../types/game';

interface StatsDisplayProps {
  stats: GameStats;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const maxGuesses = Math.max(...Object.values(stats.guessDistribution));

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Statistics
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        mb: 3
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{stats.gamesPlayed}</Typography>
          <Typography variant="body2">Played</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{winPercentage}%</Typography>
          <Typography variant="body2">Win %</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{stats.currentStreak}</Typography>
          <Typography variant="body2">Current Streak</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{stats.maxStreak}</Typography>
          <Typography variant="body2">Max Streak</Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1" align="center" gutterBottom>
        Guess Distribution
      </Typography>
      
      {Object.entries(stats.guessDistribution).map(([guess, count]) => (
        <Box key={guess} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ mr: 2, minWidth: '20px' }}>{guess}</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={maxGuesses > 0 ? (count / maxGuesses) * 100 : 0}
              sx={{
                height: 20,
                borderRadius: 1,
                backgroundColor: 'background.paper',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'primary.main',
                }
              }}
            />
          </Box>
          <Typography sx={{ ml: 2, minWidth: '30px' }}>{count}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StatsDisplay; 