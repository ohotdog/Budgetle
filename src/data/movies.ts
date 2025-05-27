import { Movie } from '../types/game';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    budget: 160000000,
    youtubeClipId: 'YoHD9XEInc0',
    releaseYear: 2010
  },
  {
    id: '2',
    title: 'The Blair Witch Project',
    budget: 60000,
    youtubeClipId: 'MwZ12gJD1-Q',
    releaseYear: 1999
  },
  {
    id: '3',
    title: 'Avatar',
    budget: 237000000,
    youtubeClipId: '5PSNL1qE6VY',
    releaseYear: 2009
  },
  {
    id: '4',
    title: 'Paranormal Activity',
    budget: 15000,
    youtubeClipId: 'F_UxLEqd074',
    releaseYear: 2007
  },
  {
    id: '5',
    title: 'Pirates of the Caribbean: At World\'s End',
    budget: 300000000,
    youtubeClipId: 'HKSZtp_OGHY',
    releaseYear: 2007
  },
  {
    id: '6',
    title: 'The Breakfast Club',
    budget: 1000000,
    youtubeClipId: '3jNj19V3mO4',
    releaseYear: 1985
  },
  {
    id: '7',
    title: 'Titanic',
    budget: 200000000,
    youtubeClipId: 'zCy5WH7QukM',
    releaseYear: 1997
  },
  {
    id: '8',
    title: 'Mad Max: Fury Road',
    budget: 150000000,
    youtubeClipId: 'hEJnMQG9ev8',
    releaseYear: 2015
  },
  {
    id: '9',
    title: 'El Mariachi',
    budget: 7000,
    youtubeClipId: 'jF2zDtj6GEY',
    releaseYear: 1992
  },
  {
    id: '10',
    title: 'The Avengers',
    budget: 220000000,
    youtubeClipId: 'eOrNdBpGMv8',
    releaseYear: 2012
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