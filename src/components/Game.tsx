import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Movie, GameState, Guess, GameStats } from '../types/game';
import VideoPlayer from './VideoPlayer';
import GuessInput from './GuessInput';
import GuessList from './GuessList';
import ResultsModal from './ResultsModal';
import { getMovieForDate } from '../data/movies';

export {}; // Make this file a module

const STORAGE_KEY = 'budgetle_game_state';
const LAST_PLAYED_KEY = 'budgetle_last_played';
const STATS_KEY = 'budgetle_stats';

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  },
  lastUpdated: new Date().toISOString().split('T')[0]
};

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load saved state from localStorage
    const savedState = localStorage.getItem(STORAGE_KEY);
    const lastPlayed = localStorage.getItem(LAST_PLAYED_KEY);
    const today = new Date().toISOString().split('T')[0];

    // If it's a new day or no saved state, start fresh
    if (!savedState || !lastPlayed || lastPlayed !== today) {
      localStorage.setItem(LAST_PLAYED_KEY, today);
      return {
        currentMovie: getMovieForDate(new Date()),
        guesses: [],
        gameOver: false,
        won: false,
        maxGuesses: 5
      };
    }

    // Otherwise return saved state
    return JSON.parse(savedState);
  });

  const [stats, setStats] = useState<GameStats>(() => {
    const savedStats = localStorage.getItem(STATS_KEY);
    return savedStats ? JSON.parse(savedStats) : DEFAULT_STATS;
  });

  const [showResults, setShowResults] = useState(false);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  // Show results modal automatically when game ends
  useEffect(() => {
    if (gameState.gameOver) {
      setShowResults(true);
    }
  }, [gameState.gameOver]);

  const updateStats = (won: boolean, numGuesses: number) => {
    setStats(prevStats => {
      const newStats = { ...prevStats };
      newStats.gamesPlayed += 1;
      
      if (won) {
        newStats.gamesWon += 1;
        newStats.currentStreak += 1;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        newStats.guessDistribution[numGuesses as keyof typeof newStats.guessDistribution] += 1;
      } else {
        newStats.currentStreak = 0;
      }
      
      newStats.lastUpdated = new Date().toISOString().split('T')[0];
      return newStats;
    });
  };

  const handleGuess = (amount: number) => {
    if (gameState.gameOver || !gameState.currentMovie) return;

    const difference = amount - gameState.currentMovie.budget;
    const percentageDiff = Math.abs(difference) / gameState.currentMovie.budget;
    
    let feedback: Guess['feedback'];
    const isCorrect = percentageDiff <= 0.1; // Within 10% is considered correct

    if (isCorrect) {
      feedback = 'correct';
    } else if (difference > 0) {
      feedback = percentageDiff > 0.5 ? 'way-too-high' : 'too-high';
    } else {
      feedback = percentageDiff > 0.5 ? 'way-too-low' : 'too-low';
    }

    const newGuesses = [...gameState.guesses, {
      amount,
      difference,
      isCorrect,
      feedback
    }];

    const gameOver = isCorrect || newGuesses.length >= gameState.maxGuesses;

    if (gameOver) {
      updateStats(isCorrect, newGuesses.length);
    }

    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      gameOver,
      won: isCorrect
    }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Budgetle
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          Guess the movie's budget!
        </Typography>

        {gameState.currentMovie && (
          <>
            <Typography 
              variant="h5" 
              component="h3" 
              align="center" 
              gutterBottom
              sx={{ 
                color: 'primary.main',
                fontWeight: 500,
                mb: 2
              }}
            >
              {gameState.currentMovie.title} ({gameState.currentMovie.releaseYear})
            </Typography>
            <VideoPlayer youtubeId={gameState.currentMovie.youtubeClipId} />
          </>
        )}

        <GuessInput 
          onGuess={handleGuess}
          disabled={gameState.gameOver}
          remainingGuesses={gameState.maxGuesses - gameState.guesses.length}
        />

        <GuessList guesses={gameState.guesses} />

        {gameState.gameOver && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setShowResults(true)}
            >
              Show Results
            </Button>
          </Box>
        )}

        <ResultsModal
          open={showResults}
          onClose={() => setShowResults(false)}
          gameState={gameState}
          stats={stats}
        />
      </Box>
    </Container>
  );
};

export default Game; 