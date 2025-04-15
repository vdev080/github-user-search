import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        label="Search GitHub Users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
