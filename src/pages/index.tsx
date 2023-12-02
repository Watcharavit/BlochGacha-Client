import React from 'react';
import { useSession } from "next-auth/react"
import Home from '@/components/homePage/homePage';
import UserNavigatePage from '@/components/homePage/userNavigate';
import CompanyNavigatePage from '@/components/homePage/companyNavigate';



const LoginPage: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    const role = session.user?.role;
    
    if (role === 'company') {
      return <CompanyNavigatePage/>
    }
    else if (role === 'user'){
      return <UserNavigatePage/>}
    }
    else{
      return <Home/>
    }
  return <Home/>
};

export default LoginPage;