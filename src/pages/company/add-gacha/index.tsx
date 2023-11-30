
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import FormCard from '@/components/formCard';


const AddGachaPage: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        console.log('submit');
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
                <TextField
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    style={{ marginLeft: '40px', width: '60%' }}
                />
                <br/>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    style={{ marginLeft: '40px', width: '60%' }}
                />
                <br/>
                <Button type="submit" variant="contained" color="primary" style={{ margin: '40px', width: '120px' }}>
                    Submit
                </Button>
            </form>
            <FormCard labelText='my' />
        </div>
    );
};

export default AddGachaPage;

