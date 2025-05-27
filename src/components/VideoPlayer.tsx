import React from 'react';
import { Box } from '@mui/material';

interface VideoPlayerProps {
  youtubeId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ youtubeId }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        aspectRatio: '16/9',
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0`}
        title="Movie clip"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </Box>
  );
};

export default VideoPlayer; 