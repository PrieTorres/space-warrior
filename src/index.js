import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { GameProvider } from './contexts/index.jsx';
import { BaselimeRum } from '@baselime/react-rum'
import { ErrorPage } from './Scenes/ErrorPage/ErrorPage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const baselimeApiKey = process.env.REACT_APP_BASELIME_API_KEY;
root.render(
  // <React.StrictMode>
  <BaselimeRum
    enableWebVitals
    apiKey={baselimeApiKey}
    fallback={<ErrorPage />}
  >
    <GameProvider>
      <App />
    </GameProvider>
  </BaselimeRum>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
