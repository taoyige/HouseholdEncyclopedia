import React from 'react';

import { fetchData } from '../utils.jsx';

import Global from '../Global.jsx';

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
  }

  componentWillReceiveProps () {
    let that = this;
    let id = this.props.params.id;
    let url = Global.FILM_DETAILS_BASE_URL + id;
    fetchData(url, {}, (data) => {
      console.log(data);
      that.setState({
        film: data,
      })
    });
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
              <button className="btn btn-focus btn-lg">关&nbsp;&nbsp;注</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FilmDetails;