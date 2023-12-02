import { useRouter } from 'next/router';
import { Button, IconButton, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';



const GachaPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/gacha')
  };

  const handleRollClick = () => {
    // handle roll logic here
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
      </div>

      {/* Image */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
        {/* add a sample image */}
        <img src="https://via.placeholder.com/800x400" />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px' }}>
      <Button variant="contained" onClick={handleRollClick}>
          Info/Drop Rates
        </Button>
        <Button variant="contained" onClick={handleRollClick} style= { { paddingInline:100 , height: 100 , fontSize:70}}  >
          Roll
        </Button>
      </div>
    </div>
  );
};

export default GachaPage;
