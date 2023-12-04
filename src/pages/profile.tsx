
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, IconButton, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ProfilePage = () => {
    const [accountData, setAccountData] = useState(null);
    const [userDataButton, setUserDataButton] = useState(true);
    const { data: session } = useSession();
    //@ts-ignore
    const token = session?.user?.token;

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/account`,{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            
        })
            .then(response => response.json())
            .then(data => setAccountData(data))
            .catch(error => console.error(error));
    }, []);

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    // const handleUserData =async () => {
    //     const data = await fetch('http://localhost:5400/account',{
    //         method: 'GET',
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         },
        
    //     })
    //     const res = await data.json();
    //     setUserDataButton(false);
    //     console.log(res);
    // }

    if (!session) {
        return null; // Render nothing while redirecting
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton onClick={handleGoBack} style={{ position: 'absolute', top: 10, left: 10 }}>
                <ArrowBack />
            </IconButton>
            <Typography variant="h1" component="h1" gutterBottom>
                BlockGacha
            </Typography>
            <Typography variant="h4" align="center">Welcome {session.user?.name}</Typography>
            <Typography variant="h6" align="center">Click here to view your profile</Typography>
            <div>
                <Typography variant="h6">
                   Token Balance: {
                   // @ts-ignore
                   accountData?.tokenBalance
                   }
                </Typography>
                <Typography variant="h6">
                   Unredeemed Items
                </Typography>
                <table style={{ padding: '10px' }}>
                <thead><tr>
                        <th>Item ID</th>
                    </tr></thead>
                <tbody>
                {
                // @ts-ignore
                accountData?.unredeemedItemIDs.map((itemID: any) => (
                    <tr>
                        <td style={{padding:'10px'}}>
                            {itemID}
                        </td>
                        <td style={{padding:'10px'}}>
                            <Button variant='contained' color='primary'>Redeem</Button>
                        </td>
                    </tr> 
                ))}
                </tbody>
                </table>
                <Typography variant="h6">
                    Redeemed Items
                </Typography>
                <table style={{ padding: '10px' }}>
                    <thead><tr>
                        <th>Item ID</th>
                    </tr></thead>
                <tbody>
                    {
                    // @ts-ignore
                    accountData?.redeemedItemIDs.map((itemID: any) => (
                        <tr>
                            <td>
                                {itemID}
                            </td>

                        </tr>
                    ))}
                </tbody>
                </table>


                <Typography variant="h6">
                    Proposed Trade
                </Typography>
                <table style={{ padding: '10px' }}>
                    <thead><tr>
                        <th>Trade ID</th>
                    </tr></thead>
                    <tbody>
                    {
                    // @ts-ignore
                    accountData?.proposeTradeIDs.map((itemID: any) => (
                        <tr>
                            <td>
                                {itemID}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>

                <Typography variant="h6">
                    Requested Trade
                </Typography>
                <table style={{ padding: '10px' }}>
                    <thead>
                    <tr>
                        <th>Trade ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {// @ts-ignore
                    accountData?.requestedTradeIDs.map((itemID: any) => (
                        <tr>
                            <td>
                                {itemID}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>

             </div>
             
        </div>
    );
};

export default ProfilePage;
