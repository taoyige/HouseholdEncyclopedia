import React from 'react';

import { Link } from 'react-router';

import { connect } from 'react-redux';
import BmobUtils from '../util/bmobUtils.jsx';

class UserCollection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      musics: [],
      films: [],
      books_count: 0,
      musics_count: 0,
      films_count: 0,
    };
  } 

  // componentWillMount () {
  //   this.initData();
  // }

  componentWillReceiveProps (nextProps) {
    this.initData();
  }


  /**
   * 初始化数据
   */
  initData () {
    BmobUtils.getCurrentUserBookCollection((results) => {
      let books = [];
      for(let i=0; i<results.length; i++){
        let json = JSON.parse(results[i].attributes.book);
        books.push(json)
      }
      this.setState({
        books: books,
        books_count: books.length,
      })
    })
    BmobUtils.getCurrentUserMusicCollection((results) => {
      let musics = [];
      for(let i=0; i<results.length; i++){
        let json = JSON.parse(results[i].attributes.music);
        musics.push(json)
      }
      this.setState({
        musics: musics,
        musics_count: musics.length,
      })
    })
    BmobUtils.getCurrentUserFilmCollection((results) => {
      let films = [];
      for(let i=0; i<results.length; i++){
        let json = JSON.parse(results[i].attributes.film);
        films.push(json)
      }
      this.setState({
        films: films,
        films_count: films.length,
      })
    })
  }

  render () {
    return (
      <div className="container search">
        <div className="row">
          <div className="search-header col-md-12">
            <div className="search-info">
            <p style={{display:this.props.currentUser!=null?'block':'none'}}>
              尊敬的：
              <span className="text-important">
                {this.props.currentUser!=null?this.props.currentUser.attributes.username:''}
              </span>
              <span>您一共收藏了：{this.state.books_count + this.state.musics_count + this.state.films_count}个条目</span>
              <br/>
              <span>图书：{this.state.books_count}</span>
              <span>音乐：{this.state.musics_count}</span>
              <span>电影：{this.state.films_count}</span>
            </p>
            <p style={{display:this.props.currentUser==null?'block':'none'}} className="text-important">
              你还没登录呢！
            </p>
            </div>
            <ul id="nav_search" className="nav nav-tabs nav-justified">
              <li className="active"><a href="#tab1" data-toggle="tab">Book</a>
              </li>
              <li><a href="#tab2" data-toggle="tab">Music</a>
              </li>
              <li><a href="#tab3" data-toggle="tab">Film</a>
              </li>
            </ul>
          </div>
          <div className="search-body col-md-12 container">
            <div className="tab-content">
              <div className="tab-pane active row" id="tab1">
                <p className="text-center" style={{display: this.state.books.length!=0?'none':'block'}}>
                  你还没有收藏一本图书呢！
                </p>
                <ul>
                    {
                      this.state.books.map((item, index) => {
                        let tags = '';
                        for(let i=0; i<item.tags.length; i++){
                          tags += item.tags[i].name + ' ';
                        }
                        return (
                          <li key={index} className="search-item col-md-6">
                            <div className="media">
                              <div className="media-left">
                                <Link to={`/book_details/${item.id}`}>
                                  <img className="media-object dd" src={item.image} alt={item.title}>
                                  </img>
                                </Link>
                              </div>
                              <div className="media-body item-body">
                                <Link to={`/book_details/${item.id}`} className="title">{item.title}</Link>
                                <p className="ellipsis">标签:{tags}</p>
                                <p>作者:{item.author}</p>
                                <p>出版社:{item.publisher}</p>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                </ul>
              </div>
              <div className="tab-pane row" id="tab2">
                <p className="text-center" style={{display: this.state.musics.length!=0?'none':'block'}}>
                  你还没有收藏一首音乐呢！
                </p>
                <ul>
                  {
                    this.state.musics.map((item, index) => {
                      let tags = '';
                      for(let i=0; i<item.tags.length; i++){
                        tags += item.tags[i].name + ' ';
                      }
                      return (
                        <li key={index} className="search-item col-md-6">
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
                              <p className="ellipsis">专辑音乐:{item.attrs.tracks!==undefined ? item.attrs.tracks[0] : '无'}</p>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="tab-pane row" id="tab3">
                <p className="text-center" style={{display: this.state.films.length!=0?'none':'block'}}>
                  你还没有收藏一部电影呢！
                </p> 
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
                        <li key={index} className="search-item col-md-6">
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
    currentUserBookCollection: state.currentUserBookCollection,
    currentUserMusicCollection: state.currentUserMusicCollection,
    currentUserFilmCollection: state.currentUserFilmCollection,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const VisibleUserCollection = connect(
  mapStateToProps,
  mapDispatchToProps
  )(UserCollection);


export default VisibleUserCollection;