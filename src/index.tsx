import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const root = createRoot(rootElement);
console.log('Starting React app');
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
