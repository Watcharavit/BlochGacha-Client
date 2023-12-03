import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import GachaPage from '@/components/gacha/GachaPage';

interface GachaCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
};



const cards = [
    {
        id: '1',
        title: 'Card 1',
        description: 'This is a sample card description for card 1.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '2',
        title: 'Card 2',
        description: 'This is a sample card description for card 2.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '3',
        title: 'Card 3',
        description: 'This is a sample card description for card 3.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '4',
        title: 'Card 4',
        description: 'This is a sample card description for card 4.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '5',
        title: 'Card 5',
        description: 'This is a sample card description for card 5.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '6',
        title: 'Card 6',
        description: 'This is a sample card description for card 6.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '7',
        title: 'Card 7',
        description: 'This is a sample card description for card 7.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '8',
        title: 'Card 8',
        description: 'This is a sample card description for card 8.',
        image: 'https://via.placeholder.com/300x150',
    },
    {
        id: '9',
        title: 'Card 9',
        description: 'This is a sample card description for card 9.',
        image: 'https://via.placeholder.com/300x150',
    },
];


const GachaCard: React.FC<{ card: GachaCardProps }> = ({ card }) => {
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

const Page: React.FC = () => {
    const router = useRouter();
    function handleGoBack(event: any): void {
        router.push('/navigate')
    }

    return (
        <GachaPage cards={cards} />
    );
};

export default Page;
