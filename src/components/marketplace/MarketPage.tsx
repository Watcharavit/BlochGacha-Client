import React from 'react';

import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

interface IMarketCards {
    title: string;
    description: string;
    image: string;
};

interface IMarketPage{
    cards: Array<IMarketCards>;
};

const ItemCard: React.FC<{ card: IMarketCards }> = ({ card }) => {
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
export default function MarketPage(cards:IMarketPage) {
    const cards2 = cards.cards;
    return (
        <div>
            <Typography variant="h4">Marketplace</Typography>
            <Grid container spacing={3}>
                {cards2.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ItemCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}