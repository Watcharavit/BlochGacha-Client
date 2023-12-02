import React from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function CompanyNavigatePage(){
    const router = useRouter();

    const handleAddGacha = () => {
        router.push('/company/add-gacha');
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                BlockGacha
            </Typography>
            <Typography variant="h3" component="h3" gutterBottom>
                Company Side
            </Typography>            
            <Button variant="contained" size="large" color="primary" style={{width: '50%', marginTop: '20px', fontSize: '1.5rem'}} onClick={handleAddGacha}>
                Add Gacha
            </Button>
            <Button variant="outlined" size="large" color="primary" style={{width: '50%', marginTop: '20px', fontSize: '1.5rem'}} onClick={()=>signOut()}>
                Log Out
            </Button>
        </div>
    );
};

