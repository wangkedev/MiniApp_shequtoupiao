//app.js
App({
  globalData: {
    e_id: wx.getStorageSync('e_id') ? wx.getStorageSync('e_id') : '',
    h_id: wx.getStorageSync('h_id') ? wx.getStorageSync('h_id') : '',
    token: wx.getStorageSync('token') ? wx.getStorageSync('token') : '',
  }
})