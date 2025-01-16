import { Box, Typography, IconButton, Select, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { COLORS } from '../constants/colors';
import { AVAILABLE_MODELS, type ModelId } from '../constants/models';

interface HeaderProps {
  selectedModel: ModelId;

  onModelChange: (model: string) => void;
  onOpenSettings: () => void;
}

export const Header = ({ selectedModel, onModelChange, onOpenSettings }: HeaderProps) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: 2,
      borderBottom: `1px solid ${COLORS.border.primary}`,
      bgcolor: COLORS.background.primary,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" sx={{ color: COLORS.text.primary }}>
          AI 聊天助手
        </Typography>
        <Select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          size="small"
          sx={{
            color: COLORS.text.primary,
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.border.primary,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.border.hover,
            },
            '.MuiSvgIcon-root': {
              color: COLORS.text.primary,
            },
          }}
        >
          {AVAILABLE_MODELS.map((model) => (
            <MenuItem key={model.id} value={model.id}>
              {model.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <IconButton
        onClick={onOpenSettings}
        sx={{
          color: COLORS.text.secondary,
          '&:hover': {
            bgcolor: COLORS.background.secondary,
          }
        }}
      >
        <SettingsIcon />
      </IconButton>
    </Box>
  );
};
