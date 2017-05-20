import React from 'react';

import { Link } from 'react-router';
import $ from 'jquery';
import BmobUtils from '../util/bmobUtils.jsx';
import { fetchData, fetchLocalWeather, fetchDestinationWeather } from './../util/utils.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle_on: false,
      carousel_list: [],
      weather_info: {
        date: '1997-01-01',
        results: [
          {
            currentCity: '',
            index: [],
            pm25: '-1',
            weather_data: [],
          }
        ]
      },
    };

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleWeatherSearchSubmit = this.handleWeatherSearchSubmit.bind(this);
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
    fetchLocalWeather((data) => {
      this.setState({
        weather_info: data,
      })
    });
  }

  handleToggleClick () {
    this.setState({
      toggle_on: !this.state.toggle_on,
    })
    if(this.state.toggle_on){
      // $('.weather_detail').removeClass('animated filpInX');
      // $('.weather_detail').addClass('animated filpOutX');
      $('.weather_detail').hide();
    }else {
      // $('.weather_detail').removeClass('animated filpOutX');
      // $('.weather_detail').addClass('animated filpInX');
      $('.weather_detail').show();
    }
  }

  handleWeatherSearchSubmit (e) {
    e.preventDefault();
    let city = this.refs.cityName.value;
    if(city) {
      fetchDestinationWeather(city, (data) => {
        this.setState({
          weather_info: data,
        })
        this.refs.cityName.value = '';
      })
    }
  }

  render () {
    let list = this.state.carousel_list;
    return (
      <div className="container home">
        <div className="row weather hidden-xs hidden-sm">
          <div className="col-xs-1 col-md-1 weather-header"> 
            <p className="text-center">{this.state.weather_info.results[0].currentCity}天气</p>
            <p className="text-center">PM2.5：{this.state.weather_info.results[0].pm25}</p>
          </div>
          {
            this.state.weather_info.results[0].weather_data.map((item, index) => {
              return (
                <div className="col-xs-2 col-md-2 blk_fc_c0_i" key={index}>
                  <p className="wt_fc_c0_i_date">{item.date.split(' ')[0]}</p>
                  <p className="wt_fc_c0_i_weather">{item.weather}</p>
                  <p className="wt_fc_c0_i_wind">{item.wind}</p>
                  <p className="wt_fc_c0_i_temp">{item.temperature}</p>
                </div>
              )
            })
          }
          <form onSubmit={this.handleWeatherSearchSubmit} className="weather-search">
            <input ref='cityName' type="text" placeholder='国内城市'></input>
          </form>
          <div className="toggle" onClick={this.handleToggleClick}>
            <span className={this.state.toggle_on==false?'glyphicon glyphicon-chevron-down':'glyphicon glyphicon-chevron-up'} aria-hidden="true"></span>
          </div>
        </div>
        <div className='row weather weather_detail hidden-xs hidden-sm'>
          <div className="col-xs-1 col-md-1"></div>
          {
            this.state.weather_info.results[0].index.map((item, index) => {
              return (
                <div className="col-xs-2 col-md-2 blk_fc_c0_i" key={index}>
                  <p className="wt_fc_c0_i_tipt">{item.tipt}</p>
                  <p className="wt_fc_c0_i_title_zs">{item.title}：{item.zs}</p>
                  <p className="wt_fc_c0_i_des">{item.des}</p>
                </div>
              )
            })
          }
        </div>
        <div id="myCarousel" className="carousel slide row">
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