import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import {createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/styles';

import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducers } from './redux/reducers/index.js'

const theme = createTheme()
const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
