// pages/topic/topic.js
const config = require('../../utils/config.js');//引入
let app = getApp();
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    swiperheight:300,
    // tab切换  
    currentTab: 0,
    id: 0,//议题列表id
    begin_time:0,
    details:'',
    end_time:0,
    hold:'',
    image:'',
    list:[],
    name:'',
    is_be:1,
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id
    })
    this.getdata();
    /** 
     * 获取系统信息 
     */
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       winWidth: res.windowWidth,
    //       winHeight: res.windowHeight
    //     });
    //   }
    // });
  },
  onShow(){
    config.nologin();
  },
  /**
   * 获取数据
   */
  getdata(){
    config.request('POST', 'phone/Homes/topic_details', { id:this.data.id},(res)=>{
      res.data.details = res.data.details.replace(/\/>/g, 'style="width:100% !important;height:auto !important;"/>');
      this.setData({
        ...res.data
      })
      this.changeswiperitemheight(0);
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    this.changeswiperitemheight(e.detail.current);
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    this.changeswiperitemheight(e.target.dataset.current);
  },
  //动态改变轮播的高度  
  changeswiperitemheight(index){
    const query = wx.createSelectorQuery(),that = this;
    query.select('#swiperitem' + index).boundingClientRect()
    query.exec(function (res) {
      that.setData({
        swiperheight:res[0].height,
      })
    })
  },
  gotoNavselectionDetails: function (e) {
    wx.navigateTo({
      url: '../selectionDetails/selectionDetails?t_id=' + e.currentTarget.dataset.t_id + '&s_id=' + e.currentTarget.dataset.s_id,
    })
  },
  //点击全部同意
  allcheck(e){
    if(this.data.is_be == 2) return
    //判断长度最多同意长度大于数组长度时  将遍历的次数改成数组长度
    let num =  this.data.list[e.currentTarget.dataset.index].ti.length;
    if (this.data.list[e.currentTarget.dataset.index].allcheck){
      this.data.list[e.currentTarget.dataset.index].allcheck = false;
      for (let i = 0; i < num ;i++){
        this.data.list[e.currentTarget.dataset.index].ti[i].topic_incident_ti_res = ''
      }
      this.setData({
        list : this.data.list
      })
    }else{
      this.data.list[e.currentTarget.dataset.index].allcheck = true;
      for (let i = 0; i < num; i++) {
        this.data.list[e.currentTarget.dataset.index].ti[i].topic_incident_ti_res = 1
      }
      this.setData({
        list: this.data.list
      })
    }
  },
  /**
   * 选择结果
   */
  check(e){
    if (this.data.is_be == 2) return
    this.data.list[e.currentTarget.dataset.l_index].ti[e.currentTarget.dataset.t_index].topic_incident_ti_res = e.currentTarget.dataset.val
    this.setData({
      list :this.data.list
    })
  },
  /**
   * 提交按钮
   */
  btn(){
    let result = true,arr=[];
    for(let i = 0;i<this.data.list.length;i++ ){
      let num = this.data.list[i].num, agreenum = 0, haswaiver = false;//最多能选多少个同意   haswaiver是否有弃权
      for(let j = 0 ;j<this.data.list[i].ti.length;j++){
        if (!this.data.list[i].ti[j].topic_incident_ti_res){//判断是否选了
          result = false;
          config.errortoast('请选择' + this.data.list[i].ti[j].theme + '的结果');
          break;
        }
        if (this.data.list[i].ti[j].topic_incident_ti_res == 3) haswaiver = true ;
        if (this.data.list[i].ti[j].topic_incident_ti_res==1){
          agreenum++;
        }
        if ((j == this.data.list[i].ti.length - 1) && num < agreenum) {
          config.errortoast(this.data.list[i].name + '议题最多能赞同 ' + num + ' 项，您现在选了 ' + agreenum+' 项赞同',2000);
          result = false;
          break;
        }
        //达到最大赞同数之后 不能有弃权票
        // if ((j == this.data.list[i].ti.length - 1) && num <= agreenum && haswaiver) { 
        //   config.errortoast(this.data.list[i].name + '议题达到最大赞同数 ' + num + ' 之后，其他选项应是反对而不是弃权', 2000);
        //   result = false;
        //   break;
        // }
        let obj = { id: this.data.list[i].ti[j].id, res: this.data.list[i].ti[j].topic_incident_ti_res};
        arr.push(obj);
      }
    }
    if (!result){
      return
    }
    wx.showLoading({
      mask: true,
    })
    config.request('POST','phone/Homes/topic_sure',{
      id: this.data.id,
      answer:arr
    },res=>{
      wx.hideLoading();
      if(res.code){
        wx.showToast({
          title: '投票成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      }else{
        config.errortoast(res.msg)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})  