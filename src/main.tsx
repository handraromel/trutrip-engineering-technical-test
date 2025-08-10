import '@/assets/styles/index.css';
import { queryClient } from '@/configs/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './context/Toast';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
