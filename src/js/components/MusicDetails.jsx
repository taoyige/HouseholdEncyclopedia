import React from 'react';

import { fetchData } from '../utils.jsx';

import Global from '../Global.jsx';

class MusicDetails extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      music: {
        rating: {
          numRaters: 0,
        },
        title: '',
        image: '',
        summary: '',
        author: [],
        tags: [],
        attrs: {
          pubdate: [ '' ],
          tracks: [ '' ],
          publisher: [ '' ],
        },
      },
    };
  }

  componentWillReceiveProps () {
    let that = this;
    let id = this.props.params.id;
    let url = Global.MUSIC_DETAILS_BASE_URL + id;
    fetchData(url, {}, (data) => {
      console.log(data);
      that.setState({
        music: data,
      })
    });
  }

  render () {
    let music = this.state.music;
    let author = '';
    for(let i=0; i<music.author.length; i++){
      author += music.author[i].name + ' ';
    }
    let tags = '';
    for(let i=0; i<music.tags.length; i++){
      tags += music.tags[i].name + ' ';
    }
    return (
      <div className="container details">
        <div className="details-jumbotron">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={music.image} alt={music.title}></img>
              </a>
            </div>
            <div className="media-body">
              <span className="badge badge-details">
                <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                <span title="收藏数">&nbsp;{music.rating.numRaters}</span>
              </span>
              <h1>{music.title}</h1>
              <p><span className="text-bold">标签：</span>{tags}</p>
              <p><span className="text-bold">作者：</span>{author}</p>
              <p><span className="text-bold">出版日期：</span>{music.attrs.pubdate[0]}</p>
              <p><span className="text-bold">出版商：</span>{music.attrs.publisher[0]}</p>
              <p><span className="text-bold">摘要：</span>{music.summary}</p>
              <p><span className="text-bold">专辑音乐：</span>{music.attrs.tracks[0]}</p>
              <button className="btn btn-focus btn-lg">关&nbsp;&nbsp;注</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MusicDetails;