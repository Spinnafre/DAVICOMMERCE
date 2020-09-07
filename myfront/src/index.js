import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux'
import store from './Store/store'

import './index.css'

ReactDOM.render(
  // O provider para disponibilizar o store para todos os components
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
