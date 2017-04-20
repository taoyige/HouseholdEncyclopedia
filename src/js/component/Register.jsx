import React from 'react';
 
import BmobUtils from '../util/bmobUtils.jsx';


class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      registerInfo: '',
      isRegisting: false,
      isRegistedSuccessful: false,
    };
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleToLogin = this.handleToLogin.bind(this);
  }

  shouldComponentUpdate () {
    this.clearInput();
    return true
  }

  clearInput () {
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.passwordConfirm.value = '';
    this.refs.email.value = '';
    this.setState({
      registerInfo: '',
    })
  }

  handleCloseClick (e) {
    e.preventDefault();
    this.props.handleCloseClick();
  }

  handleRegisterSubmit (e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let passwordConfirm = this.refs.passwordConfirm.value;
    let email = this.refs.email.value;
    let registerInfo = '';
    if(this.checkInputUsername(username) && this.checkInputPassword(password) && this.checkInputPassword(passwordConfirm) && password == passwordConfirm && email) {
      registerInfo = '正在注册...';
      this.setState({
        isRegisting: true,
      })
      this.register(username, password, email);
    }else if(!this.checkInputUsername(username)) {
      registerInfo = '用户名不合法！';
    }else if(!this.checkInputPassword(password)) {
      registerInfo = '密码不合法！';
    }else if(!this.checkInputPassword(passwordConfirm)) {
      registerInfo = '确认密码不合法！';
    }else if(password !== passwordConfirm) {
      registerInfo = '两次输入的密码不匹配！';
    }else if(!email) {
      registerInfo = '邮箱不合法';
    }
    this.setState({
      registerInfo: registerInfo,
    })
  }

  /**
   * 注册用户方法
   */
  register (username, password, email) {
    const success = (user) => {
      this.setState({
        isRegistedSuccessful: true,
      })
    }

    const fail = (user, e) => {
      console.log('注册失败', e);
    }

    BmobUtils.register(username, password, email, success, fail);
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

  handleToLogin () {
    this.setState({
      isRegistedSuccessful: false,
    })
    this.props.handleLoginClick();
  }

  render () {
    return (
      <div className="register" style={{ display: this.props.showRegister?'block':'none' }}>
        <div className="mask"></div>
        <div className="content">
          <a onClick={this.handleCloseClick} className="close-register">
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </a>
        	<form style={{ display: this.state.isRegistedSuccessful ? "none" : 'block'}} className="form-horizontal" onSubmit={this.handleRegisterSubmit}>
					  <div className="form-group">
					    <label htmlFor="username" className="col-xs-3 col-sm-3 control-label">账号:</label>
					    <div className="col-xs-9 col-sm-9">
					      <input ref="username" type="text" className="form-control" id="username" placeholder="Username"></input>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="password" className="col-xs-3 col-sm-3 control-label">密码:</label>
					    <div className="col-xs-9 col-sm-9">
					      <input ref="password" type="password" className="form-control" id="password" placeholder="Password"></input>
					    </div>
					  </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm" className="col-xs-3 col-sm-3 control-label">确认密码:</label>
              <div className="col-xs-9 col-sm-9">
                <input ref="passwordConfirm" type="password" className="form-control" id="passwordConfirm" placeholder="Password Confirm"></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="eamil" className="col-xs-3 col-sm-3 control-label">邮箱:</label>
              <div className="col-xs-9 col-sm-9">
                <input ref="email" type="email" className="form-control" id="eamil" placeholder="Email"></input>
              </div>
            </div>
					  <div className="form-group">
					    <div className="col-sm-offset-3 col-sm-10">
					      <button type="submit" className="btn btn-default" disabled={this.state.isRegisting}>注&nbsp;&nbsp;册</button>
                <span className="text-danger">{this.state.registerInfo}</span>
					    </div>
					  </div>
					</form>
          <div style={{ display: this.state.isRegistedSuccessful ? "block" : 'none'}} className="registed-successful">
            <p className="logo text-center text-success"><span className="glyphicon glyphicon-ok-circle"></span></p>
            <p className="info text-center text-success">恭喜！注册成功。</p>
            <button onClick={this.handleToLogin} className="to-login btn btn-default btn-block">去登录</button>
          </div>
        </div>
      </div>
    )
  }

}

export default Register;