import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Routes/AppRouter';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
