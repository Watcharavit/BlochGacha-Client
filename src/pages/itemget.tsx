import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ItemGetter() {
    const { data: session } = useSession();
	//@ts-ignore
	const token = session?.user?.token;
    const [itemId, setItemId] = useState<string>("");
    const [itemName, setItemName] = useState<string>("");
    const [itemRate, setItemRate] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const handleClick = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/package/items/${itemId}`, {
            method: "GET",
            headers: {
				Authorization: "Bearer " + token
			}
		})
        const data = await res.json();
        console.log(data);
        setItemName(data.itemName);
        setItemRate(data.itemRate);
        setCompany(data.companyOwner);
    }
    return (
        <div style={{flexDirection:'column',alignItems:'center'}}>
			<Typography variant="h1" component="h1" gutterBottom align="center">
				BlockGacha
			</Typography>
			<IconButton href='/' style={{ position: "absolute", top: 10, left: 10 }}>
				<ArrowBack />
            </IconButton>
            <div>
                <Typography variant="h4" component="h4">Check Item Info</Typography>
                <TextField
                    label="Item ID"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    style={{margin:'10px',width:'70%'}}
                />
                <Button variant='contained' size='large' style={{margin:'10px'}} onClick={handleClick}>Check</Button>
                <Typography variant="h6" component="h6">Item Name: {itemName}</Typography>
                <Typography variant="h6" component="h6">Item Rate: {itemRate}</Typography>
                <Typography variant="h6" component="h6">Company: {company}</Typography>
            </div>
        </div>
    );
}