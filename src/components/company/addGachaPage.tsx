
import React, { useState } from 'react';
import { Card } from '@mui/material';
import { TextField, Button, Typography } from '@mui/material';
import FormCard from '@/components/company/formCard';
import { useSession } from 'next-auth/react';

export function ItemCard(props: {
    order: string;
    name: string;
    rate: string;
    setName: any;
    setRate: any;
    handleAddItem: any;
}) {
    const { order, name, rate, setName, setRate } = props;
    return (
        <Card variant="outlined" style={{ padding: '20px', margin: '20px', width: '80%' }}>
            <Typography variant="h6">Item {order}</Typography>
            <TextField label={'Name'} variant="outlined" style={{ width: '70%' }} onChange={setName} value={name} />
            <TextField label={'Rate'} variant="outlined" style={{ width: '30%' }} onChange={setRate} value={rate} />
        </Card>
    );
}

export default function AddGachaPage() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [items, setItems] = useState<{ name: string; price: string; }[]>([]);

    const { data: session } = useSession();

    
    const handleAddItem = (event: React.FormEvent) => {
        event.preventDefault();
        setItems([...items, { name: name, price: price }]);
        setName('');
        setPrice('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(items);
        if(!session){
            return;
        }
        //@ts-ignore
        const token = session.user?.token;
        const res = await fetch(`${process.env.BACKEND_URL}/package/packages`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({packageName:name,price:price,status:true}),
        });
        const data0 = await res.json();
        const packageId = data0.packageID;

        for (let i = 0; i < items.length; i++) {
            const res = await fetch(`${process.env.BACKEND_URL}/package/items`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({itemName:items[i].name,price:items[i].price}),
            });
            const data1 = await res.json();
            const itemId = data1.itemID;
            console.log("Item",itemId,"Created");
            const res2 = await fetch(`${process.env.BACKEND_URL}/package/packages/${packageId}/items/${itemId}`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            });
            console.log("Item",itemId,"Added to Package",packageId);


        }

        // Handle form submission logic here
    };

    return (
        <div>
            <Typography variant="h1" component="h1" gutterBottom align="center">
                BlockGacha
            </Typography>
            <Typography variant="h3" component="h3" gutterBottom align="center">
                Add Gacha Form
            </Typography>
            <form onSubmit={handleSubmit} style={{ padding: '5' }}>
                <FormCard labelText="Name" value={name} onChange={(event) => setName(event.target.value)} />
                <FormCard labelText="Price" value={price} onChange={(event) => setPrice(event.target.value)} />

                {items.map((item, index) => (
                    <ItemCard
                        key={index}
                        order={(index + 1).toString()}
                        name={item.name}
                        rate={item.price}
                        setName={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const updatedItems = [...items];
                            updatedItems[index].name = event.target.value;
                            setItems(updatedItems);
                        }}
                        setRate={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const updatedItems = [...items];
                            updatedItems[index].price = event.target.value;
                            setItems(updatedItems);
                        }}
                        handleAddItem={handleAddItem}
                    />
                ))}

                <Button type="button" variant="outlined" color="primary" style={{ margin: '40px', width: '120px' }} onClick={handleAddItem}>
                    Add Item
                </Button>
                <br />
                <Button type="submit" variant="contained" color="primary" style={{ margin: '40px', width: '120px' }} onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
    