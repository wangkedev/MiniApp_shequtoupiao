// pages/login.js
let app = getApp();
const config = require('../../utils/config.js')
//获取应用实例

Page({
  data: {
    selectData:[],
    index:0,
    roll:'',
    head_list:[],
    head_listindex:0,
    notice:[],
    topic:[],
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 14,
    orientation: 'left',//滚动方向
    interval: 20 // 时间间隔
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
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.setInterval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.setInterval);
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
  getdata(){
    config.request('POST', 'phone/Homes/index', { e_id: app.globalData.e_id, h_id: app.globalData.h_id }, (res) => {
      console.log(res)
      this.setData({
        head_list: res.data.head_list,
        notice: res.data.notice,
        topic: res.data.topic,
        roll: res.data.roll ? res.data.roll.content : '暂无广播',
      })
      this.run1();// 水平一行字滚动完了再按照原来的方向滚动
      app.globalData.h_id = this.data.head_list[this.data.head_listindex].id; app.globalData.h_id
      wx.setStorageSync('h_id', app.globalData.h_id)
      wx.showTabBar();
    })
  },
  /**
   * 公告的点击事件
   */
  noticeclick(e){
    wx.navigateTo({
      url: '../notice/notice?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 房产选择
   */
  head_listchange(e){
    this.setData({
      head_listindex: e.detail.value
    })
    app.globalData.h_id = this.data.head_list[this.data.head_listindex].id;
    this.getdata()
  },
  /**
   * 议题列表
   */
  topicclick(e){
    wx.navigateTo({
      url: '../topic/topic?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 滚动广播
   */
  run1: function () {
    var vm = this;
    clearInterval(vm.data.setInterval);
    //滚动广播
    var length = this.data.roll.length * this.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    this.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : this.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    this.data.setInterval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(vm.data.setInterval);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run1();
      }
    }, vm.data.interval);
  },
})
