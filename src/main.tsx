import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './styles/global.css';
import { AppRoutes } from './app/AppRoutes';
import { DemoProvider } from './app/DemoProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DemoProvider>
        <AppRoutes />
      </DemoProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
