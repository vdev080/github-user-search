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
        <Container sx={{ position: 'relative', mt: 10 }}>
            {userDetails && (
                <div className='user-details-container'>

                    <Avatar
                        src={userDetails.avatar_url}
                        alt={userDetails.login}
                        sx={{ width: 100, height: 100 }}
                    />
                    <div className="user-details">
                        <Typography variant="h6" sx={{ mb: 1 }}>User Name: {userDetails.name || userDetails.login}</Typography>
                        <Typography variant="body1">Username: @{userDetails.login}</Typography>
                        {userDetails.location && (
                            <Typography variant="body1">Location: {userDetails.location}</Typography>
                        )}
                        {userDetails.bio && (
                            <Typography variant="body1">Bio: {userDetails.bio}</Typography>
                        )}
                        <Typography variant="body1">Followers: {userDetails.followers}</Typography>
                        <Typography variant="body1">Following: {userDetails.following}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Public Repositories: {userDetails.public_repos}
                        </Typography>
                    </div>
                    <div className='repositories-box'>
                        <Typography variant="h6" sx={{ mt: 3 }}>Repositories</Typography>
                        <List>
                            {repos.map((repo) => (
                                <ListItem
                                    key={repo.id}
                                    component="a"
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    button
                                >
                                    <ListItemText
                                        primary={repo.name}
                                        secondary={repo.description || 'No description'}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            )}


            <Fab
                variant="extended"
                color="primary"
                aria-label="back"
                sx={{ position: 'fixed', bottom: 20, right: 20 }}
                onClick={() => navigate('/')}
            >
                <ArrowBackIcon sx={{ mr: 1 }} />
                Search
            </Fab>
        </Container>
    );
};

export default UserDetailsPage;
