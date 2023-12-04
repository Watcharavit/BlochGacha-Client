
import React, { ChangeEvent, useState } from 'react';
import { TextField, Button, Typography, CardContent, Card } from '@mui/material';
import FormCard from '@/components/company/formCard';
import ImageUpload from '../ImageUpload';


export default function AddItemPage() {
    const [itemName, setItemName] = useState('');
    const [itemRate, setItemRate] = useState('');
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
        setImageUrl(file ? URL.createObjectURL(file) : null);
        };

    const handleSubmit = (event: React.FormEvent) => {
        console.log('submit');
        console.log(itemName);
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div>
            <Typography variant="h1" component="h1" gutterBottom align='center'>
                BlockGacha
            </Typography>
            <Typography variant="h3" component="h3" gutterBottom align='center'>
                Add Item Form
            </Typography>
            <form onSubmit={handleSubmit} style={{padding:'5'}}>

                <FormCard labelText='ItemName' value={itemName} onChange={(event) => setItemName(event.target.value)} />
                <br/>

                <FormCard labelText='ItemRate' value={itemRate} onChange={(event) => setItemRate(event.target.value)} />

                <Card variant="outlined" style={{padding:'20px',margin:'20px',width:'80%'}}>
                    <CardContent>
                        <Typography variant="h5" component="div" padding={1}>Image</Typography>
                        {/* <Typography variant="h6" style={{color:'gray',fontSize:14}}>{ description }</Typography> */}
                        <ImageUpload handleUpload={() =>{}}/>
                    </CardContent>
                </Card>
                
                <Button type="submit" variant="contained" color="primary" style={{ margin: '40px', width: '120px' }}>
                    Submit
                </Button>

            </form>
        </div>
    );
};

 