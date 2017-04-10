import React from 'react';
import { Link } from 'react-router';

import SubNavigation from './SubNavigation.jsx';
import Global from '../Global.jsx';
import { fetchData } from '../utils.jsx';

import Footer from './Footer.jsx';
import BackToTop from './BackToTop.jsx';

import film1 from '../../json/film1.json';
import film2 from '../../json/film2.json';
import film3 from '../../json/film3.json';

const data = [film1, film2, film3];

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    };
  } 

  componentWillMount () {
    let category = this.props.params.category;
    for(let i=0; i<Global.FILM_CATEGORY.length; i++){
      let item = Global.FILM_CATEGORY[i];
      if(item.category == category){
        // fetchData(item.baseURL, {}, (data) => {
        //   console.log(data);
        //   this.setState({
        //     films: data.subjects
        //   })
        // });
        this.setState({
          films: data[i].subjects
        })
      }
    }
  }

  render () {
     return (
      <div className="container">
        <div className="row">
          <SubNavigation category={ Global.FILM } list={ Global.FILM_CATEGORY }/>
          <div className="col-xs-12 col-sm-9 col-sm-offset-2 col-md-7 col-md-offset-1 list-content">
            <ul>
              {
                this.state.films.map((item, index) => {
                  let casts = '';
                  for(let i=0; i<item.casts.length; i++){
                    casts += item.casts[i].name + ' ';
                  }
                  let directors = '';
                  for(let i=0; i<item.directors.length; i++){
                    directors += item.directors[i].name + ' ';
                  }
                  return (
                    <li key={index} className="list-item">
                      <div className="media">
                        <div className="media-left">
                          <Link to={`/film_details/${item.id}`}>
                            <img className="media-object dd" src={item.images.small} alt={item.title}>
                            </img>
                          </Link>
                        </div>
                        <div className="media-body item-body">
                          <Link to={`/film_details/${item.id}`} className="title">{item.title}</Link>
                          <p className="ellipsis">年份:{item.year}</p>
                          <p>演员:{casts}</p>
                          <p>导演:{directors}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <Footer/>
          <BackToTop/>
        </div>
      </div>
    )
  }

}

export default Film;