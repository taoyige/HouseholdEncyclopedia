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
  currentUserMusicCollection: [],
  currentUserFilmCollection: [],
}

const reducer = (state = defaultState, action) => {
  let obj = new Object();
  let arr = new Array();
  Object.assign(obj, state);
  switch (action.type) {
    case Action.LOGIN_SUCCESS :
      obj.currentUser = action.payload.currentUser;
      return obj;
    case Action.LOGOUT :
      obj.currentUser = action.payload.currentUser;
      obj.currentUserBookCollection = [];
      obj.currentUserMusicCollection = [];
      obj.currentUserFilmCollection = [];
      return obj;
    case Action.ADD_BOOK_COLLECTION :
      Object.assign(arr, obj.currentUserBookCollection);
      arr.push(action.payload.bookCollection);
      obj.currentUserBookCollection = arr;
      return obj;
    case Action.REMOVE_BOOK_COLLECTION :
      Object.assign(arr, obj.currentUserBookCollection);
      for(let i=0; i<arr.length; i++){
        if(arr[i].id == action.payload.bookCollectionId){
          arr.splice(i, 1);
        }
      }
      obj.currentUserBookCollection = arr;
      return obj;
    case Action.ADD_MUSIC_COLLECTION :
      Object.assign(arr, obj.currentUserMusicCollection);
      arr.push(action.payload.musicCollection);
      obj.currentUserMusicCollection = arr;
      return obj;
    case Action.REMOVE_MUSIC_COLLECTION :
      Object.assign(arr, obj.currentUserMusicCollection);
      for(let i=0; i<arr.length; i++){
        if(arr[i].id == action.payload.musicCollectionId){
          arr.splice(i, 1);
        }
      }
      obj.currentUserMusicCollection = arr;
      return obj;
    case Action.ADD_FILM_COLLECTION :
      Object.assign(arr, obj.currentUserFilmCollection);
      arr.push(action.payload.filmCollection);
      obj.currentUserFilmCollection = arr;
      return obj;
    case Action.REMOVE_FILM_COLLECTION :
      Object.assign(arr, obj.currentUserFilmCollection);
      for(let i=0; i<arr.length; i++){
        if(arr[i].id == action.payload.filmCollectionId){
          arr.splice(i, 1);
        }
      }
      obj.currentUserFilmCollection = arr;
      return obj;
    case Action.INIT_BOOK_COLLECTION :
      arr = action.payload.bookCollection;
      obj.currentUserBookCollection = arr;
      return obj;
    case Action.INIT_MUSIC_COLLECTION :
      arr = action.payload.musicCollection;
      obj.currentUserMusicCollection = arr;
      return obj;
    case Action.INIT_FILM_COLLECTION :
      arr = action.payload.filmCollection;
      obj.currentUserFilmCollection = arr;
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



