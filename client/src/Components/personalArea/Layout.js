import React from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { Box } from '@mui/material';
import Header from './Header/Header';
import PersonalArea from './PersonalArea'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from './SidebarNavigation/SidebarNavigation';
import { selectUser } from '../../features/auth/authSlice';
import useAuth from '../../hooks/useAuth';

function Layout() {
  const navigate = useNavigate();
  // אם המשתמש לא מחובר נשלח אותו לדף התחברות
  const user = useAuth();

  useEffect(() => {
    if(user === null){
      navigate('../login');
    }
    else{
      console.log('user is connected');
    }
  }, [user, navigate]);

  return (
    <div className="page">
      <Header />
      <Box sx={{ display: 'flex' }}>
        <SidebarNavigation/>
        <Box sx={{ width: '100%', alignItems: 'center' }}>
          <PersonalArea />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default Layout;
