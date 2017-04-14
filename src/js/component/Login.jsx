import React from 'react';

import BmobUtils from '../util/bombUtils.jsx';

class Login extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      loginInfo: '',
      isLogining: false,
    };
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

	handleCloseClick (e) {
		e.preventDefault();
		this.props.handleCloseClick();
	}

	handleLoginSubmit (e) {
		e.preventDefault();
		let username = this.refs.username.value;
		let password = this.refs.password.value;
		let loginInfo = '';
    if(this.checkInputUsername(username) && this.checkInputPassword(password)) {
      loginInfo = '正在登录...';
      this.setState({
        isLogining: true,
      })
      this.login(username, password);
    }else if(!this.checkInputUsername(username)) {
      loginInfo = '用户名不合法！';
    }else if(!this.checkInputPassword(password)) {
      loginInfo = '密码不合法！';
    }
    this.setState({
      loginInfo: loginInfo,
    })
	}

	/**
   * 检查输入的用户名合法性
   */
  checkInputUsername (username) {
    if(username.match(/^[a-zA-Z][A-Za-z0-9]{2,8}$/)) {
      return true;
    }
    return false;
  }

  /**
   * 检查输入的密码合法性
   */
  checkInputPassword (password) {
    if(password.match(/^[a-zA-Z][A-Za-z0-9]{2,8}$/)) {
      return true;
    }
    return false;
  }

	login (username, password) {
		const success = (user) => {
			console.log('登录成功', user);
		}

		const fail = (user, e) => {
			this.setState({
				isLogining: false,
			})
			let loginInfo = '';
			if(e.code === 101) {
				loginInfo = '用户名或密码错误！';
			}
			this.setState({
	      loginInfo: loginInfo,
	    })
		}

		BmobUtils.login(username, password, success, fail);
	}

  render () {
    return (
      <div id="login" className="login" style={{ display: this.props.showLogin?'block':'none' }}>
        <div className="mask"></div>
        <div className="content">
        	<a onClick={this.handleCloseClick} className="close-login">
				  	<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
				  </a>
        	<form className="form-horizontal" onSubmit={this.handleLoginSubmit}>
					  <div className="form-group">
					    <label htmlFor="username" className="col-xs-2 col-sm-2 control-label">账号:</label>
					    <div className="col-xs-10 col-sm-10">
					      <input ref="username" type="text" className="form-control" id="username" placeholder="Username"></input>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="password" className="col-xs-2 col-sm-2 control-label">密码:</label>
					    <div className="col-xs-10 col-sm-10">
					      <input ref="password" type="password" className="form-control" id="password" placeholder="Password"></input>
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10">
					      <div className="checkbox">
					        <label>
					          <input type="checkbox"></input>记住密码
					        </label>
					      </div>
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-xs-offset-2 col-xs-10 col-sm-offset-2 col-sm-10">
					      <button disabled={this.state.isLogining} type="submit" className="btn btn-primary">登&nbsp;&nbsp;录</button>
					      <button onClick={this.props.handleRegisterClick} className="btn btn-default">注&nbsp;&nbsp;册</button>
					    	<span className="text-danger">{this.state.loginInfo}</span>
					    </div>
					  </div>
					</form>
        </div>
      </div>
    )
  }

}

export default Login;