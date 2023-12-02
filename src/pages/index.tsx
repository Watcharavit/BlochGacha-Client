import React from 'react';
import LoginForm from '@/components/loginForm'
import RegisterForm from '@/components/registerform';
import { Typography,Grid,Paper } from '@mui/material';
import createTheme from '@mui/material';
import { useSession, signIn, signOut } from "next-auth/react"
import Home from '@/components/homePage/homePage';
import UserNavigatePage from '@/components/homePage/userNavigate';


const LoginPage: React.FC = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <UserNavigatePage/>
    )
  }
  return <Home/>
};

export default LoginPage;