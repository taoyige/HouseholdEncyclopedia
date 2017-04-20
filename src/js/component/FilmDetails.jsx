import React from 'react';

import { fetchData } from '../util/utils.jsx';
import { connect } from 'react-redux';

import BmobUtils from '../util/bombUtils.jsx';
import Global from '../Global.jsx';
import Action from '../Action.jsx';

class FilmDetails extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	film: {
        reviews_count: 0,
        wish_count: 0,
        year: '',
        images: { large: '' },
        title: '',
        countries: [],
        genres: [],
        casts: [],
        summary: '',
        directors: [ { name: '' } ],
        ratings_count: 0,
    	},
    };

    this.handleCollectionClick = this.handleCollectionClick.bind(this);
    this.handleCancelCollectionClick = this.handleCancelCollectionClick.bind(this);
  }

  componentWillMount () {
    let that = this;
    let id = this.props.params.id;
    let url = Global.FILM_DETAILS_BASE_URL + id;
    fetchData(url, {}, (data) => {
      that.setState({
        film: data,
      })
    });
  }

  handleCollectionClick () {
    this.props.onCollectionClick(this.props.currentUser, this.props.currentUserFilmCollection);
  }

  handleCancelCollectionClick () {
    this.props.onCancelCollectionClick(this.props.currentUser, this.props.currentUserFilmCollection);
  }

  render () {
    let film = this.state.film;
    let casts = '';
    for(let i=0; i<film.casts.length; i++){
      casts += film.casts[i].name + ' ';
    }
    let genres = '';
    for(let i=0; i<film.genres.length; i++){
      genres += film.genres[i] + ' ';
    }
    let hasCollection = false;
    console.log(this.props.currentUserFilmCollection);
    for(let i=0; i<this.props.currentUserFilmCollection.length; i++){
      if(this.props.currentUserFilmCollection[i].attributes.filmId == this.props.params.id){
        hasCollection = true;
      }
    }
    return (
      <div className="container details">
        <div className="details-jumbotron">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={film.images.large} alt={film.title}></img>
              </a>
            </div>
            <div className="media-body">
              <span className="badge badge-details">
                <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                <span title="收藏数">&nbsp;{film.ratings_count}</span>
              </span>
              <h1>{film.title}</h1>
              <p><span className="text-bold">导演：</span>{film.directors[0].name}</p>
              <p><span className="text-bold">演员：</span>{casts}</p>
              <p><span className="text-bold">上映日期：</span>{film.year}</p>
              <p><span className="text-bold">类型：</span>{genres}</p>
              <p><span className="text-bold">摘要：</span>{film.summary}</p>
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
    currentUserFilmCollection: state.currentUserFilmCollection,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCollectionClick: (currentUser, currentUserFilmCollection) => { 
      if(currentUser){
        if(currentUserFilmCollection.indexOf(ownProps.params.id) == -1){
          BmobUtils.addFilmCollection(currentUser.attributes.username, ownProps.params.id, (filmCollection) => {
            dispatch({
              type: Action.ADD_FILM_COLLECTION, 
              payload: {
                filmCollection: filmCollection
              }
            })
          }, (error) => {
            console.log(error);
          });
        }
      }
    },
    onCancelCollectionClick: (currentUser, currentUserFilmCollection) => {
      if(currentUser){
        let filmCollection = null;
        for(let i=0; i<currentUserFilmCollection.length; i++){
          if(currentUserFilmCollection[i].attributes.filmId == ownProps.params.id){
            filmCollection = currentUserFilmCollection[i];
          }
        }
        BmobUtils.removeFilmCollection(filmCollection, () => {
          dispatch({
            type: Action.REMOVE_FILM_COLLECTION, 
            payload: {
              filmCollectionId: filmCollection.id
            }
          })
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
}

const VisibleFilmDetails = connect(
  mapStateToProps,
  mapDispatchToProps
  )(FilmDetails);


export default VisibleFilmDetails;