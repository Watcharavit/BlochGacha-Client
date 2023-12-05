import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function ItemGetter(token: string) {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmViYjY2ZGVhM2E1OGNlOWI5YjRlNyIsImlhdCI6MTcwMTc4MjkwMiwiZXhwIjoxNzMzMzE4OTAyfQ.1l2y82wNR9gnU8__1nj7OgeUDqHp9Ls2fKXeXadlaCI";
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
        <div>
            <Typography variant="h4" component="h4">Check Item Name</Typography>
            <TextField
                label="Item ID"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                style={{margin:'10',width:'70%'}}
            />
            <Button variant='contained' size='large' style={{margin:'10'}} onClick={handleClick}>Check</Button>
            <Typography variant="h6" component="h6">Item Name: {itemName}</Typography>
            <Typography variant="h6" component="h6">Item Rate: {itemRate}</Typography>
            <Typography variant="h6" component="h6">Company: {company}</Typography>
        </div>
    );
}