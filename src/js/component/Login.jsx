import React from 'react';

class Login extends React.Component {

	constructor(props) {
    super(props);

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
	}

  render () {
    return (
      <div id="login" className="login" style={{ display: this.props.showLogin?'block':'none' }}>
        <div className="mask"></div>
        <div className="content">
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
					      <button type="submit" className="btn btn-primary">登&nbsp;&nbsp;录</button>
					      <button onClick={this.props.handleRegisterClick} className="btn btn-default">注&nbsp;&nbsp;册</button>
					    </div>
					  </div>
					  <a onClick={this.handleCloseClick} className="close-login">
					  	<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
					  </a>
					</form>
        </div>
      </div>
    )
  }

}

export default Login;