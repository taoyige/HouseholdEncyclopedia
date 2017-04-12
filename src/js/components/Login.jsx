import React from 'react';

class Login extends React.Component {

	constructor(props) {
    super(props);

    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

	handleCloseClick (e) {
		e.preventDefault();
		this.props.handleCloseClick();
	}

  render () {
    return (
      <div id="login" className="login" style={{ display: this.props.showLogin?'block':'none' }}>
        <div className="mask"></div>
        <div className="content">
        	<form className="form-horizontal">
					  <div className="form-group">
					    <label htmlFor="inputEmail3" className="col-sm-2 control-label">账号:</label>
					    <div className="col-sm-10">
					      <input type="email" className="form-control" id="inputEmail3" placeholder="Username"></input>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputPassword3" className="col-sm-2 control-label">密码:</label>
					    <div className="col-sm-10">
					      <input type="password" className="form-control" id="inputPassword3" placeholder="Password"></input>
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-sm-offset-2 col-sm-10">
					      <div className="checkbox">
					        <label>
					          <input type="checkbox"></input>记住密码
					        </label>
					      </div>
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-sm-offset-2 col-sm-10">
					      <button type="submit" className="btn btn-primary">登&nbsp;&nbsp;录</button>
					      <button type="submit" className="btn btn-default">注&nbsp;&nbsp;册</button>
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