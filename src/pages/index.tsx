import React from 'react';
import LoginForm from '@/components/loginForm'
import RegisterForm from '@/components/registerform';
import { Typography,Grid,Paper } from '@mui/material';


const LoginPage: React.FC = () => {

  return (
    <div>
      <Typography variant="h1" component="div" gutterBottom align='center'>
        BlockGacha
      </Typography>
      <Grid container direction="row" spacing={3} justifyContent={"space-around"} marginLeft={1} marginRight={1}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <LoginForm onSubmit={() => {console.log('login')}}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} >
          <Paper>
            <RegisterForm onSubmit={() => {console.log('register')}}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;