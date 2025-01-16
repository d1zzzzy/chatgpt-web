import { Box, Typography } from '@mui/material';

import { COLORS } from '../constants/colors';

interface ErrorMessageProps {
  error: {
    title: string;
    message: string;
  };
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2000,
        bgcolor: COLORS.error.background,
        color: COLORS.error.text,
        p: 2,
        borderRadius: 1,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        maxWidth: '90%',
        width: 'auto',
        border: `1px solid ${COLORS.error.border}`,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {error.title}
      </Typography>
      <Typography variant="body2">
        {error.message}
      </Typography>
    </Box>
  );
};
