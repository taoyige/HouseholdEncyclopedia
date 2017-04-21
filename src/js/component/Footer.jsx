/**
 * 脚注部分
 */
import React from 'react';

class Footer extends React.Component {

  render () {
    return (
      <div className="col-sm-3 col-md-2 list-content col-md-offset-8 footer-fixed hidden-xs hidden-sm">
      	<div className="friends-link module">
          <div className="link-head">
            友情链接
          </div>
          <div className="link-conent clearfix">
            <ul>
              <li><a href="http://www.zhku.edu.cn/">仲恺农业工程学院</a></li>
              <li><a href="http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html">阮一峰-React 技术栈系列教程</a></li>
              <li><a href="http://es6.ruanyifeng.com/">阮一峰-ECMAScript 6 入门</a></li>
              <li><a href="https://github.com/facebook/react">React</a></li>
              <li><a href="https://reacttraining.com/react-router/">React-Router</a></li>
              <li><a href="http://redux.js.org/">Redux</a></li>
              <li><a href="http://webpack.github.io/">Webpack</a></li>
              <li><a href="http://babeljs.io/">Babel</a></li>
              <li><a href="http://www.bootcss.com/">Bootstrap</a></li>
              <li><a href="http://jquery.com/">JQuery</a></li>
              <li><a href="http://nodejs.cn/">NodeJS</a></li>
              <li><a href="https://www.npmjs.com/">NPM</a></li>
            </ul>
          </div>
        </div>
        <div className="module">
          <div className="link-head">
            GitHub
          </div>
          <div className="link-conent clearfix">
            <ul>
              <li><a href="https://github.com/taoyige/HouseholdEncyclopedia">GitHub项目仓库</a></li>
              <li><a href="http://taoyige.github.io/HouseholdEncyclopedia/build">GitHub项目代理</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default Footer;