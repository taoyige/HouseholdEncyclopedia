/**
 * 程序主入口，包括引用，渲染组件。
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import Global from './Global.jsx';
import Action from './Action.jsx';
import BmobUtils from './util/bombUtils.jsx';

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
	currentUser: BmobUtils.getCurrentUser(),
  currentUserBookCollection: [],
}

const reducer = (state = defaultState, action) => {
  let obj = new Object();
  Object.assign(obj, state);
  switch (action.type) {
    case Action.LOGIN_SUCCESS :
      obj.currentUser = action.payload.currentUser;
      return obj;
    case Action.LOGOUT :
      obj.currentUser = action.payload.currentUser;
      return obj;
    case Action.BOOK_COLLECTION :
      obj.currentUserBookCollection.push(action.payload.bookId);
      BmobUtils.addBookCollection(action.payload.bookId);
      return obj;
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



