import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface CompanyCardProps {
    title: string;
    // description: string;
    // image: string;
    id: string; // Add id property to GachaCardProps
};

interface CompanyPageProps {
    cards: Array<CompanyCardProps>;
};

const CompanyCard: React.FC<{ card: CompanyCardProps }> = ({ card }) => {
    const router = useRouter();

    function handleClick(): void {
        router.push(`/gacha/${card.id}`); // Redirect to /gacha/[id]
    }

    return (
        <Card onClick={handleClick} style={{ cursor: 'pointer' }}>
            {/* <CardMedia component="img" image={card.image} alt={card.title} /> */}
            <CardContent>
                <Typography variant="h5" component="h2">
                    {card.title}
                </Typography>
                <Typography color="textSecondary">Gacha Company</Typography>
            </CardContent>
        </Card>
    );
};

export default function GachaPage(cards: CompanyPageProps) {
    const router = useRouter();
    const cards2 = cards.cards;

    function handleGoBack(event: any): void {
        router.push('/');
    }

    return (
        <div>
            <IconButton onClick={handleGoBack} style={{ position: 'absolute', top: 10, left: 10 }}>
                <ArrowBack />
            </IconButton>
            <Typography variant="h1" align="center">BlockGacha</Typography>
            <Typography variant="h4" align="center">Marketplace</Typography>
            <Grid container spacing={3}>
                {cards2.map((card: CompanyCardProps, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CompanyCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
