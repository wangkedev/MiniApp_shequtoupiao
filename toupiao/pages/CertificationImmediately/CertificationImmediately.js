// pages/CertificationImmediately.js
let app = getApp();
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    e_id:'',
    name:'',
    area:'',
    identity:'',
    room:'',
    roomboxshow:true,
    roomarr:[],
    roomarrindex:'',
    // roomarr1:[],
    // roomarr1index:'',
    images:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      phone: options.phone,
      e_id: options.e_id,
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
    config.request('POST','phone/Login/check_house',{e_id:this.data.e_id},(res)=>{
       this.setData({
         roomarr:res.data.list
       })
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
  null(){
  
  },
  selectroomshow(){
    console.log(this.data.roomboxshow)
    this.setData({
      roomboxshow:!this.data.roomboxshow
    })
  },
  /**
   * 房号选择
   */
  roomarrchange(e){
    console.log(e)
    this.setData({
      roomarrindex: e.currentTarget.dataset.index
    })
  },
  /**
   * 业主名字
   */
  nameval(e){
    this.setData({
      name: e.detail.value
    })
  },
  /**
   * 业主名字
   */
  roomval(e) {
    this.setData({
      room: e.detail.value
    })
  },
  /**
   * 面积
   */
  areaval(e){
    this.setData({
      area: e.detail.value
    })
  },
  /**
   * 身份证
   */
  identityval(e){
    this.setData({
      identity: e.detail.value
    })
  },
  //上传图片
  uploadpictures(){
    if (this.data.images.length >= 3){
      config.errortoast('最多上传3张')
      return
    }
    let that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        wx.showLoading({
          title: '图片上传中...',
          mask: true
        })
        wx.uploadFile({
          url: config.https+'phone/base/imgupload', // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {},
          success(res) {
            wx.hideLoading();
            that.data.images.push(res.data);
            that.setData({
              images: that.data.images
            })
          }
        })
      }
    })
  },
  // 删除图片
  delimg(e){
    this.data.images.splice(e.currentTarget.dataset.index,1);
    this.setData({
      images:this.data.images
    })
  },
  //点击提交选票跳转首页 
  submitVote(){
    if(!this.data.name){
      config.errortoast('请输入业主姓名')
      return 
    }
    if (!this.data.room) {
      config.errortoast('请输入认证房号')
      return
    }
    if (!this.data.area) {
      config.errortoast('请输入房屋面积')
      return
    }
    if (this.data.images.length == 0) {
      config.errortoast('请上传材料证明')
      return
    }
    wx.showLoading({
      title: '资料提交中...',
      mask:true
    })
    // app.globalData.h_id = this.data.roomarr[this.data.roomarrindex].id
    config.request('POST','phone/Login/huser_check',{
      h_name: this.data.room,
      name:this.data.name,
      phone: this.data.phone,
      area: this.data.area,
      materials:this.data.images,
      identity: this.data.identity
    },(res)=>{
      wx.hideLoading()
      if(res.code){
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1500,
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }else{
        config.errortoast(res.msg)
      }
    })
  },
})