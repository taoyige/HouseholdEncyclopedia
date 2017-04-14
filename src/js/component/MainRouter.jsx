/**
 * 路由
 */
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Main from './Main.jsx';
import Home from './Home.jsx';
import Book from './Book.jsx';
import Music from './Music.jsx';
import Film from './Film.jsx';
import Category from './Category.jsx';
import Search from './Search.jsx';

import BookDetails from './BookDetails.jsx';
import MusicDetails from './MusicDetails.jsx';
import FilmDetails from './FilmDetails.jsx';

class MainRouter extends React.Component {

  render () {
    const routes = <Route path="/" component={Main}>
        <IndexRoute component={Home}/>
        <Route path="book(/:category)" component={Book}/>
        <Route path="music(/:category)" component={Music}/>
        <Route path="film(/:category)" component={Film}/>
        <Route path="book_details/:id" component={BookDetails} onEnter={(nextState, replace)=>{console.log(nextState);}}/>
        <Route path="music_details/:id" component={MusicDetails}/>
        <Route path="film_details/:id" component={FilmDetails}/>
        <Route path="search/:key" component={Search}/>
      </Route>;
    return <Router routes={routes} history={hashHistory}/>;
  }

}

export default MainRouter;