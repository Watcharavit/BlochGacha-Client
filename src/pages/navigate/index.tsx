import React from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Page = () => {
    const router = useRouter();

    const handleGachaClick = () => {
        router.push('/gacha');
    };

    const handleMarketplaceClick = () => {
        router.push('/marketplace');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                BlockGacha
            </Typography>
            <Button variant="contained" size="large" color="primary" style={{width: '50%', marginTop: '20px', fontSize: '1.5rem'}} onClick={handleGachaClick}>
                Gacha
            </Button>
            <Button variant="contained" size="large" color="secondary" style={{width: '50%', marginTop: '20px', fontSize: '1.5rem'}} onClick={handleMarketplaceClick}>
                Marketplace
            </Button>
        </div>
    );
};

export default Page;
