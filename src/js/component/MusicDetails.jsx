import React from 'react';

import { fetchData } from '../util/utils.jsx';
import { connect } from 'react-redux';

import BmobUtils from '../util/bmobUtils.jsx';
import Global from '../Global.jsx';
import Action from '../Action.jsx';

class MusicDetails extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      music: {
        rating: {
          numRaters: 0,
        },
        title: '',
        image: '',
        summary: '',
        author: [],
        tags: [],
        attrs: {
          pubdate: [ '' ],
          tracks: [ '' ],
          publisher: [ '' ],
        },
      },
    };

    this.handleCollectionClick = this.handleCollectionClick.bind(this);
    this.handleCancelCollectionClick = this.handleCancelCollectionClick.bind(this);
  }

  handleCollectionClick () {
    this.props.onCollectionClick(this.props.currentUser, this.state.music, this.props.currentUserMusicCollection);
  }

  handleCancelCollectionClick () {
    this.props.onCancelCollectionClick(this.props.currentUser, this.props.currentUserMusicCollection);
  }

  componentWillMount () {
    let that = this;
    let id = this.props.params.id;
    let url = Global.MUSIC_DETAILS_BASE_URL + id;
    fetchData(url, {}, (data) => {
      if(that.refs.myRef)
      that.setState({
        music: data,
      })
    });
  }

  render () {
    let music = this.state.music;
    let author = '';
    for(let i=0; i<music.author.length; i++){
      author += music.author[i].name + ' ';
    }
    let tags = '';
    for(let i=0; i<music.tags.length; i++){
      tags += music.tags[i].name + ' ';
    }
    let hasCollection = false;
    for(let i=0; i<this.props.currentUserMusicCollection.length; i++){
      if(this.props.currentUserMusicCollection[i].attributes.musicId == this.props.params.id){
        hasCollection = true;
      }
    }
    return (
      <div className="container details" ref="myRef">
        <div className="details-jumbotron">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={music.image} alt={music.title}></img>
              </a>
            </div>
            <div className="media-body">
              <span className="badge badge-details">
                <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                <span title="收藏数">&nbsp;{music.rating.numRaters}</span>
              </span>
              <h1>{music.title}</h1>
              <p><span className="text-bold">标签：</span>{tags}</p>
              <p><span className="text-bold">作者：</span>{author}</p>
              <p><span className="text-bold">出版日期：</span>{music.attrs.pubdate[0]}</p>
              <p><span className="text-bold">出版商：</span>{music.attrs.publisher[0]}</p>
              <p><span className="text-bold">摘要：</span>{music.summary}</p>
              <p><span className="text-bold">专辑音乐：</span>{music.attrs.tracks[0]}</p>
              <button style={{display:hasCollection==false?'inline-block':'none'}} onClick={this.handleCollectionClick} className="btn btn-focus btn-lg">
                收&nbsp;&nbsp;藏
              </button>
              <button style={{display:hasCollection==true?'inline-block':'none'}} onClick={this.handleCancelCollectionClick} className="btn btn-default btn-lg">
                取消收藏
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentUserMusicCollection: state.currentUserMusicCollection,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCollectionClick: (currentUser, music, currentUserMusicCollection) => { 
      if(currentUser){
        if(currentUserMusicCollection.indexOf(ownProps.params.id) == -1){
          BmobUtils.addMusicCollection(currentUser.attributes.username, music.id, music, (musicCollection) => {
            dispatch({
              type: Action.ADD_MUSIC_COLLECTION, 
              payload: {
                musicCollection: musicCollection
              }
            })
          }, (error) => {
            console.log(error);
          });
        }
      }
    },
    onCancelCollectionClick: (currentUser, currentUserMusicCollection) => {
      if(currentUser){
        let musicCollection = null;
        for(let i=0; i<currentUserMusicCollection.length; i++){
          if(currentUserMusicCollection[i].attributes.musicId == ownProps.params.id){
            musicCollection = currentUserMusicCollection[i];
          }
        }
        BmobUtils.removeMusicCollection(musicCollection, () => {
          dispatch({
            type: Action.REMOVE_MUSIC_COLLECTION, 
            payload: {
              musicCollectionId: musicCollection.id
            }
          })
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
}

const VisibleMusicDetails = connect(
  mapStateToProps,
  mapDispatchToProps
  )(MusicDetails);



export default VisibleMusicDetails;