"use client";

import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const [brief, setBrief] = useState('');
  const [prd, setPrd] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [tickets, setTickets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/generate-prd', { brief });
      setPrd(response.data.prd);
      setQuestions(response.data.questions);
      setTickets(response.data.tickets);
    } catch {
      setError('Failed to generate PRD. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const components = {
    h1: (props: React.ComponentProps<'h1'>) => <Typography variant="h4" component="h1" {...props} />,
    h2: (props: React.ComponentProps<'h2'>) => <Typography variant="h5" component="h2" {...props} />,
    h3: (props: React.ComponentProps<'h3'>) => <Typography variant="h6" component="h3" {...props} />,
    h4: (props: React.ComponentProps<'h4'>) => <Typography variant="subtitle1" component="h4" {...props} />,
    h5: (props: React.ComponentProps<'h5'>) => <Typography variant="subtitle2" component="h5" {...props} />,
    h6: (props: React.ComponentProps<'h6'>) => <Typography variant="body2" component="h6" {...props} />,
    p: (props: React.ComponentProps<'p'>) => <Typography paragraph sx={{ marginBottom: '1em' }} {...props} />,
    li: (props: React.ComponentProps<'li'>) => <Typography component="li" sx={{ marginBottom: '0.5em' }} {...props} />,
    table: (props: React.ComponentProps<'table'>) => <Table {...props} />,
    thead: (props: React.ComponentProps<'thead'>) => <TableHead {...props} />,
    tbody: (props: React.ComponentProps<'tbody'>) => <TableBody {...props} />,
    tr: (props: React.ComponentProps<'tr'>) => <TableRow {...props} />,
    th: (props: React.ComponentProps<'th'>) => {
      const { align: _align, ...rest } = props;
      return <TableCell component="th" {...rest} />;
    },
    td: (props: React.ComponentProps<'td'>) => {
      const { align: _align, ...rest } = props;
      return <TableCell {...rest} />;
    },
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          PRD Creator
        </Typography>
        <TextField
          label="Feature Brief"
          multiline
          rows={4}
          fullWidth
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !brief}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate PRD'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {prd && (
          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Generated PRD
            </Typography>
            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>{prd}</ReactMarkdown>
          </Paper>
        )}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {questions.length > 0 && (
            <Grid xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Clarifying Questions
                </Typography>
                <ul>
                  {questions.map((q, index) => (
                    <li key={index}>
                      <Typography>{q}</Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          )}
          {tickets.length > 0 && (
            <Grid xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Suggested Tickets
                </Typography>
                <ul>
                  {tickets.map((t, index) => (
                    <li key={index}>
                      <Typography>{t}</Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
