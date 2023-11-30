

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { TextField } from '@mui/material';

interface FormCardProps {
    labelText: string;
}

const FormCard: React.FC<FormCardProps> = ({ labelText }) => {
    return (
        <Card variant="outlined" style={{padding:'20px',margin:'20px',width:'80%'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {labelText}
                </Typography>
                <TextField label={labelText} variant="outlined" style={{width:'90%'}}/>
            </CardContent>
        </Card>
    );
};

export default FormCard;
