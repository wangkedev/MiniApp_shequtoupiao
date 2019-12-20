 // pages/login.js
let app = getApp();
const config = require('../../utils/config.js')
//获取应用实例
Page({
  data: {
    showModal: false,
    selectindex:'',
    selectcontent: [],//选择小区的数据存放
    codetime:30,
    tihuoWay: '请选择登陆小区',
    form:{
      e_id: '',
      phone: '',
      code: '', 
    },
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  //获取用户输入的用户名
  phnoeInput: function (e) {
    let val = e.detail.value;
    val = val.replace(/^(0+)|[^\d]+/g, '')
      this.setData({
        'form.phone': val
      })
    },
  codeInput: function (e) {
    let val = e.detail.value;
    // val=val.replace(/^(0+)|[^\d]+/g,'')
    this.setData({
      'form.code': val
    })
  },
  mySelect(e){
    this.setData({
      selectindex: e.detail.value
    })
    wx.setStorageSync('e_id', this.data.selectcontent[e.detail.value].id)//本地存token
    app.globalData.e_id = this.data.selectcontent[e.detail.value].id
    this.setData({
      'form.e_id': this.data.selectcontent[e.detail.value].id,
      select: false,
    })
  },
  //获取用户输入的密码
  loginBtnClick() {
    if (!(/^1[3456789]\d{9}$/).test(this.data.form.phone)) {
      config.errortoast('请输入正确手机号')
      return
    }
    if (!this.data.form.code) {
      config.errortoast('请输入验证码')
      return
    }
    if (!this.data.form.e_id) {
      config.errortoast('请选择小区')
      return
    }
    config.request('POST', '/phone/Login/dologin', this.data.form, (res) => {
      console.log(res)
      if(res.code==1){
        wx.setStorageSync('token', res.data.token)//本地存token
        app.globalData.token = res.data.token  //全局存token
        wx.hideTabBar();
        wx.switchTab({
          url: '../index/index'
        })
      }else if(res.code==2){           
        this.setData({
          showModal: true
        })
      }else{
        config.errortoast(res.msg)
      }
    })
  },
  /**
   * 倒计时
   */
  timecount(){
    let time = setInterval(() => {
      let t = this.data.codetime;
      t--;
      this.setData({
        codetime:t
      })
      if(this.data.codetime == 0){
        clearInterval(time);
        this.setData({
          codetime: 30
        })
      }
    }, 1000)
  },
  //获取验证码
  hqyzm() {
    if (!(/^1[3456789]\d{9}$/).test(this.data.form.phone)){
      config.errortoast('请输入正确手机号')
      return
    }
    wx.showLoading({
      mask: true,
    })
    config.request('POST', '/phone/base/sendcode', {
      phone: this.data.form.phone
    }, (res) => {
      console.log(res.data)
      wx.hideLoading();
      if(res.code){
        this.timecount();
      }
    })
  },
  /**
   * 弹窗
   */
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  // onCancel: function () {
  //   this.hideModal();
  // },
  /**
   * 对话框确认按钮点击事件
   */
  // onConfirm: function () {
  //   wx.showToast({
  //     title: '提交成功',
  //     icon: 'success',
  //     duration: 2000
  //   })
  //   this.hideModal();
  // },
  //立即认证
  CertificationImmediately:function() {
    wx.navigateTo({
      url: '../CertificationImmediately/CertificationImmediately?phone='+this.data.form.phone+'&e_id='+this.data.form.e_id
    })
    this.hideModal();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    config.request('POST', '/phone/Login/housing', {}, (res) => {
      this.setData({
        selectcontent: res.data.list
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
    if (wx.getStorageSync('token') && wx.getStorageSync('e_id')) {
      app.globalData.token = wx.getStorageSync('token');  //全局存token
      app.globalData.e_id = wx.getStorageSync('e_id');  //全局存token
      wx.hideTabBar();
      wx.switchTab({
        url: '../index/index'
      })
    }
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


 
  
})
