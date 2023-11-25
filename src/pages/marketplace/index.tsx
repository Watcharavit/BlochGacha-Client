import React from 'react';

import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

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

const ItemCard: React.FC<{ card: any }> = ({ card }) => {
    return (
        <Card>
            <CardMedia component="img" image={card.image} alt={card.title} />
            <CardContent>
                <Typography variant="h5" component="h2">
                    {card.title}
                </Typography>
                <Typography color="textSecondary">{card.description}</Typography>
            </CardContent>
        </Card>
    );
};

const GachaPage: React.FC = () => {
    const classes = null;

    return (
        <div>
            <Typography variant="h4">Marketplace</Typography>
            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ItemCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default GachaPage;
