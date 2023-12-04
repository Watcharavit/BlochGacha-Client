
import React, { useState } from 'react';
import { Card } from '@mui/material';
import { TextField, Button, Typography } from '@mui/material';
import FormCard from '@/components/company/formCard';

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

    const handleAddItem = (event: React.FormEvent) => {
        event.preventDefault();
        setItems([...items, { name: name, price: price }]);
        setName('');
        setPrice('');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(items);
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
    