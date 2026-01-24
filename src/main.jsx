import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Component/Router.jsx'
import { RouterProvider } from "react-router/dom";
import Authprovider from './Component/Authprovider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryclint = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryclint}>
      <Authprovider>
        <RouterProvider router={router} />
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>,
)
