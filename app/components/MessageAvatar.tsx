import { Box } from '@mui/material';
import { COLORS } from '../constants/colors';

interface MessageAvatarProps {
  role: "user" | "assistant";
}

export const MessageAvatar = ({ role }: MessageAvatarProps) => {
  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: role === "user" ? '#7C3AED' : COLORS.button.primary,
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
      }}
    >
      {role === "user" ? "U" : "AI"}
    </Box>
  );
};
