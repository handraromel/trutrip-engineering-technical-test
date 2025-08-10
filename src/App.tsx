import AppRouter from '@/routes/AppRoute';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
