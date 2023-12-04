import React, { useState } from 'react';
import { TextField, Button ,Box, Typography, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import {useRouter} from 'next/router';
const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [walletAddress, setwalletAddress] = useState('');
    const [role, setRole] = useState('');
    const [regFail, setRegFail] = useState(false);
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        // console.log(JSON.stringify({ name: username, email: email, password: password, role: role }));
        const res = await fetch('http://localhost:5400/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username, email: email, password: password, walletAddress:walletAddress, role: role }),
        });
        const data = await res.json();
        if(data.success){
            console.log('register success');
            router.push('/');
        }
        else{
            setRegFail(true);
            console.log('register failed');
        }
    };

    return (
        <Box textAlign={'center'}>
            <Typography variant="h1" gutterBottom align='center'>BlockGacha</Typography>
            <Typography variant="h3" gutterBottom align='center'>Register</Typography>
            <form onSubmit={handleSubmit} style={{textAlign:'left',marginLeft:"10%",marginRight:"10%"}}>

                <TextField
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    margin="normal"
                    style={{width: '100%'}}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    margin="normal"
                    style={{width: '100%'}}
                />                
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    style={{width: '100%'}}
                    margin="normal"
                />
                <TextField
                    label="Wallet ID"
                    value={walletAddress}
                    onChange={(event) => setwalletAddress(event.target.value)}
                    margin="normal"
                    style={{width: '100%'}}
                />
                <br/>
                <FormControl style={{alignContent:"left",marginBottom:"40px"}}>
                <FormLabel id="role-select" >Role</FormLabel>
                <RadioGroup

                    name='role-select'
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                >
                    <FormControlLabel value="user" control={<Radio />} label="User" />
                    <FormControlLabel value="company" control={<Radio />} label="Company" />
                </RadioGroup>
                </FormControl>

                <Box textAlign='center'>
                    {regFail && <Typography variant="body1" style={{ color: 'red' }}>Registration failed</Typography>}

                    <Button type="submit" variant="contained" color="primary" style={{width:"30%",fontSize: '1.5rem',}}>
                    Register
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default RegisterPage;
