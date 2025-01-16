import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from "react";

import { COLORS } from '../constants/colors';

interface ApiKeyDialogProps {
  open: boolean;
  apiKey: string;

  onClose: () => void;
  onSave: (key: string) => void;
}

const ApiKeyDialog = ({ open, apiKey, onClose, onSave }: ApiKeyDialogProps) => {
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    onSave(tempKey);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: COLORS.background.dialog,
          color: COLORS.text.primary,
          minWidth: { xs: '90%', sm: '400px' },
          maxWidth: '600px',
          margin: '0 auto',
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        设置 API Key
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          label="OpenRouter API Key"
          type="text"
          fullWidth
          value={tempKey}
          onChange={(e) => setTempKey(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#000',
              '& fieldset': {
                borderColor: 'rgba(0,0,0,0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0,0,0,0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#10A37F',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(0,0,0,0.7)',
              '&.Mui-focused': {
                color: '#10A37F',
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          保存
        </Button>
        <Button onClick={onClose} color="secondary">
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiKeyDialog;
