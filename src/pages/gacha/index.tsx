import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import GachaPage from '@/components/gacha/GachaPage';
import { useSession } from 'next-auth/react';



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
];



const Page: React.FC = () => {

    const [companyData, setCompanyData] = React.useState([]);
    const { data: session } = useSession();
    if(!session){
        return null;
    }
    //@ts-ignore
    const token = session?.user?.token;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/allCompany`,{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            
        })
            .then(response => response.json())
            .then(data => setCompanyData(data))
            .catch(error => console.error(error));
    }, []);
    console.log(companyData);
    const cards = companyData?.map((company: any) => ({
        id: company.walletAddress,
        title: company.name
    }));
    return (
        <GachaPage cards={cards} />
    );
};

export default Page;
