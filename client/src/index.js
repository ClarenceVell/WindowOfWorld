import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from '../src/helpers/context/userContext'

import '../src/styles/index.css';
import './styles/notfound.css'
import './styles/pages.css'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


