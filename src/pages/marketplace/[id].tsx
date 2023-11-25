

import React from 'react';
import { Button, IconButton, Typography, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

const ItemPage = () => {
    // Define the item details
    const router = useRouter();

    const handleBackClick = () => {
      router.push('/marketplace')
    };
  
    const item = {
        name: 'Item Name',
        description: 'Item Description',
        cost: 10
    };

    // Handle the purchase button click
    const handlePurchase = () => {
        // Logic for purchasing the item
    };

    return (
        <div>
            {/* Header */}
            <div>
                <IconButton onClick={handleBackClick} style={{ position: 'absolute', top: 10, left: 10 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h1" align="center">BlockGacha</Typography>
                <Typography variant="h4" align="center">Item : {router.query.id}</Typography>
            </div>

            {/* Item details */}
            <div style={{ display: 'flex', marginTop: 20 }}>
                {/* Left side */}
                <Box sx={{ width: '50%', backgroundColor: '#ffffff', padding: 20 }}>
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography variant="body1">{item.description}</Typography>
                </Box>

                {/* Right side */}
                <Box sx={{ width: '50%', backgroundColor: '#dddddd', padding: 20 }}>
                    <Typography variant="h5">Cost: {item.cost}</Typography>
                    <Button variant="contained" onClick={handlePurchase}>Purchase</Button>
                </Box>
            </div>
        </div>
    );
};

export default ItemPage;
