import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

if (PRODUCTION) {
  console.warn('Production');
}

//Components
import App from './components/App.jsx';

//Mount app
const root = document.querySelector('#root');

ReactDOM.render(<App />, root);