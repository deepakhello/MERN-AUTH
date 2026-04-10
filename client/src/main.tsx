import React from 'react'
import ReactDom from "react-dom/client";
import App from './App.tsx'
import './index.css'

import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-left"/>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
