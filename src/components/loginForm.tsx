import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

interface LoginFormProps {
    // onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [text,setText] = useState('');
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // await onSubmit(username, password);
        const res = await fetch('http://localhost:5400/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password: password }),
        });
        const data = await res.json();
        if(data.success){
            console.log('login success');
            router.push('/navigate');

        }
        else{
            setText("Login Failed");
            console.log('login failed');
        }
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
                <Box textAlign='center'>
                <Typography style={{color:'red'}}>{text}</Typography>
                <Button type="submit" variant="contained" color="primary" centerRipple>
                    Login
                </Button>
                </Box>
            </form>
        </Box>
    );
}
export default LoginForm;
