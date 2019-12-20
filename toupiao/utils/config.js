/**
 * 自定义request请求  config.js
 */ 
let app = getApp();
function nologin(){
  console.log(app.globalData)
  if (!app.globalData.token || !app.globalData.e_id) {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
}


function request(Type, url, params, successData, errorData, completeData) {
  //设置默认数据传数格式
  var methonType = "application/json";
  //访问的主域名
  var https ="https://www.goldneighbor.cn/"
  //判断请求方式
  if (Type === 'PUT') {
    var p = Object.keys(params).map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
    url += '?' + p;
    params = {}
  }
  if (Type == "POST") {
    methonType = "application/json"
  }
  params.e_id = app.globalData.e_id;
  params.h_id = app.globalData.h_id;
  //开始正式请求
  wx.request({
    url: https + url,
    method: Type,
    header: {
      'content-type': methonType,
      'token': app.globalData.token
    },
    data: params,
    //成功回调
    success: (res) => {
        successData(res.data)
    },
    //错误回调
    error(res) {
      //检测是否传参errorData，如果有则执行回调errorData(res)
      if (errorData) {
        errorData(res)
      }
    },
    //检测是否传参completeData，如果有则执行回调completeData(res)
    complete(res) {
      if (completeData) {
        completeData(res)
      }
    }
  })
};
//导出模块
module.exports = {
  request: request,
  https:'https://toupiao.mumarenkj.com/',
  errortoast:(msg,time)=>{
    wx.showToast({
      title: msg,
      icon:'none',
      duration: time ? time:1000
    })
  },
  nologin: nologin
}

// //使用
//   const config = require('../../utils/config.js');//引入
//   config.request('GET', '/api/v1/banner/2', {   //使用
//   //参数
// }, (res) => {
//   console.log(res)
//   var imgUrls = res.data.items
//   this.setData({
//     imgUrls: imgUrls
//   })
//   //成功函数回调区间，必写
// })