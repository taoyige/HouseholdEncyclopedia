import React from 'react';

import { fetchData } from '../util/utils.jsx';
import { connect } from 'react-redux';

import BmobUtils from '../util/bombUtils.jsx';
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
    this.handleCancelCollectionClick = this.handleCancelCollectionClick.bind(this);
  }

  componentWillMount () {
    let that = this;
    let id = this.props.params.id;
    let url = Global.BOOK_DETAILS_BASE_URL + id;
    fetchData(url, {}, (data) => {
      that.setState({
        book: data,
      })
    });
  }

  handleCollectionClick () {
    this.props.onCollectionClick(this.props.currentUser, this.props.currentUserBookCollection);
  }

  handleCancelCollectionClick () {
    this.props.onCancelCollectionClick(this.props.currentUser, this.props.currentUserBookCollection);
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
    let hasCollection = false;
    for(let i=0; i<this.props.currentUserBookCollection.length; i++){
      if(this.props.currentUserBookCollection[i].attributes.bookId == this.props.params.id){
        hasCollection = true;
      }
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
              <button style={{display:hasCollection==false?'inline-block':'none'}} onClick={this.handleCollectionClick} className="btn btn-focus btn-lg">
                收&nbsp;&nbsp;藏
              </button>
              <button style={{display:hasCollection==true?'inline-block':'none'}} onClick={this.handleCancelCollectionClick} className="btn btn-default btn-lg">
                取消收藏
              </button>
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
    onCollectionClick: (currentUser, currentUserBookCollection) => { 
      if(currentUser){
        if(currentUserBookCollection.indexOf(ownProps.params.id) == -1){
          BmobUtils.addBookCollection(currentUser.attributes.username, ownProps.params.id, (bookCollection) => {
            dispatch({
              type: Action.ADD_BOOK_COLLECTION, 
              payload: {
                bookCollection: bookCollection
              }
            })
          }, (error) => {
            console.log(error);
          });
        }
      }
    },
    onCancelCollectionClick: (currentUser, currentUserBookCollection) => {
      if(currentUser){
        let bookCollection = null;
        for(let i=0; i<currentUserBookCollection.length; i++){
          if(currentUserBookCollection[i].attributes.bookId == ownProps.params.id){
            bookCollection = currentUserBookCollection[i];
          }
        }
        BmobUtils.removeBookCollection(bookCollection, () => {
          dispatch({
            type: Action.REMOVE_BOOK_COLLECTION, 
            payload: {
              bookCollectionId: bookCollection.id
            }
          })
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
}

const VisibleBookDetails = connect(
  mapStateToProps,
  mapDispatchToProps
  )(BookDetails);


export default VisibleBookDetails;