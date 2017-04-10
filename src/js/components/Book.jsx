import React from 'react';
import { Link } from 'react-router';

import SubNavigation from './SubNavigation.jsx';
import Global from '../Global.jsx';
import { fetchData } from '../utils.jsx';

import Footer from './Footer.jsx';
import BackToTop from './BackToTop.jsx';

import book1 from '../../json/book1.json';
import book2 from '../../json/book2.json';
import book3 from '../../json/book3.json';
import book4 from '../../json/book4.json';
import book5 from '../../json/book5.json';

const data = [book1, book2, book3, book4, book5];


class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  } 

  componentWillMount () {
    let category = this.props.params.category;
    for(let i=0; i<Global.BOOK_CATEGORY.length; i++){
      let item = Global.BOOK_CATEGORY[i];
      if(item.category == category){
        // fetchData(item.baseURL, {}, (data) => {
        //   console.log(data);
        //   this.setState({
        //     books: data.books
        //   })
        // });
        this.setState({
          books: data[i].books
        })
      }
    }
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <SubNavigation category={ Global.BOOK } list={ Global.BOOK_CATEGORY }/>
          <div className="col-xs-12 col-sm-9 col-sm-offset-2 col-md-7 col-md-offset-1 list-content">
            <ul>
              {
                this.state.books.map((item, index) => {
                  let tags = '';
                  for(let i=0; i<item.tags.length; i++){
                    tags += item.tags[i].name + ' ';
                  }
                  return (
                    <li key={index} className="list-item">
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
          <Footer/>
          <BackToTop/>
        </div>
      </div>
    )
  }

}

export default Book;