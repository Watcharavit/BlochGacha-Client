
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import FormCard from '@/components/company/formCard';


export default function AddGachaPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        console.log('submit');
        console.log(name);
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div>
            <Typography variant="h1" component="h1" gutterBottom align='center'>
                BlockGacha
            </Typography>
            <Typography variant="h3" component="h3" gutterBottom align='center'>
                Add Gacha Form
            </Typography>
            <form onSubmit={handleSubmit} style={{padding:'5'}}>

                <FormCard labelText='Name' value={name} onChange={(event) => setName(event.target.value)} />

                <br/>
                <Button type="submit" variant="contained" color="primary" style={{ margin: '40px', width: '120px' }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

 