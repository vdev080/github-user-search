import React, { useState, useEffect } from 'react';
import {
    Container, Typography, List, ListItem, ListItemAvatar, Avatar,
    ListItemText, Pagination, CircularProgress
} from '@mui/material';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (term) => {
        setSearchTerm(term);
        setPage(1);
    };

    useEffect(() => {
        if (!searchTerm) return;

        const fetchUsers = async () => {
            setLoading(true);
            const res = await axios.get(`https://api.github.com/search/users`, {
                params: { q: searchTerm, per_page: 12, page }
            });
            setUsers(res.data.items);
            setTotalPages(Math.ceil(res.data.total_count / 12));
            setLoading(false);
        };

        fetchUsers();
    }, [searchTerm, page]);

    return (
        <Container sx={{ mt: 4 }}>
            <div className='Search'>
                <Typography variant="h4" gutterBottom>GitHub User Search</Typography>
                <SearchBar onSearch={handleSearch} />
            </div>
            {loading ? <CircularProgress sx={{ mt: 4 }} /> : (
                <>
                    <List className='user-list'>
                        {users.map(user => (
                            <ListItem
                                button
                                key={user.id}
                                onClick={() => navigate(`/user/${user.login}`)}
                            >
                                <ListItemAvatar>
                                    <Avatar src={user.avatar_url} />
                                </ListItemAvatar>
                                <ListItemText primary={user.login} />
                            </ListItem>
                        ))}
                    </List>
                    {users.length >= 12 && (
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            sx={{ mt: 2 }}
                        />
                    )}

                </>
            )}
        </Container>
    );
};

export default SearchPage;
