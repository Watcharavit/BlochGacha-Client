import React from 'react';

import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import MarketPage from '@/components/marketplace/MarketPage';

const cards = [
    {
        title: 'Card 1',
        description: 'This is a sample card description for card 1.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 2',
        description: 'This is a sample card description for card 2.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 3',
        description: 'This is a sample card description for card 3.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 4',
        description: 'This is a sample card description for card 4.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 5',
        description: 'This is a sample card description for card 5.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 6',
        description: 'This is a sample card description for card 6.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 7',
        description: 'This is a sample card description for card 7.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 8',
        description: 'This is a sample card description for card 8.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        title: 'Card 9',
        description: 'This is a sample card description for card 9.',
        image: 'https://via.placeholder.com/300x150',
    },
];



const GachaPage: React.FC = () => {
    return <MarketPage cards={cards} />;
};

export default GachaPage;
