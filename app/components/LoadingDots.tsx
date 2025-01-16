import { Box } from '@mui/material';

import { COLORS } from '../constants/colors';

interface LoadingDotsProps {
  inline?: boolean;
}

export const LoadingDots = ({ inline = false }: LoadingDotsProps) => {
  return (
    <Box sx={{
      display: 'flex',
      gap: 1,
      ...(inline ? {
        display: 'inline-flex',
        ml: 1,
        verticalAlign: 'middle',
      } : {})
    }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: inline ? 3 : 4,
            height: inline ? 3 : 4,
            borderRadius: '50%',
            backgroundColor: COLORS.text.secondary,
            animation: 'bounce 1.4s infinite ease-in-out',
            animationDelay: `${i * 0.16}s`,
            '@keyframes bounce': {
              '0%, 80%, 100%': {
                transform: 'scale(0)',
              },
              '40%': {
                transform: 'scale(1)',
              },
            },
          }}
        />
      ))}
    </Box>
  );
};
