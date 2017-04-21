import React from 'react';
import { Link } from 'react-router';

import SubNavigation from './SubNavigation.jsx';
import Global from '../Global.jsx';
import { fetchData } from '../util/utils.jsx';

import Footer from './Footer.jsx';
import BackToTop from './BackToTop.jsx';
import LoadMore from './LoadMore.jsx';

import music1 from '../../json/music1.json';
import music2 from '../../json/music2.json';
import music3 from '../../json/music3.json';
import music4 from '../../json/music4.json';
import music5 from '../../json/music5.json';
import music6 from '../../json/music6.json';

const data = [music1, music2, music3, music4, music5, music6];

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.loadMoreTop = 0;
    this.start = 0;
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

  componentDidMount () {
    this.initLoadMore();
  }

  componentDidUpdate(prevProps, prevState){
    this.loadMoreTop = $('#loadMore').offset().top;
  }

  initLoadMore () {
    let that = this;
    let height = $(window).height();
    let isLoadMore = true;
    $(window).on('scroll', (e) => {
      if(isLoadMore) {
        if(this.loadMoreTop - $(window).scrollTop() <= height) {
          isLoadMore = false;
          setTimeout(() => {
            // let category = this.props.params.category;
            // for(let i=0; i<Global.MUSIC_CATEGORY.length; i++){
            //   let item = Global.MUSIC_CATEGORY[i];
            //   if(item.category == category){
            //     fetchData(Global.MUSIC_CATEGORY[i].baseURL, {start: this.start}, (data) => {
            //       let arr = that.state.musics;
            //       arr.push(...data.musics);
            //       this.setState({
            //         musics: arr
            //       })
            //       this.start += 5;
            //     });
            //   }
            // }
            let category = this.props.params.category;
            for(let i=0; i<Global.MUSIC_CATEGORY.length; i++){
              let item = Global.MUSIC_CATEGORY[i];
              if(item.category == category){
                let arr = that.state.musics;
                arr.push(data[i].musics[this.start++ % 4]);
                this.setState({
                  musics: arr
                })
              }
            }
            isLoadMore = true;
          }, 1000)
        }
      }
    })
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
                          <p className="ellipsis">专辑音乐:{item.attrs.tracks?item.attrs.tracks[0]:''}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <LoadMore/>
          </div>
          <Footer/>
          <BackToTop/>
        </div>
      </div>
    )  
  }
}

export default Music;