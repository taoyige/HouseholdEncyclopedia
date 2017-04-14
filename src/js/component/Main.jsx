/**
 * 路由入口组件
 * 包括了导航栏组件和主体组件
 */

import React from 'react';
import Navigation from './Navigation.jsx';
import { connect, Provider } from 'react-redux';
import store from '../app.jsx';
class Main extends React.Component {

  render () {
    return (
      <div>
     		<button onClick={this.props.onClick}>我在这里</button>
        <Navigation/>
        { this.props.children }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser
	}
}
const mapDispatchToProps = (state, ownProps) => {
	return {
		onClick: () => { 
			console.log('mapDispatchToProps'); 
			store.dispatch({
				type:0x1, 
				payload: {
					currentUser: Bmob.User.current()
				}
			})
		}
	}
}

const VisibleMain = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Main);

export default VisibleMain;