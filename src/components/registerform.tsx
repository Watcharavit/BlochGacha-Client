import React, { useState } from 'react';
import { TextField, Button ,Box, Typography} from '@mui/material';

interface RegisterFormProps {
    onSubmit: (formData: { username: string; password: string; ethereumAccount: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [walletID, setWalletID] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ username, password, ethereumAccount: walletID });
    };

    return (
        <Box textAlign={'center'}>
            <Typography variant="h3" gutterBottom align='center'>
                Register
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
                    required
                    style={{width: '80%'}}
                    margin="normal"
                />
                <TextField
                    label="Wallet ID"
                    value={walletID}
                    onChange={(event) => setWalletID(event.target.value)}
                    margin="normal"
                    style={{width: '80%'}}
                />
                <Box textAlign='center'><Button type="submit" variant="contained" color="primary">
                    Register
                </Button></Box>
            </form>
        </Box>
    );
};

export default RegisterForm;

