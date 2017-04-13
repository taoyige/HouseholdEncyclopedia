import React from 'react';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleCloseClick (e) {
    e.preventDefault();
    this.props.handleCloseClick();
  }

  handleRegisterSubmit (e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
  }

  render () {
    return (
      <div className="register" style={{ display: this.props.showRegister?'block':'none' }}>
        <div className="mask"></div>
        <div className="content">
        	<form className="form-horizontal" onSubmit={this.handleRegisterSubmit}>
					  <div className="form-group">
					    <label htmlFor="username" className="col-sm-3 control-label">账号:</label>
					    <div className="col-sm-9">
					      <input ref="username" type="text" className="form-control" id="username" placeholder="Username"></input>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="password" className="col-sm-3 control-label">密码:</label>
					    <div className="col-sm-9">
					      <input ref="password" type="password" className="form-control" id="password" placeholder="Password"></input>
					    </div>
					  </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm" className="col-sm-3 control-label">确认密码:</label>
              <div className="col-sm-9">
                <input ref="passwordConfirm" type="password" className="form-control" id="passwordConfirm" placeholder="Password Confirm"></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="eamil" className="col-sm-3 control-label">邮箱:</label>
              <div className="col-sm-9">
                <input ref="email" type="email" className="form-control" id="eamil" placeholder="Email"></input>
              </div>
            </div>
					  <div className="form-group">
					    <div className="col-sm-offset-3 col-sm-9">
					      <div className="checkbox">
					        <label>
					          <input type="checkbox"></input>记住密码
					        </label>
					      </div>
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-sm-offset-3 col-sm-10">
					      <button type="submit" className="btn btn-default">注&nbsp;&nbsp;册</button>
					    </div>
					  </div>
					  <a onClick={this.handleCloseClick} className="close-register">
					  	<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
					  </a>
					</form>
        </div>
      </div>
    )
  }

}

export default Register;