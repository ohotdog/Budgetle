import React from 'react';
import { Box, Link, Button, Stack, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '8px',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        zIndex: 1000
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2 }}
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
      >
        <Link
          href="https://github.com/ohotdog"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          <GitHubIcon fontSize="small" />
          @ohotdog
        </Link>
        
        <Button
          variant="outlined"
          size="small"
          startIcon={<FavoriteIcon />}
          href="https://ko-fi.com/ohotdog"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: 4,
            textTransform: 'none',
            minWidth: 100
          }}
        >
          Donate
        </Button>
      </Stack>
    </Box>
  );
};

export default Footer; 