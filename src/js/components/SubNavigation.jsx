import React from 'react';
import { IndexLink, Link } from 'react-router';


class SubNavigation extends React.Component {

  render () {
    let category = this.props.category;
    return (
      <div className="col-sm-2 col-md-1 sidebar">
        <ul className="nav nav-sidebar">
          {
            this.props.list.map((item, index) => {
              return (
                <li key={index}><Link to={`/${category}/${item.category}`} activeClassName="active">{item.name}</Link></li>
              )
            })
          }
        </ul>
      </div>
    )
  }

}

export default SubNavigation;