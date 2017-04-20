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
 * 得到当前用户的图书收藏
 */
const getCurrentUserBookCollection = (success) => {
  let currentUser = getCurrentUser();
  if(!currentUser){
    return ;
  }
  let BookCollection = Bmob.Object.extend("BookCollection");
  let query = new Bmob.Query(BookCollection);
  query.equalTo("username", currentUser.attributes.username);
  query.find({
    success: (results) => {
      if(results){
        success(results);
      }else{
        success([]);
      }
    },
    error: (error) => {
      console.log(error);
    }
  })
}

/**
 * 得到当前用户的音乐收藏
 */
const getCurrentUserMusicCollection = (success) => {
  let currentUser = getCurrentUser();
  if(!currentUser){
    return ;
  }
  let MusicCollection = Bmob.Object.extend("MusicCollection");
  let query = new Bmob.Query(MusicCollection);
  query.equalTo("username", currentUser.attributes.username);
  query.find({
    success: (results) => {
      if(results){
        success(results);
      }else{
        success([]);
      }
    },
    error: (error) => {
      console.log(error);
    }
  })
}

/**
 * 得到当前用户的电影收藏
 */
const getCurrentUserFilmCollection = (success) => {
  let currentUser = getCurrentUser();
  if(!currentUser){
    return ;
  }
  let FilmCollection = Bmob.Object.extend("FilmCollection");
  let query = new Bmob.Query(FilmCollection);
  query.equalTo("username", currentUser.attributes.username);
  query.find({
    success: (results) => {
      if(results){
        success(results);
      }else{
        success([]);
      }
    },
    error: (error) => {
      console.log(error);
    }
  })
}


/**
 * 添加Book收藏
 */
const addBookCollection = (username, bookId, success, fail) => {
  let BookCollection = Bmob.Object.extend("BookCollection");
  let promise = new Promise((resolve, reject) => {
    let query = new Bmob.Query(BookCollection);
    query.equalTo("username", username);
    query.equalTo("bookId", bookId);
    query.find({
      success: (results) => {
        console.log('results', results);
        resolve(results);
      },
      error: (error) => {
        console.log(error);
        reject(error);
      }
    })
  })

  promise.then((results) => {
    if(!results.length) {
      let bookCollection = new BookCollection();
      bookCollection.set('bookId', bookId);
      bookCollection.set('username', username);
      bookCollection.save(null, {
        success: (bookCollection) => {
          console.log('success', bookCollection);
          success(bookCollection);
        },
        error: (bookCollection, error) => {
          console.log(error);
          fail(error);
        },
      })
    }
  })
  .catch((error) => {
    console.log('catch error:', error);
  })
}


/**
 * 删除Book收藏
 */
const removeBookCollection = (bookCollection, success, fail) => {
  console.log('removeBookCollection');
  bookCollection.destroy({
    success: () => {
      console.log('remove success');
      success();
    },
    error: (error) => {
      console.log(error);
    }
  })
}


/**
 * 添加Book收藏
 */
const addMusicCollection = (username, musicId, success, fail) => {
  let MusicCollection = Bmob.Object.extend("MusicCollection");
  let promise = new Promise((resolve, reject) => {
    let query = new Bmob.Query(MusicCollection);
    query.equalTo("username", username);
    query.equalTo("musicId", musicId);
    query.find({
      success: (results) => {
        console.log('results', results);
        resolve(results);
      },
      error: (error) => {
        console.log(error);
        reject(error);
      }
    })
  })

  promise.then((results) => {
    if(!results.length) {
      let musicCollection = new MusicCollection();
      musicCollection.set('musicId', musicId);
      musicCollection.set('username', username);
      musicCollection.save(null, {
        success: (musicCollection) => {
          console.log('success', musicCollection);
          success(musicCollection);
        },
        error: (musicCollection, error) => {
          console.log(error);
          fail(error);
        },
      })
    }
  })
  .catch((error) => {
    console.log('catch error:', error);
  })
}


/**
 * 删除Music收藏
 */
const removeMusicCollection = (musicCollection, success, fail) => {
  console.log('removeMisucCollection');
  musicCollection.destroy({
    success: () => {
      console.log('remove success');
      success();
    },
    error: (error) => {
      console.log(error);
    }
  })
}

/**
 * 添加Film收藏
 */
const addFilmCollection = (username, filmId, success, fail) => {
  let FilmCollection = Bmob.Object.extend("FilmCollection");
  let promise = new Promise((resolve, reject) => {
    let query = new Bmob.Query(FilmCollection);
    query.equalTo("username", username);
    query.equalTo("filmId", filmId);
    query.find({
      success: (results) => {
        console.log('results', results);
        resolve(results);
      },
      error: (error) => {
        console.log(error);
        reject(error);
      }
    })
  })

  promise.then((results) => {
    if(!results.length) {
      let filmCollection = new FilmCollection();
      filmCollection.set('filmId', filmId);
      filmCollection.set('username', username);
      filmCollection.save(null, {
        success: (filmCollection) => {
          console.log('success', filmCollection);
          success(filmCollection);
        },
        error: (filmCollection, error) => {
          console.log(error);
          fail(error);
        },
      })
    }
  })
  .catch((error) => {
    console.log('catch error:', error);
  })
}


/**
 * 删除Film收藏
 */
const removeFilmCollection = (filmCollection, success, fail) => {
  console.log('removefilmCollection');
  filmCollection.destroy({
    success: () => {
      console.log('remove success');
      success();
    },
    error: (error) => {
      console.log(error);
    }
  })
}



const BmobUtils = {
  register,
  login,
  logout,
  getCurrentUser,
  addBookCollection,
  removeBookCollection,
  addMusicCollection,
  removeMusicCollection,
  addFilmCollection,
  removeFilmCollection,
  getCurrentUserBookCollection,
  getCurrentUserMusicCollection,
  getCurrentUserFilmCollection,
}

export default BmobUtils;