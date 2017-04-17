/**
 * 定义Bmob的相关操作的工具类
 */

/**
 * 用户注册
 */
const register = (username, password, email, success, fail) => {
  console.log(username);
  let user = new Bmob.User();
  user.set('username', username);
  user.set('password', password);
  user.set('email', email);

  user.signUp(null, {
    success: function(user) {
      success(user);
    },
    error: function(user, e) {
      fail(user, e);
    }
  });
}

/**
 * 用户登录
 */
const login= (username, password, success, fail) => {
  Bmob.User.logIn(username, password, {
    success: function(user) {
      success(user);
    },
    error: function(user, error) {
      fail(user, error);
    }
  });
}

/**
 * 得到当前成功登录的用户
 */
const getCurrentUser = () => {
  let currentUser = Bmob.User.current();
  return currentUser;
}

/**
 * 注销用户
 */
const logout = () => {
  console.log(Bmob.User.logOut());
}


/**
 *  添加Book收藏
 */
const addBookCollection = (username, bookId) => {
  let BookCollection = Bmob.Object.extend("BookCollection");
  let bookCollection = new BookCollection();
  bookCollection.set('bookId', bookId);
  bookCollection.save(null, {
    success: (bookCollection) => {
      console.log('success');
    },
    error: (bookCollection, error) => {
      console.log(error);
    },
  })
}




const BmobUtils = {
  register,
  login,
  logout,
  getCurrentUser,
  addBookCollection,
}

export default BmobUtils;