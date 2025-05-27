import React from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GameState, GameStats } from '../types/game';
import ShareButton from './ShareButton';
import CountdownTimer from './CountdownTimer';
import StatsDisplay from './StatsDisplay';

interface ResultsModalProps {
  open: boolean;
  onClose: () => void;
  gameState: GameState;
  stats: GameStats;
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  open,
  onClose,
  gameState,
  stats
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="game-results-modal"
      disableScrollLock={false}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '85%', sm: '450px' },
        maxHeight: { xs: '75vh', sm: '85vh' },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header - Fixed */}
        <Box sx={{ 
          p: { xs: 1.5, sm: 2 },
          pr: { xs: 3.5, sm: 4 },
          position: 'relative',
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              right: 4,
              top: 4
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography 
            variant="h5" 
            component="h2" 
            align="center"
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              wordBreak: 'break-word',
              mb: 0
            }}
          >
            {gameState.won 
              ? "Congratulations! You've guessed correctly!" 
              : `Game Over! The actual budget was $${gameState.currentMovie?.budget.toLocaleString()}`}
          </Typography>
        </Box>

        {/* Content - Scrollable */}
        <Box sx={{ 
          p: { xs: 1.5, sm: 2 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2 },
          overflowY: 'auto',
          '& > *': { transform: 'scale(0.95)' }
        }}>
          <ShareButton 
            guesses={gameState.guesses}
            won={gameState.won}
            maxGuesses={gameState.maxGuesses}
          />
          
          <Divider flexItem sx={{ opacity: 0.5 }} />
          
          <CountdownTimer />
          
          <Divider flexItem sx={{ opacity: 0.5 }} />
          
          <Box sx={{ width: '100%', transform: 'scale(0.95)' }}>
            <StatsDisplay stats={stats} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResultsModal; 