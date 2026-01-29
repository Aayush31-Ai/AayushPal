import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import emailjs from "@emailjs/browser";


emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY);

createRoot(document.getElementById('root')).render(
<BrowserRouter>
<App />
</BrowserRouter>


)