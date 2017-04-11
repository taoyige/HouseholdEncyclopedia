/**
 * 导航条组件
 */
import React from 'react';
import { IndexLink, Link } from 'react-router';
import Global from '../Global.jsx';
import { hashHistory } from 'react-router'

class Navigation extends React.Component {

  handleSearchSubmit (e) {
    e.preventDefault();
    let key = e.target.childNodes[0].value;
    if(key) {
      const path = `search/${key}`;
      hashHistory.push(path);
      e.target.childNodes[0].value = '';
    }
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
              <li><a href="../navbar/">登录</a></li>
              <li><a href="../navbar-static-top/">注册</a></li>
            </ul>
            <form className="navbar-form navbar-right" onSubmit={this.handleSearchSubmit}>
              <input type="text" className="form-control" placeholder="搜索..."></input>
            </form>
          </div>
          </div>
        </div>
      </nav>
    )
  }

}

export default Navigation;