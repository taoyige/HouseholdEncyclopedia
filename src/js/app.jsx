/**
 * 程序主入口，包括引用，渲染组件。
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import Global from './Global.jsx';

import MainRouter from './component/MainRouter.jsx';
require('../css/style.css');
require('../css/less.less');


/**
 * 初始化Bmob
 */
Bmob.initialize(Global.APPLICATION_ID, Global.REST_API_KEY);

/**
 * Redux部分
 */

/**
 * reducer函数
 */
const defaultState = {
	currentUser: null,
}

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 0x1 :
			return action.payload;
		default :
			return defaultState;
	}
}

/**
 * Action Creator
 */
const getAction = (type, payload) => {
	return {
		type,
		payload,
	}
}

const store = createStore(reducer);


const render = () => {
  ReactDOM.render(
  	<Provider store={store}>
  	 <MainRouter/>
  	</Provider>
  	,
    document.getElementById('app')
  )
}

render();

store.subscribe(render);

export default store;



