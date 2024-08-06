import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ChatbotCreator from './components/ChatbotCreator';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatbotCreator />
    </ThemeProvider>
  );
}

export default App;