import React from 'react';

import { Link } from 'react-router';
import BmobUtils from '../util/bmobUtils.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel_list: [],
    };
  } 

  componentWillMount () {
    this.initData();
  }

  componentWillReceiveProps () {
    this.initData();
  }

  initData () {
    BmobUtils.fetchCarouselData((results) => {
      this.setState({
        carousel_list: results
      })
    });
    
  }

  render () {
    let list = this.state.carousel_list;
    return (
      <div className="container">
        <div id="myCarousel" className="carousel slide">
          <ol className="carousel-indicators">
            {
              list.map((item, index) => {
                return (
                  <li key={index} data-target="#myCarousel" data-slide-to={index} className={index==0?'active':''}></li>
                )
              })
            }
          </ol>   
          <div className="carousel-inner">
            {
              list.map((item, index) => {
                return (
                  <div className={index==0?'item active': 'item'} key={index}>
                  <Link to={item.attributes.link}>
                    <img className="lunbo" src={item.attributes.url} alt="Third slide"></img>
                  </Link>
                  </div>
                )
              })
            }
          </div>
          <a className="carousel-control left" href="#myCarousel" 
            data-slide="prev"><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          </a>
          <a className="carousel-control right" href="#myCarousel" 
            data-slide="next"><span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </a>
      </div>
      </div>
    )
  }

}

export default Home;