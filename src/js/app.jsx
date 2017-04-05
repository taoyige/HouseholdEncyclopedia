/**
 * 程序主入口，包括引用，渲染组件。
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import App from './components/App.jsx';
require('../css/style.css');
require('../css/less.less');

const render = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
}

render();

