/**
 * 导航条组件
 */
import React from 'react';
import { IndexLink, Link } from 'react-router';
import Global from '../Global.jsx';
import { hashHistory } from 'react-router'

import Login from './Login.jsx';
import Register from './Register.jsx';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showLogin: false,
      showRegister: true,
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  } 

  handleSearchSubmit (e) {
    e.preventDefault();
    let key = e.target.childNodes[0].value;
    if(key) {
      const path = `search/${key}`;
      hashHistory.push(path);
      e.target.childNodes[0].value = '';
    }
  }

  handleLoginClick (e) {
    e ? e.preventDefault() : null;
    this.setState({
      showLogin: true,
      showRegister: false,
    })
  }

  handleRegisterClick (e) {
    e.preventDefault();
    this.setState({
      showLogin: false,
      showRegister: true,
    })
  }

  handleCloseClick (e) {
    this.setState({
      showLogin: false,
      showRegister: false,
    })
  }

  render () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="row">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">生活百科</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <IndexLink to="/" activeClassName="active">
                  <span className="glyphicon glyphicon-home" aria-hidden="true"></span>
                  &nbsp;主页
                </IndexLink>
              </li>
              <li>
                <Link to={`/${Global.BOOK}/${Global.BOOK_CATEGORY[0].category}`}>
                  <span className="glyphicon glyphicon-book" aria-hidden="true"></span>
                  &nbsp;图书
                </Link>
              </li>
              <li>
                <Link to={`/${Global.MUSIC}/${Global.MUSIC_CATEGORY[0].category}`}>
                  <span className="glyphicon glyphicon-music" aria-hidden="true"></span>
                  &nbsp;音乐
                </Link>
              </li>
              <li>
                <Link to={`/${Global.FILM}/${Global.FILM_CATEGORY[0].category}`}>
                  <span className="glyphicon glyphicon-film" aria-hidden="true"></span>
                  &nbsp;电影
                </Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a onClick={this.handleLoginClick}>登录</a></li>
              <li><a onClick={this.handleRegisterClick}>注册</a></li>
            </ul>
            <form className="navbar-form navbar-right" onSubmit={this.handleSearchSubmit}>
              <input type="text" className="form-control" placeholder="搜索..."></input>
            </form>
          </div>
          </div>
        </div>
        <Login showLogin={this.state.showLogin} handleCloseClick={this.handleCloseClick} handleRegisterClick={this.handleRegisterClick}/>
        <Register handleLoginClick={this.handleLoginClick} showRegister={this.state.showRegister} handleCloseClick={this.handleCloseClick}/>
      </nav>
    )
  }

}

export default Navigation;