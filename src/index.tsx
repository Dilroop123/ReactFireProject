import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyAMdqUwfBI1GYc0WWLWpU-eJ7zfuFnnlDA",
  authDomain: "reactfirebase-21a21.firebaseapp.com",
  projectId: "reactfirebase-21a21",
  storageBucket: "reactfirebase-21a21.appspot.com",
  messagingSenderId: "1045053774092",
  appId: "1:1045053774092:web:52164460e3944105e1d129",
  measurementId: "G-DJBSJ5QSCD"
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
