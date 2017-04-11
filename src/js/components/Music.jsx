import React from 'react';
import { Link } from 'react-router';

import SubNavigation from './SubNavigation.jsx';
import Global from '../Global.jsx';
import { fetchData } from '../utils.jsx';

import Footer from './Footer.jsx';
import BackToTop from './BackToTop.jsx';

import music1 from '../../json/music1.json';
import music2 from '../../json/music2.json';
import music3 from '../../json/music3.json';
import music4 from '../../json/music4.json';
import music5 from '../../json/music5.json';

const data = [music1, music2, music3, music4, music5];

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
    };
  } 

  componentWillMount () {
    this.initMusics();
  }

  componentWillReceiveProps () {
    this.initMusics();
  }

  initMusics () {
    let category = this.props.params.category;
    for(let i=0; i<Global.MUSIC_CATEGORY.length; i++){
      let item = Global.MUSIC_CATEGORY[i];
      if(item.category == category){
        // fetchData(item.baseURL, {}, (data) => {
        //   console.log(data);
        //   this.setState({
        //     musics: data.musics
        //   })
        // });
        this.setState({
          musics: data[i].musics
        })
      }
    }
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <SubNavigation category={ Global.MUSIC } list={ Global.MUSIC_CATEGORY }/>
          <div className="col-xs-12 col-sm-9 col-sm-offset-2 col-md-8 col-md-offset-1 list-content">
            <ul>
              {
                this.state.musics.map((item, index) => {
                  let tags = '';
                  for(let i=0; i<item.tags.length; i++){
                    tags += item.tags[i].name + ' ';
                  }
                  return (
                    <li key={index} className="list-item">
                      <div className="media">
                        <div className="media-left">
                          <Link to={`/music_details/${item.id}`}>
                            <img className="media-object dd" src={item.image} alt={item.title}>
                            </img>
                          </Link>
                        </div>
                        <div className="media-body item-body">
                          <Link to={`/music_details/${item.id}`} className="title">{item.title}</Link>
                          <p className="ellipsis">标签:{tags}</p>
                          <p>发行年份:{item.attrs.pubdate}</p>
                          <p className="ellipsis">专辑音乐:{item.attrs.tracks[0]}</p>
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

export default Music;