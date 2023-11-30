import React from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Page = () => {
    const router = useRouter();

    const handleAddGacha = () => {
        router.push('/gacha');
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                BlockGacha
            </Typography>
            <Typography variant="h3" component="h3" gutterBottom>
                Company Side
            </Typography>            
            <Button variant="contained" size="large" color="primary" style={{width: '50%', marginTop: '20px', fontSize: '1.5rem', textTransform:'none'}} onClick={handleAddGacha}>
                Add Gacha
            </Button>
        </div>
    );
};


export default Page;
