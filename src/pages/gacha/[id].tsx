import { useRouter } from 'next/router';
import { Button, IconButton, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';



const GachaPage = () => {
  const router = useRouter();
  const [resultText, setResultText] = useState(''); 

  const balance = 200;
  const handleBackClick = () => {
    router.push('/gacha')
  };

  const handleRollClick = () => {
    // handle roll logic here
    setResultText('You got a new item!');
  };

  return (
    <div>
      {/* Header */}
      <div>
            <IconButton onClick={handleBackClick} style={{ position: 'absolute', top: 10, left: 10 }}>
                <ArrowBack />
            </IconButton>
            <Typography variant="h1" align="center">BlockGacha</Typography>
            <Typography variant="h4" align="center">Gacha : {router.query.id}</Typography>
            <Typography variant="h6" align="right" style={{ position: 'absolute', top: 10, right: 10 }}>Balance: {balance}</Typography>

      </div>

      {/* Image */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 300px)' }}>
        {/* add a sample image */}
        <img src="https://via.placeholder.com/800x400" style={{ height: '400px', width: '800px' }} />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
      <Button variant="contained" onClick={handleRollClick}>
          Info/Drop Rates
        </Button>
        <Button variant="contained" onClick={handleRollClick} style= { { paddingInline:100 , height: 100 , fontSize:70}}  >
          Roll
        </Button>
        {/* <CircleIcon style={{color:'white'}}/> */}
      </div>
        {/* Adjustable Text */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Typography variant="h5" align="center">{resultText}</Typography>
      </div>
    </div>
  );
};

export default GachaPage;
