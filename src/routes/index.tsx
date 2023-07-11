import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDeTarefa } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Página inicial'
      },
      {
        icon: 'tag',
        path: '/tarefas',
        label: 'Tarefas'
      },
    ]);
  }, [setDrawerOptions]);


  return (
    <Routes>
      <Route path="/home" element={<Dashboard/>} />

      <Route path="/tarefas" element={<ListagemDeTarefa />} />
      {/* <Route path="/tarefas/detalhe/:id" element={<ListagemDeTarefa />} /> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};