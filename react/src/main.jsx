import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { ContextProvider } from './contexts/ContextProvider.jsx'
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      {/* <QueryClientProvider client={queryClient}> */}
        <RouterProvider router={router} />
      {/* </QueryClientProvider> */}
    </ContextProvider>
  </React.StrictMode>,
)
