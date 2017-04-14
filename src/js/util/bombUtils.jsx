/**
 * 定义Bmob的相关操作的工具类
 */

/**
 * 添加用户
 */
const addUser = (username, password, email, success, fail) => {
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

let BmobUtils = {
  addUser,
}

export default BmobUtils;