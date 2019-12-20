// pages/history/history.js   历史记录
const config = require('../../utils/config.js');//引入
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
            
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    config.nologin();
    config.request('POST', 'phone/Huser/his_list', {   //使用
      //参数
    }, (res) => {
      console.log(res)
      this.setData({
        list:res.data.list
      })
      //成功函数回调区间，必写
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  topic(e) {
    wx.navigateTo({
      url: '../topic/topic?id=' + e.currentTarget.dataset.id,
    })
  },
})