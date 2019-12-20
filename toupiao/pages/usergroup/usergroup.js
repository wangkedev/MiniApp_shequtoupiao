// pages/usergroup/usergroup.js
const config = require('../../utils/config.js');//引入
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    showModal: false,
    hu_info:{},
    house_user:[],
    type:''
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
  getdata(){
    config.request('POST', 'phone/Huser/huser_list', {}, (res) => {
      this.setData({
        ...res.data
      })
      //成功函数回调区间，必写
    })
  },
  showDialogBtn: function () {
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
      showModal: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    if (!this.data.name) {
      config.errortoast('请输入名字')
      return
    }
    if (!(/^1[3456789]\d{9}$/).test(this.data.phone)) {
      config.errortoast('请输入正确手机号')
      return
    }
    config.request('POST','phone/Huser/huser_add',{
      name:this.data.name,
      phone:this.data.phone,
    },res=>{
      console.log(res);
      if(res.code){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
        this.hideModal();
        this.setData({
          name:'',
          phone:''
        })
        this.getdata();
      }else{
        config.errortoast(res.msg)
      }
    })
    
  },
  phoneval(e){
    let val = e.detail.value;
    val = val.replace(/^(0+)|[^\d]+/g, '')
    this.setData({
      phone: val
    })
  },
  nameval(e) {
    this.setData({
      name: e.detail.value
    })
  },
  delectmember(e){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定踢除成员？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            mask:true,
          })
          config.request('POST','phone/Huser/huser_del',{
            u_id: e.currentTarget.dataset.id
          },res=>{
            if(res.code){
              wx.hideLoading();
              that.getdata();
            }
          })
        }
      }
    })
  }
})