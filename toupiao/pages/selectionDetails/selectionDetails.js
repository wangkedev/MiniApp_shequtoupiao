// pages/selectionDetails/selectionDetails.js
let app = getApp();
const config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "msg.name":"韩梅梅",
    // s_id:0,
    // t_id:0,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.request('POST','phone/Homes/ti_details',{
      s_id: options.s_id,
      t_id:options.t_id,
    },res=>{
      console.log(res);
      this.setData({
        list:res.data.list
      })
    })
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
  changemassages(){
    
  }
})