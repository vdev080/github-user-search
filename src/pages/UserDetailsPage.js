import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Avatar, List, ListItem, ListItemText, Fab
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetailsPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await axios.get(`https://api.github.com/users/${username}`);
      setUserDetails(user.data);
      const repoList = await axios.get(user.data.repos_url);
      setRepos(repoList.data);
    };

    fetchUserData();
  }, [username]);

  return (
    <Container sx={{ position: 'relative' }}>
      {userDetails && (
        <>
          <Avatar
            src={userDetails.avatar_url}
            alt={userDetails.login}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5">{userDetails.name || userDetails.login}</Typography>
          <Typography variant="body1" gutterBottom>ID: {userDetails.id}</Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>Public Repositories</Typography>
          <List>
            {repos.map(repo => (
              <ListItem key={repo.id}>
                <ListItemText primary={repo.name} secondary={repo.description} />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Fab
        color="primary"
        aria-label="back"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => navigate('/')}
      >
        <ArrowBackIcon />
      </Fab>
    </Container>
  );
};

export default UserDetailsPage;
