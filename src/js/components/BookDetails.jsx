import React from 'react';

import { fetchData } from '../utils.jsx';

import Global from '../Global.jsx';

class BookDetails extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      book: {
        rating: {
          numRaters: 0,
        },
        title: '',
        images: {
          large: '',
        },
        author: [],
        tags: [],
      },
    }
  }

  componentWillReceiveProps () {
    let that = this;
    let id = this.props.params.id;
    let url = Global.BOOK_DETAILS_BASE_URL + id;
    fetchData(url, {}, (data) => {
      console.log(data);
      that.setState({
        book: data,
      })
    });
  }

  render () {
    let book = this.state.book;
    let author = '';
    for(let i=0; i<book.author.length; i++){
      author += book.author[i] + ' ';
    }
    let tags = '';
    for(let i=0; i<book.tags.length; i++){
      tags += book.tags[i].name + ' ';
    }
    return (
      <div className="container details">
        <div className="details-jumbotron">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={book.images.large} alt={book.title}></img>
              </a>
            </div>
            <div className="media-body">
              <span className="badge badge-details">
                <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                <span title="收藏数">&nbsp;{book.rating.numRaters}</span>
              </span>
              <h1>{book.title}</h1>
              <p><span className="text-bold">标签：</span>{tags}</p>
              <p><span className="text-bold">作者：</span>{author}</p>
              <p><span className="text-bold">出版日期：</span>{book.pubdate}</p>
              <p><span className="text-bold">总页数：</span>{book.pages}</p>
              <p><span className="text-bold">售价：</span>{book.price}</p>
              <p><span className="text-bold">出版社：</span>{book.publisher}</p>
              <p><span className="text-bold">摘要：</span>{book.summary}</p>
              <button className="btn btn-focus btn-lg">关&nbsp;&nbsp;注</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetails;