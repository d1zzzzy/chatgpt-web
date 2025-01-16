import { Box, Typography } from '@mui/material';

import { MarkdownRenderer } from './MarkdownRenderer';
import { LoadingDots } from './LoadingDots';
import { MessageAvatar } from './MessageAvatar';
import { COLORS } from '../constants/colors';

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  isLast?: boolean;
}

export const Message = ({ role, content, isLoading, isLast }: MessageProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: role === "assistant" ? COLORS.message.assistant.background : COLORS.message.user.background,
        borderBottom: `1px solid ${COLORS.border.primary}`,
      }}
    >
      <Box
        sx={{
          maxWidth: '48rem',
          margin: '0 auto',
          display: "flex",
          gap: 3,
          p: 4,
          alignItems: "flex-start",
        }}
      >
        <MessageAvatar role={role} />
        <Box sx={{ flex: 1 }}>
          {role === "assistant" ? (
            <Box sx={{
              position: 'relative',
              minHeight: '24px',
              '& > *:first-of-type': {
                marginTop: 0,
                marginBottom: 0,
              }
            }}>
              {content ? (
                <>
                  <MarkdownRenderer content={content} />
                  {isLoading && isLast && (
                    <Box sx={{
                      position: 'absolute',
                      display: 'inline-flex',
                      marginLeft: 1,
                      top: 0,
                      right: -24,
                    }}>
                      <LoadingDots inline />
                    </Box>
                  )}
                </>
              ) : isLoading && isLast ? (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '24px',
                }}>
                  <LoadingDots />
                </Box>
              ) : null}
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: COLORS.text.primary,
                whiteSpace: "pre-wrap",
                lineHeight: 1.75,
                fontSize: '1rem',
              }}
            >
              {content}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
