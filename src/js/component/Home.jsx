import React from 'react';

import { Link } from 'react-router';

class Home extends React.Component {

  render () {
    return (
      <div className="container">
        <div id="myCarousel" className="carousel slide">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>   
          <div className="carousel-inner">
            <div className="item active">
            <Link to={`book_details/1084336`}>
              <img className="lunbo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493284589&di=133dc3f17d04e500156d4367237b6719&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201602%2F02%2F20160202102232_XGerW.jpeg" alt="First slide"></img>
            </Link>
            </div>
            <div className="item">
            <Link to={`film_details/26260853`}>
              <img className="lunbo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492690004171&di=b81981dd15beacafcc05fa9ec62d09d5&imgtype=0&src=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2016%2F06%2F27%2F20fc80695b270c56a579a4f1f1b35ad6.jpg" alt="Second slide"></img>
            </Link>
            </div>
            <div className="item">
            <Link to={`music_details/26685790`}>
              <img className="lunbo" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3137036912,851843636&fm=23&gp=0.jpg" alt="Third slide"></img>
            </Link>
            </div>
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