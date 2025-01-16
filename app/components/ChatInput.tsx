import { Box, TextField, Button } from '@mui/material';

import { StopButton } from './StopButton';
import { COLORS } from '../constants/colors';

interface ChatInputProps {
  value: string;

  onChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;

  isLoading: boolean;
  disabled: boolean;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  onStop,
  isLoading,
  disabled
}: ChatInputProps) => {
  return (
    <Box sx={{
      borderTop: `1px solid ${COLORS.border.primary}`,
      bgcolor: COLORS.background.primary,
      p: 3,
    }}>
      <Box sx={{
        maxWidth: '48rem',
        margin: '0 auto',
        position: 'relative',
      }}>
        <TextField
          multiline
          maxRows={4}
          placeholder="给ChatGPT发生消息..."
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              onSend();
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: COLORS.text.primary,
              bgcolor: COLORS.background.secondary,
              borderRadius: '1rem',
              '& fieldset': {
                borderColor: COLORS.border.primary,
              },
              '&:hover fieldset': {
                borderColor: COLORS.border.hover,
              },
              '&.Mui-focused fieldset': {
                borderColor: COLORS.button.primary,
              },
            },
            '& .MuiOutlinedInput-input::placeholder': {
              color: COLORS.text.secondary,
              opacity: 1,
            },
          }}
        />
        {isLoading ? (
          <StopButton onClick={onStop} />
        ) : (
          <Button
            variant="contained"
            onClick={onSend}
            disabled={disabled}
            sx={{
              position: 'absolute',
              right: '8px',
              bottom: '8px',
              minWidth: '40px',
              height: '40px',
              bgcolor: COLORS.button.primary,
              color: COLORS.button.text,
              borderRadius: '0.5rem',
              '&:hover': {
                bgcolor: COLORS.button.hover,
              },
              '&:disabled': {
                bgcolor: COLORS.background.secondary,
                color: COLORS.text.secondary,
              },
            }}
          >
            发送
          </Button>
        )}
      </Box>
    </Box>
  );
};
