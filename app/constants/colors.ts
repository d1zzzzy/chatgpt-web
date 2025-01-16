export const COLORS = {
  background: {
    primary: '#ffffff',
    secondary: '#f7f7f8',
    dialog: '#ffffff',
  },
  text: {
    primary: '#333333',
    secondary: '#6e6e80',
  },
  border: {
    primary: '#e5e5e5',
    hover: '#d4d4d4',
  },
  button: {
    primary: '#10A37F',
    hover: '#1A7F64',
    text: '#ffffff',
    disabled: {
      bg: '#f7f7f8',
      text: '#6e6e80',
    },
  },
  error: {
    background: '#fef2f2',
    text: '#ef4444',
    border: '#fee2e2',
  },
  message: {
    user: {
      background: '#f7f7f8',
      text: '#333333',
    },
    assistant: {
      background: '#ffffff',
      text: '#333333',
    },
  },
} as const;
