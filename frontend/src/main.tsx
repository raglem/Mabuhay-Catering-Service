import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import './index.css'
import App from './App.tsx'
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Q77XUP0W0PRVghioPh4eGL029DIbsv2V9lm6qSjng6iQv19C4smckdIOR5q9khNPWj6SCxEILUVGpkuaZSgdpe200GdIlu45d');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </StrictMode>,
)
