import { Movie } from '../types/game';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Raising the Bar',
    budget: 300000,
    youtubeClipId: '7eUFkeKHRwk',
    releaseYear: 2016
  },
  {
    id: '2',
    title: 'The ABCs of Death',
    budget: 5000,
    youtubeClipId: 'sOjnX-Mbzqg',
    releaseYear: 2012
  },
  {
    id: '3',
    title: 'Money Train',
    budget: 68000000,
    youtubeClipId: 'tr86n2JRUyRc',
    releaseYear: 1995
  },
  {
    id: '4',
    title: 'Battleship',
    budget: 215000000,
    youtubeClipId: 'c52XFAsnJpU',
    releaseYear: 2012
  },
  {
    id: '5',
    title: 'Christine',
    budget: 10000000,
    youtubeClipId: '64mPmCQLOjc',
    releaseYear: 1983
  }
];

// Function to get a random movie from the collection
export const getRandomMovie = (): Movie => {
  const index = Math.floor(Math.random() * movies.length);
  return movies[index];
};

// Function to get a movie based on the date
export const getMovieForDate = (date: Date): Movie => {
  // Get a consistent date string in YYYY-MM-DD format
  const dateKey = date.toISOString().split('T')[0];
  
  // Get the day number since epoch to ensure proper rotation
  const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  
  // Use the daysSinceEpoch to select a movie
  // This ensures we rotate through all movies in order
  const index = daysSinceEpoch % movies.length;
  
  return movies[index];
};

// Simple string hash function
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
}; 