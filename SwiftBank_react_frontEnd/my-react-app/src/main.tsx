import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import client from './apolloClient.ts'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>

    <ApolloProvider client={client}>
      
      <Provider store={store}>

        <App />

      </Provider>

     </ApolloProvider>

    </Router>
    
    
  </StrictMode>,
)
