import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import './styles/global.css';
import { HomePage } from './pages/HomePage';
import { DemoProvider } from './app/DemoProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DemoProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<main className="page-container"><h1>Page not found</h1><p><a href="/">Return home</a></p></main>} />
        </Routes>
      </DemoProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
