export interface Movie {
  id: string;
  title: string;
  budget: number;
  youtubeClipId: string;
  releaseYear: number;
}

export interface Guess {
  amount: number;
  difference: number;
  isCorrect: boolean;
  feedback: 'way-too-low' | 'too-low' | 'correct' | 'too-high' | 'way-too-high';
}

export interface GameState {
  currentMovie: Movie | null;
  guesses: Guess[];
  gameOver: boolean;
  won: boolean;
  maxGuesses: number;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  lastUpdated: string;
} 