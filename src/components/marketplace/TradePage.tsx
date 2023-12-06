import proposeTrade from "@/libs/proposeTrade";
import { ArrowBack } from "@mui/icons-material";
import { Typography, TextField, Card, CardContent, IconButton, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

export default function TradePage() {

    const { data: session } = useSession();
	//@ts-ignore
	const token = session?.user?.token;

    const [proposeRes, setProposeRes] = React.useState('');
    const [acceptRes, setAcceptRes] = React.useState('');
    const [getStatusRes, setGetStatusRes] = React.useState('');

    const [traderAddress, setTraderAddress] = React.useState('');
    const [offerItemID, setOfferItemID] = React.useState('');
    const [requestItemID, setRequestItemID] = React.useState('');
    const [tradeID_A, setTradeID_A] = React.useState('');
    const [tradeID_G, setTradeID_G] = React.useState('');

    const handlePropose = async () => {
        console.log(traderAddress, offerItemID, requestItemID);
        if(token != null){
            const data = await proposeTrade(traderAddress, offerItemID, requestItemID, token)
            if (data.success){
                setProposeRes(`Success! Trade ID: ${data.tradeID}`);
            }
            else{
                setProposeRes(`Something went wrong!`);
                console.log(data);
            }
        }
        else{
            console.log('no token')
        }
        
    }

    const handleAccept = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/accepted/${tradeID_A}`, {
            method: "PUT",  
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"

            }
        })
        const data = await res.json();
        if(data.success){
            setAcceptRes(`Success!`);
        }
        else{
            setAcceptRes(`Something went wrong!`);
            console.log(data);
        }

    }
    const handleGet = async () => {
        console.log('getStatus')
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trade/${tradeID_G}`, {
            method: "GET",  
            headers: {
                Authorization: "Bearer " + token
            }
        })
        const data = await res.json();
        if(res.ok){
            setGetStatusRes(data.isDone ? `Trade is done!` : `Trade is not done!`);
        }
        else{
            setGetStatusRes(`Something went wrong!`);
            console.log(data);
        }
        console.log('Finished')
    }

    const textFieldStyle = {width:'70%', margin:'10px'};
    const cardStyle = {margin:'10px', padding:'10px', width:'70%'};
    const buttonStyle = {width:'50%', marginTop:'20px', fontSize:'1.5rem', backgroundColor:'green'};
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h1" component="h1" align="center">
                BlockGacha
            </Typography>
            <Typography variant="h4">Trading Panel</Typography>

			<IconButton href="/" style={{ position: "absolute", top: 10, left: 10 }}>
				<ArrowBack />
			</IconButton>
            <Card style={cardStyle}>
                <CardContent>
                    <Typography variant="h4">Propose Trade</Typography>

                    <TextField style = {textFieldStyle} label="Trader Address" onChange={(event) => setTraderAddress(event.target.value)}/>
                    <TextField style = {textFieldStyle} label="Offered Item ID" onChange={(event) => setOfferItemID(event.target.value)}/>
                    <TextField style = {textFieldStyle} label="Requested Item ID" onChange={(event) => setRequestItemID(event.target.value)}/>
                    <Typography variant="body1">Note: be sure to check your item ID in your <a href="/profile" style={{color:'blue'}}>profile page</a> before trading!</Typography>

                    <Button variant="contained" color="primary" style={buttonStyle} onClick={handlePropose}>Propose</Button>
                    <Typography variant='body1' style={{wordWrap: "break-word"}}>{proposeRes}</Typography>
                </CardContent>
            </Card>

            <Card style={cardStyle}>
                <CardContent>
                    <Typography variant="h4">Accept Trade</Typography>
                    <TextField style = {textFieldStyle} label="Trade ID" onChange={(event) => setTradeID_A(event.target.value)}/>
                    <Button variant="contained" color="primary" style={buttonStyle} onClick={handleAccept}>Accept</Button>
                    <Typography variant='body1' >{acceptRes}</Typography>
                </CardContent>
            </Card>

            <Card style={cardStyle}>
                <CardContent>
                    <Typography variant="h4">Check Trade Status</Typography>
                    <TextField style = {textFieldStyle} label="Trade ID" onChange={(event) => setTradeID_G(event.target.value)}/>
                    <Button variant="contained" color="primary" style={buttonStyle} onClick={handleGet}>Get Status</Button>
                    <Typography variant='body1' style={{wordWrap: "break-word"}} >
                        {getStatusRes}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}


