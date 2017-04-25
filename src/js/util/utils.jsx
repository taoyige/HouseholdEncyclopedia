import $ from 'jquery';
import Global from '../Global.jsx';

const uuid = () => {
  let i, random;
  let uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16);
  }
  return uuid;
}



/*转换前：{id: '001',name: 'taoyige', age: 22} (obj)
  转换后：id=001&name=taoyige&age=22
*/
const obj2uri = (obj) => {
  return Object.keys(obj).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
}



/**
 * 异步jsonp请求
 */
const $jsonp = (url, data, callback) => {
  // 生成唯一函数名
  var callbackFuncName = 'MY_JSONP_CALLBACK' + Math.random().toString().replace('.', '');

  var params = '';
  // 先判断url有没有自带?
  if (url.indexOf('?') == -1) {
      params += '?';
  }
  // 拼接参数
  for (var key in data) {
      params += key + '=' + data[key] + '&';
  }

  url += params + 'callback' + '=' + callbackFuncName;

  // 创建script节点
  var script = document.createElement('script');


  // 1. 挂载方法到window
  // 每次执行完callback后都需要将该script对象删除
  window[callbackFuncName] = function (data) {
    callback(data);
    document.body.removeChild(script);
  };

  // 插入数据
  script.src = url;

  // 插入节点
  document.body.appendChild(script);
}


/**
 * 根据url获取数据
 */
const fetchData = (url, data, callback) => {
  $jsonp(url, data, callback);
}


/**
 * 获取当前地理位置的天气
 */
const fetchLocalWeather = (success) => {
  let promise = new Promise((resolve, reject) => {
    $.getScript(Global.SINA_LOACTION_URL, function(_result) {
      if (remote_ip_info.ret == '1') {
        resolve(remote_ip_info.city);
      } else {
        reject('没有找到匹配的IP地址信息！');
      }
    });
  })

  promise.then((city)=> {
    fetchDestinationWeather(city, success);
  }).catch((error) => {
    console.log(error);
  });
}

/**
 * 获取指定地点天气
 */
const fetchDestinationWeather = (city, success) => {
  fetchData(Global.BAIDU_WEATCHER_URL, 
    { location:city, output:'json', ak:Global.BAIDU_AK }, 
    (data) => {
      console.log(data);
      if(data.error === 0)
        success(data);
  });
}

export {uuid, obj2uri, fetchData, fetchLocalWeather, fetchDestinationWeather};