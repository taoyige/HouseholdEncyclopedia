import React from 'react';

import { fetchData } from '../util/utils.jsx';
import { connect } from 'react-redux';

import Global from '../Global.jsx';
import Action from '../Action.jsx';

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

    this.handleCollectionClick = this.handleCollectionClick.bind(this);
  }

  componentWillMount () {
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

  handleCollectionClick () {
    this.props.onCollectionClick(this.props.currentUserBookCollection);
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
              <button onClick={this.handleCollectionClick} className="btn btn-focus btn-lg">收&nbsp;&nbsp;藏</button>
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
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCollectionClick: (currentUserBookCollection) => { 
      if(currentUserBookCollection.indexOf(ownProps.params.id) == -1){
        dispatch({
          type: Action.BOOK_COLLECTION, 
          payload: {
            bookId: ownProps.params.id
          }
        })
      }
    }
  }
}

const VisibleBookDetails = connect(
  mapStateToProps,
  mapDispatchToProps
  )(BookDetails);


export default VisibleBookDetails;