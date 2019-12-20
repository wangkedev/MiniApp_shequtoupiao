// pages/notice.js
const config = require('../../utils/config.js');//引入
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    details:'',
    image:'',
    initiator:'',
    issue_time:'',
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    config.request('POST', 'phone/Homes/notice_details', { id: this.data.id},res=>{
      res.data.details = res.data.details.replace(/\/>/g, 'style="width:100% !important;height:auto !important;"/>');
      this.setData({
        ...res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    config.nologin();
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

  }
})