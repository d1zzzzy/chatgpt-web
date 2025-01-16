import { IconButton } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import { COLORS } from '../constants/colors';

interface StopButtonProps {
  onClick: () => void;
}

export const StopButton = ({ onClick }: StopButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: '8px',
        bottom: '8px',
        minWidth: '40px',
        height: '40px',
        color: COLORS.button.text,
        bgcolor: COLORS.button.primary,
        borderRadius: '0.5rem',
        '&:hover': {
          bgcolor: COLORS.button.hover,
        },
      }}
    >
      <StopIcon />
    </IconButton>
  );
};
