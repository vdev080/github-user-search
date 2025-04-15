import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getTheme } from './theme';
import SearchPage from './pages/SearchPage';
import UserDetailsPage from './pages/UserDetailsPage';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = getTheme(darkMode ? 'dark' : 'light');
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              GitHub Explorer
            </Typography>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/user/:username" element={<UserDetailsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
