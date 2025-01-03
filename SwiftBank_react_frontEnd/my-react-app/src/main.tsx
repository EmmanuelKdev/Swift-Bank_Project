import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import client from './apolloClient.ts'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>

    <ApolloProvider client={client}>
       <App />

     </ApolloProvider>

    </Router>
    
    
  </StrictMode>,
)
