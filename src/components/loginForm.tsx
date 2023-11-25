import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(username, password);
    };

    return (
        <Box textAlign={'center'}>
            <Typography variant="h3" gutterBottom align='center'>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    margin="normal"
                    style={{width: '80%'}}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    margin="normal"
                    style={{width: '80%'}}
                />
                <Box textAlign='center'><Button type="submit" variant="contained" color="primary" centerRipple>
                    Login
                </Button></Box>
            </form>
        </Box>
    );
}
export default LoginForm;
