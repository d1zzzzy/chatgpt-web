import { Box, Link, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

import { COLORS } from '../constants/colors';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        // 标题
        h1: ({ children }) => (
          <Typography variant="h4" sx={{ mt: 3, mb: 2, color: COLORS.text.primary }}>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h5" sx={{ mt: 2, mb: 1.5, color: COLORS.text.primary }}>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: COLORS.text.primary }}>
            {children}
          </Typography>
        ),
        // 段落
        p: ({ children }) => (
          <Typography sx={{ my: 1, color: COLORS.text.primary }}>
            {children}
          </Typography>
        ),
        // 链接
        a: ({ href, children }) => (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#10A37F',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {children}
          </Link>
        ),
        // @ts-expect-error no-types
        code: ({ node, inline, className, children, ...props }) => {
          return !inline ? (
            <Box
              sx={{
                position: 'relative',
                my: 2,
                '&:hover .copy-button': {
                  opacity: 1,
                },
              }}
            >
              <pre
                style={{
                  backgroundColor: '#1E1E1E',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  overflow: 'auto',
                }}
              >
                <code
                  className={className}
                  {...props}
                  style={{
                    color: '#D4D4D4',
                    fontFamily: 'monospace',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </code>
              </pre>
            </Box>
          ) : (
            <code
              className={className}
              {...props}
              style={{
                padding: '0.2em 0.4em',
                borderRadius: '3px',
                backgroundColor: 'rgba(16, 163, 127, 0.1)',
                color: '#10A37F',
                fontFamily: 'monospace',
              }}
            >
              {children}
            </code>
          );
        },
        // 列表
        ul: ({ children }) => (
          <Box component="ul" sx={{ my: 1, pl: 3, color: COLORS.text.primary }}>
            {children}
          </Box>
        ),
        ol: ({ children }) => (
          <Box component="ol" sx={{ my: 1, pl: 3, color: COLORS.text.primary }}>
            {children}
          </Box>
        ),
        // 引用
        blockquote: ({ children }) => (
          <Box
            sx={{
              borderLeft: '4px solid #10A37F',
              pl: 2,
              my: 2,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {children}
          </Box>
        ),
        // 表格
        table: ({ children }) => (
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              my: 2,
              'th, td': {
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.5rem',
                textAlign: 'left',
              },
              'th': {
                backgroundColor: 'rgba(16, 163, 127, 0.1)',
              },
            }}
          >
            {children}
          </Box>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
