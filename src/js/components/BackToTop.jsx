import React from 'react';
import $ from 'jquery';

class BackToTop extends React.Component {

	handleClickBackToTop (e) {
    // $(document.body).css(top, 0);
    document.body.scrollTop = 0;
  }

  render () {
    return (
      <div id="backToTop" className="back-to-top hidden-sm hidden-xs">
      	<a href="javascript:;" title="回到顶部" onClick={this.handleClickBackToTop}>
      		<span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
      	</a>
      </div>
    )
  }

}

export default BackToTop;