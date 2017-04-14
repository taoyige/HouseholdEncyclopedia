/**
 * 整个应用的父组件，包括了导航条，主体内容和脚注
 */
import React from 'react';
import MainRouter from './MainRouter.jsx';
import Footer from './Footer.jsx';
import VisibleMain from './Main.jsx';

class App extends React.Component {

  render () {
    return (
      <VisibleMain/>
    )
  }

}

export default App;