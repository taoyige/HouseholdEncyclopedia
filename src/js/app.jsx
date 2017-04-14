/**
 * 程序主入口，包括引用，渲染组件。
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import App from './component/App.jsx';
require('../css/style.css');
require('../css/less.less');


/**
 * 初始化Bmob
 */
Bmob.initialize("cb3ba145277bf36c0e899c432cc6cce7", "4962df6128294bb610ccb5d8307638d9");

const render = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
}

render();

