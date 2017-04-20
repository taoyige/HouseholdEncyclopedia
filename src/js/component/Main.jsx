/**
 * 路由入口组件
 * 包括了导航栏组件和主体组件
 */

import React from 'react';
import Navigation from './Navigation.jsx';
import { connect, Provider } from 'react-redux';
import BmobUtils from '../util/bmobUtils.jsx';
import Action from '../Action.jsx';

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

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => { 
			dispatch({
				type:0x1, 
				payload: {
					currentUser: Bmob.User.current()
				}
			})
		},
    initBookCollectionData: () => {
      BmobUtils.getCurrentUserBookCollection((results) => {
        dispatch({
          type: Action.INIT_BOOK_COLLECTION,
          payload: {
            bookCollection: results
          }
        })
      });
    },
    initMusicCollectionData: () => {
      BmobUtils.getCurrentUserMusicCollection((results) => {
        dispatch({
          type: Action.INIT_MUSIC_COLLECTION,
          payload: {
            musicCollection: results
          }
        })
      });
    },
    initFilmCollectionData: () => {
      BmobUtils.getCurrentUserFilmCollection((results) => {
        dispatch({
          type: Action.INIT_FILM_COLLECTION,
          payload: {
            filmCollection: results
          }
        })
      });
    }
	}
}

const VisibleMain = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Main);

export default VisibleMain;