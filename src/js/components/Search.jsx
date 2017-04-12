import React from 'react';
import { Link } from 'react-router';

import $ from 'jquery';

import Global from '../Global.jsx';
import { obj2uri, fetchData } from '../utils.jsx';

class Search extends React.Component {

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

  componentWillMount () {
    this.initData();
  }

  componentWillReceiveProps (nextProps) {
    this.initData();
  }

  /**
   * 初始化数据方法
   */
  initData () {
    let key = this.props.params.key;
    let params = obj2uri({ tag: key, count: 10 });

    fetchData(`${Global.BOOK_SEARCH_BASE_URL}?${params}&`, {}, (data) => {
      this.setState({
        books: data.books,
        books_count: data.count,
      })
    });

    fetchData(`${Global.MUSIC_SEARCH_BASE_URL}?${params}&`, {}, (data) => {
      this.setState({
        musics: data.musics,
        musics_count: data.count,
      })
    });

    fetchData(`${Global.FILM_SEARCH_BASE_URL}?${params}&`, {}, (data) => {
      this.setState({
        films: data.subjects,
        films_count: data.count,
      })
    });
  }

	render () {
		return (
			<div className="container search">
        <div className="row">
          <div className="search-header col-md-12">
            <div className="search-info">
            <p>
              <span>关键字：{this.props.params.key}</span>
              <span>总条目：{this.state.books_count + this.state.musics_count + this.state.films_count}</span>
              <br/>
              <span>图书：{this.state.books_count}</span>
              <span>音乐：{this.state.musics_count}</span>
              <span>电影：{this.state.films_count}</span>
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
                  没找到"{this.props.params.key}"的相关图书信息!
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
                  没找到"{this.props.params.key}"的相关音乐信息!
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
                  没找到"{this.props.params.key}"的相关电影信息!
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

export default Search;