/**
 * 路由入口组件
 * 包括了导航栏组件和主体组件
 */

import React from 'react';
import Navigation from './Navigation.jsx';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
class Main extends React.Component {

  render () {
    return (
      <div>
        <Navigation/>
        { this.props.children }
      </div>
    )
  }

}

export default Main;