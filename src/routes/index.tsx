import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Página inicial'
      }
    ]);
  }, [setDrawerOptions]);


  return (
    <Routes>
      <Route path="/home" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toogle Theme</Button>} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};