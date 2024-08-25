import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './pages/app';

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (import.meta.env.VITE_NODE_ENV === 'development') {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else if (import.meta.env.VITE_NODE_ENV === 'production') {
  <App />
}
