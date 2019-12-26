/**
* 创建者:菜菜
* 创建时间:2019/5/9 11:04
* 项目:ipad
* 文件名:index
*/
<template>
  <div class="containerbox" id="container">
    <mu-row align-items='center' class='top'>
      <mu-col span="3" @click='selectvillagemask = true; disablescroll()'>
        <mu-row align-items='center'>
          {{villagearr.length!=0 ?villagearr[villagearrindex].e_name:''}}
          <img src="../assets/img/icon_xzxiaoqu.svg" alt="" class='xiajiantou' />
        </mu-row>
      </mu-col>
      <mu-col span="8">
        <mu-row align-items='center'>
          <div class='topfont'>目标用户任务量：<span>{{villagearr.length!=0?villagearr[villagearrindex].user_num:''}}</span>
          </div>
          <div class='topfont'>已签用户量：<span>{{villagearr.length!=0?villagearr[villagearrindex].is_user_num:''}}</span>
          </div>
        </mu-row>
      </mu-col>

      <mu-col span="1">
        <mu-row justify-content='end' @click='maskshow=true;signoutshow=true;disablescroll()'>
          <img src="../assets/img/touxiang.svg" alt="" />
        </mu-row>
      </mu-col>
    </mu-row>
    <!--小区图片-->
    <!--<div class="bannerbox">
	  	 <img src="http://pics.sc.chinaz.com/files/pic/pic9/201902/zzpic16641.jpg" alt="" class="banner"/>	  
	  </div>-->
    <!--<mu-slide-top-transition>
	 		<midtop class="midtopflex" v-if='midtopflex' @getvillagearr='getvillagearr' @getdata='getdata' @upinputdata='upinputdata' :searchval.sync='searchval' :screenarr='screenarr' :min_input.sync='min_input' :max_input.sync='max_input'></midtop>
	  </mu-slide-top-transition>-->

    <!-- 用户签名 -->
    <div class="mintop">
      <!--<mu-slide-top-transition>-->
      <midtop id='midtop' class='midtopflex' @gotop='gotop' @getvillagearr='getvillagearr' @getdata='getdata'
        @upinputdata='upinputdata' :searchval.sync='searchval' :screenarr='screenarr' :min_input.sync='min_input'
        :max_input.sync='max_input'></midtop>
      <!--</mu-slide-top-transition>-->
    </div>


    <!--签名列表-->
    <div class="box">
      <div v-for='(item,index) in list' :key='index' class="userbox"
        v-if='index>=(page-1)*pagesize&&index<page*pagesize'>
        <div class="title red" v-if='item.is_rent == 2 && item.vote_type == 0'>
          <div style="flex: 1;">{{item.name}}</div>
        </div>
        <div class="title gray" v-if='item.is_rent == 1 && item.vote_type == 0'>
          <div style="flex: 1;">{{item.name}}</div>
        </div>
        <div class="title black" v-if='item.vote_type == 2'>
          <div style="flex: 1;">{{item.name}}</div>
          <div class="tag"> 已回收</div>
        </div>
        <div class="title blue" v-if='item.vote_type ==1'>
          <div style="flex: 1;">{{item.name}}</div>
          <div class="tag">已签名</div>
        </div>
        <div class="body">
          <div class="address">
            <img src="../assets/img/icon_zhufang.svg" alt="" />
            <div>{{item.address}}</div>

          </div>
          <div class="autographbox">
            <img v-if='item.img' :src="item.img" alt="" />
            <div v-else>未签名</div>
          </div>
          <div class="list">
            <div class="left">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</div>
            <div class="right"> {{item.serial}}</div>
          </div>
          <div class="list">
            <div class="left">发放时间：</div>
            <div class="right"> {{(item.start_time?(item.start_time):'-')|timestampconvert}}</div>
          </div>
          <div class="list">
            <div class="left">回收时间：</div>
            <div class="right"> {{(item.end_time?(item.end_time):'-')|timestampconvert}}</div>
          </div>
          <div class="list">
            <div class="left">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</div>
            <div class="right">{{item.remark?item.remark:'-'}} </div>
          </div>

          <div class="bottom">
            <div class="left">
              <span v-if="item.is_rent == 2">{{item.situation?item.situation:'出租'}}</span>
            </div>
            <div class="right" @click.stop='agementboxshow = true; maskshow = true; agementdata=item; disablescroll()'>
              <img src="../assets/img/icon_guanli.svg" alt="" />
              管理
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="total>pagesize">
      <mu-pagination raised circle :total="total" :current.sync="page" :page-size="pagesize" @change='gotop'>
      </mu-pagination>
    </div>

    <!-- 遮罩层 -->
    <!-- 小区选择框 -->
    <mu-slide-top-transition>
      <div class="selectvillagemask" v-show="selectvillagemask" @click='maskhide'>
        <mu-col class='selectvillagebox' v-if='villagearr.length!=0'>
          <mu-col class='list' v-for='(item,index) in villagearr' :key='index'
            @click='villagearrindex = index;maskhide();'>{{item.e_name}}</mu-col>
        </mu-col>
      </div>
    </mu-slide-top-transition>

    <!-- 遮罩层 -->
    <mu-slide-bottom-transition>
      <div class="mask" v-show="maskshow" @click='maskhide'></div>
    </mu-slide-bottom-transition>
    <!--退出框-->
    <mu-slide-top-transition>
      <div class="signout" v-show="signoutshow">
        <img src="../assets/img/icon_close_gray.svg" alt="" class="close" @click='maskhide' />
        <img src="../assets/img/touxiang.svg" alt="" width="80" height="80" />
        <div>{{name}}</div>
        <mu-button class='btn' @click='dialog=true'>退出 </mu-button>
      </div>
    </mu-slide-top-transition>
    <!-- -->
    <mu-slide-top-transition>
      <div class="agementbox" v-if="agementboxshow">
        <img src="../assets/img/icon_close_gray.svg" alt="" @click='maskhide' />
        <div class="title">用户管理</div>
        <div class="btn" v-if='agementdata.vote_type == 0' @click='goautograph'>发放签名</div>
        <div class="btn" v-if='agementdata.vote_type == 1' @click='editstate("vote_type",2)'>已回收</div>
        <div class="btn" v-if='agementdata.vote_type == 2' @click='editstate("vote_type",1)'>未回收</div>
        <!-- <div class="btn" v-if='agementdata.is_rent == 1 || agementdata.is_rent == 2' @click='editstate("is_rent",2)'>设为特殊情况</div> -->
        <div class="btn" v-if='agementdata.is_rent == 1' @click='editstatetsqk'>设为特殊情况</div>
        <div class="btn" v-if='agementdata.is_rent == 2' @click='editstate("is_rent",1)'>无特殊情况</div>
        <div class="btn" @click="goedit">用户资料修改</div>
      </div>
    </mu-slide-top-transition>

	<mu-slide-top-transition>
		<div class="agementbox" v-if="agementboxshownext">
			<img src="../assets/img/icon_close_gray.svg" alt="" @click='maskhidenext' />
			<div class="title">特殊情况</div>
			<div class="btn" @click='editstatetsqkcz("is_rent",2,"出租")'>出租</div>
			<div class="btn" @click='editstatetsqkcz("is_rent",2,"装修")'>装修</div>
			<div class="btn" @click='editstatetsqkcz("is_rent",2,"拒投")'>拒投</div>
		  <div class="btn qtbtn"><input type="text" class="qtinput" placeholder="请输入其他内容" v-model="qtinput" /><mu-button color="primary" class="qtsave" @click='editstatetsqksave("is_rent",2)'>保存</mu-button></div>
		</div>
	</mu-slide-top-transition>

    <mu-dialog title="提示" width="360" :open.sync="dialog">
      退出后将会清空数据
      <mu-button slot="actions" flat color="primary" @click="signout">确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import midtop from './midtop.vue'
  export default {
    components: {
      midtop
    },
    props: {},
    data() {
      return {
        total: 1,
        page: 1,
        pagesize: 15,
        name: '', //登录账号
        dialog: false, //退出确认框
        scroll: 0, //页面滚动到那个位置
        banner: 'http://pics.sc.chinaz.com/files/pic/pic9/201902/zzpic16641.jpg',
        selectvillagemask: false, //选择小区
        villagearr: [], //存放小区的数组
        villagearrindex: 0, //被选中的小区
        maskshow: false, //遮罩层
        signoutshow: false, //退出框
		agementboxshow: false, //用户管理框子
		agementboxshownext:false,//用户管理特殊情况弹窗
        agementdata: {}, //存放是那个用户的管理框子数据
        screenarr: [{ //筛选数组存放
          qianming: null,
          data: [{
            name: '不限签名',
            val: ''
          }, {
            name: '未签名',
            val: '0'
          }, {
            name: '已签名',
            val: '1'
          }, {
            name: '已回收',
            val: '2'
          }, ],
          index: 0,
          show: false,
        }, { //筛选数组存放
          chuzu: null,
          data: [{
            name: '不限情况',
            val: ''
          }, {
            name: '无特殊情况',
            val: '1'
          }, {
            name: '有特殊情况',
            val: '2'
          }],
          index: 0,
          show: false,
        }],
        midtopflex: false, //搜索置顶
        min_input: '', //最小编号
        max_input: '', //最大编号
        searchval: '', //搜索内容
		list: [], //小区用户数据
		qtinput:"",////用户管理特殊情况弹窗（其他）
      }
    },
    watch: {
      /**
       * 监听小区改变  所有数据初始化
       */
      villagearrindex() {
        this.getvillagearr();
        this.getdata();
      }
    },
    filters: {
      timestampconvert(time) {
        if (time == '-') {
          return time
        }
        time = new Date(time);
        return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" +
          time.getMinutes();
      }
    },
    computed: {},
    methods: {
      editstatetsqkcz(name, index,namestate){
        console.log('this.agementdata',this.agementdata,JSON.parse(localStorage.getItem('data')))
        this.agementdata[name] = index;
        let data = JSON.parse(localStorage.getItem('data')),
          length = data[this.villagearrindex].list.length;
        for (let i = 0; i < length; i++) {
          if (data[this.villagearrindex].list[i].id == this.agementdata.id) {
            data[this.villagearrindex].list[i][name] = index;
           
            if (index == 2 && name == 'vote_type') {
              this.agementdata.end_time = (new Date()).getTime();
              data[this.villagearrindex].list[i].end_time = (new Date()).getTime();
            } else if (index == 1 && name == 'vote_type') {
              this.agementdata.end_time = '';
              data[this.villagearrindex].list[i].end_time = '';
            }
            //判断出租 将状态修改为 修改
            if (name == 'is_rent') {
              this.agementdata.is_zu = 1;
              this.agementdata.situation = namestate;
              data[this.villagearrindex].list[i].is_zu = 1;
              data[this.villagearrindex].list[i].situation = namestate;
            }
            break;
          }
        }
        localStorage.setItem('data', JSON.stringify(data));
        this.getdata();
        this.maskhide();
      },
      editstatetsqksave(name, index){
        this.agementdata[name] = index;
        let data = JSON.parse(localStorage.getItem('data')),
          length = data[this.villagearrindex].list.length;
        for (let i = 0; i < length; i++) {
          if (data[this.villagearrindex].list[i].id == this.agementdata.id) {
            data[this.villagearrindex].list[i][name] = index;
           
            if (index == 2 && name == 'vote_type') {
              this.agementdata.end_time = (new Date()).getTime();
              data[this.villagearrindex].list[i].end_time = (new Date()).getTime();
            } else if (index == 1 && name == 'vote_type') {
              this.agementdata.end_time = '';
              data[this.villagearrindex].list[i].end_time = '';
            }
            //判断出租 将状态修改为 修改
            if (name == 'is_rent') {
              this.agementdata.is_zu = 1;
              this.agementdata.situation = this.qtinput;
              data[this.villagearrindex].list[i].is_zu = 1;
              data[this.villagearrindex].list[i].situation = this.qtinput;
            }
            break;
          }
        }
        localStorage.setItem('data', JSON.stringify(data));
        this.getdata();
        this.maskhide();
      },
      editstatetsqk(){
        this.agementboxshownext=true
      },
      maskhidenext(){
        this.agementboxshownext=false
      },
      /**
       * 开启滚动
       */
      enablescroll() {
        document.getElementById('container').style.cssText = 'overflow-y:scroll;';
      },
      /**
       * 禁止滚动
       */
      disablescroll() {
        document.getElementById('container').style.cssText = 'overflow-y:hidden;';
      },
      /**
       * 修改状态
       * name  是需要修改的字段名   is_rent=出租状态     vote_type=回收状态
       * index 是需要修改的值
       */
      editstate(name, index) {
        this.agementdata[name] = index;
        let data = JSON.parse(localStorage.getItem('data')),
          length = data[this.villagearrindex].list.length;
        for (let i = 0; i < length; i++) {
          if (data[this.villagearrindex].list[i].id == this.agementdata.id) {
            data[this.villagearrindex].list[i][name] = index;
            if (index == 2 && name == 'vote_type') {
              this.agementdata.end_time = (new Date()).getTime();
              data[this.villagearrindex].list[i].end_time = (new Date()).getTime();
            } else if (index == 1 && name == 'vote_type') {
              this.agementdata.end_time = '';
              data[this.villagearrindex].list[i].end_time = '';
            }
            //判断出租 将状态修改为 修改
            if (name == 'is_rent') {
              this.agementdata.is_zu = 1;
              this.agementdata.situation = '';
              data[this.villagearrindex].list[i].is_zu = 1;
              data[this.villagearrindex].list[i].situation = '';
            }
            break;
          }
        }
        localStorage.setItem('data', JSON.stringify(data));
        this.getdata();
        this.maskhide();
      },

      /**
       * 去签名
       */
      goautograph() {
        localStorage.setItem('agementdata',JSON.stringify(this.agementdata))
        this.$router.push({
          name: '签名',
          params: {
            villagearrindex: this.villagearrindex,
            agementdata: this.agementdata
          }
        });
        this.maskhide();
      },
      /**
       * 去修改信息
       */
      goedit() {
        this.$router.push({
          path: '/edit',
          query: {
            villagearrindex: this.villagearrindex,
            agementdata: this.agementdata
          }
        });
        this.maskhide();
      },
      /**
       * 子组件将数据更新到这里
       */
      upinputdata(e) {
        this[e.name] = e.val
      },
      /**
       * 回到顶部。
       */
      gotop(e) {
        if (e === true) {
          this.page = 1
        }
        document.querySelector('#container').scrollTop = 0;
      },
      /**
       * 关闭弹窗 及在弹窗上的任何一个东西
       */
      maskhide() {
        this.selectvillagemask = false;
        this.dialog = false;
        this.signoutshow = false;
        this.agementboxshow = false;
        this.agementboxshownext = false;
        this.maskshow = false;
        this.enablescroll();
      },
      /**
       * 获取按条件搜索的数据
       */
      getdata() {
        let list = JSON.parse(localStorage.getItem('data'))[this.villagearrindex].list,
          arr = [];
        list.forEach((v, i) => {
          if (
            (this.screenarr[0].data[this.screenarr[0].index].val === '' || v.vote_type == this.screenarr[0].data[
              this.screenarr[0].index].val) &&
            (this.screenarr[1].data[this.screenarr[1].index].val === '' || v.is_rent == this.screenarr[1].data[this
              .screenarr[1].index].val) &&
            ((this.min_input ? Number(this.min_input) : 0) <= Number(v.serial) && Number(v.serial) <= (this
              .max_input ? Number(this.max_input) : 99999999999)) &&
            (v.address.indexOf(this.searchval) != -1 || v.name.indexOf(this.searchval) != -1 || v.serial.indexOf(this.searchval) != -1 || v.remark.indexOf(this.searchval) != -1 || v.telephone.indexOf(this.searchval) != -1)
          ) {
            arr.push(v);
          }
        })
        this.list = arr;
        this.total = this.list.length;
        //假如在最后一页 ， 处理完最后一条数据的时候，应该重新到最后一页。page 是不会改变的，所以得手动修改
        if (this.page > Math.ceil(this.total / 15)) {
          this.page = Math.ceil(this.total / 15)
        }
        localStorage.setItem('isrefresh', 0);
      },
      /**
       * 获取小区数据
       */
      getvillagearr() {
        this.name = localStorage.getItem('name');
        this.villagearr = [];
        JSON.parse(localStorage.getItem('data')).forEach((v, i) => {
          this.villagearr.push({
            e_name: v.e_name,
            user_num: v.user_num,
            is_user_num: v.is_user_num
          })
        })
      },
      /**
       * 退出
       */
      signout() {
        localStorage.clear();
        this.maskhide();
        this.$router.push({
          path: '/login'
        });
        localStorage.setItem('isrefresh', 1);
      },
      // 用户签名置顶
      //			handleScroll() {
      //				let s_top = document.querySelector('#container').scrollTop
      //				if(s_top>(240)){
      //					this.midtopflex = true
      //				}else{
      //					this.midtopflex = false
      //				}
      //			},
    },
    activated() {
      if (!localStorage.getItem('id')) {
        this.$router.replace({
          path: '/login'
        })
        return
      }
      //  	this.handleScroll();
      document.querySelector('#container').addEventListener('scroll', this.handleScroll);
      document.querySelector('#container').scrollTop = this.scroll;
      if (localStorage.getItem('isrefresh') == 1) { //刷新数据
        this.getvillagearr();
        this.getdata();
      }
    },
    created() {

    },
    mounted() {
      console.log('数据：', JSON.parse(localStorage.getItem('data')))
      if (!localStorage.getItem('id')) {
        this.$router.replace({
          path: '/login'
        })
        return
      }
      //  	this.handleScroll();
      //			document.querySelector('#container').addEventListener('scroll',this.handleScroll);
      //		将小区数据放到数组
      this.getvillagearr();
      this.getdata();
    },
    beforeRouteLeave(to, from, next) {
      this.scroll = document.querySelector('#container').scrollTop;
      //  	document.querySelector('#container').removeEventListener('scroll', this.handleScroll)
      next()
    }
  }

</script>
<style scoped lang='less'>
  .containerbox {
    padding: 58px 0;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: scroll;
  }

  .top {
    padding: 0 0.29rem;
    box-sizing: border-box;
    width: 100%;
    height: 58px;
    z-index: 3;
    top: 0;
    left: 0;
    position: fixed;
    background: #FFFFFF;

    .xiajiantou {
      width: 16px;
      height: 16px;
      margin-left: 10px;
    }

    .topfont {
      margin-right: 0.39rem;
      font-size: 14px;
      color: #737C8C;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span {
        font-size: 18px;
        color: #3AB0FF;
      }
    }
  }

  .bannerbox {
    width: 100%;
    height: 240px;
    padding: 0 0.29rem;
    box-sizing: border-box;

    .banner {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }

  .mintop {
    height: 112px;
  }

  .midtopflex {
    width: 100%;
    position: fixed;
    top: 58px;
    left: 0;
  }

  .box {
    display: flex;
    padding: 0 0.29rem;
    box-sizing: border-box;
    flex-wrap: wrap;

    .userbox {
      width: 3rem;
      height: auto;
      margin-right: 0.195rem;
      background: #FFFFFF;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 20px;

      &:nth-of-type(3n) {
        margin-right: 0;
      }

      .title {
        padding: 0.117rem 0.156rem;
        color: #FFFFFF;
        font-size: 0.175rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .tag {
          color: #333333;
          font-size: 12px;
          /*width: 0.43rem;*/
          background: #FFFFFF;
          padding: 0.04rem;
          box-sizing: border-box;
          border-radius: 4px 1px 4px 1px;
        }

        .bluefont {
          color: #3AB0FF;
        }
      }

      .gray {
        background: #D3D6DC;
      }

      .red {
        background: #F52C2C;
      }

      .blue {
        background: #3AB0FF;
      }

      .black {
        background: #333333;
      }

      .body {
        padding: 0.136rem 0.156rem;

        .address {
          display: flex;
          align-items: center;

          div {
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          img {
            margin-right: 0.097rem;
            width: ;
          }
        }

        .autographbox {

          margin: 14px 0;
          width: 100%;
          background: #F5F6F8;
          border: 1px solid #C8CFDC;
          font-size: 36px;
          color: #C8CDD7;
          text-align: center;
          height: 138px;

          div {
            line-height: 138px;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }

        .list {
          display: flex;
          font-size: 12px;

          .left {
            color: #737C8C;
          }

          .right {
            flex: 1;
            color: #A7AEBD;
            max-height: 36px;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 10px;
          }
        }

        .bottom {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            span {
              color: #FFFFFF;
              font-size: 12px;
              background: #F52C2C;
              padding: 0.04rem;
              box-sizing: border-box;
              border-radius: 4px 1px 4px 1px;
            }
          }

          .right {
            display: flex;
            align-items: center;
            font-size: 16px;
            color: #333333;

            img {
              width: 22px;
              height: 22px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  .selectvillagemask {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2;

    .selectvillagebox {
      background: #FFFFFF;
      margin-top: 58px;
      height: 170px;
      width: 100%;
      overflow-y: scroll;

      .list {
        height: 50px;
        width: 100%;
        position: relative;
        padding-left: 0.29rem;
        line-height: 50px;
        box-sizing: border-box;

        &:after {
          position: absolute;
          bottom: 0;
          content: '';
          height: 1px;
          background: #ebebeb;
          width: calc(100% - 0.29rem);
          right: 0px;
        }
      }
    }
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 5;
  }

  /*退出框*/
  .signout {
    position: fixed;
    width: 320px;
    height: 280px;
    top: calc(50% - 140px);
    left: calc(50% - 160px);
    background: #FFFFFF;
    border-radius: 10px;
    z-index: 6;
    padding: 44px 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    color: #333333;
    line-height: 25px;

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 24px;
      height: 24px;
    }

    .btn {
      width: 100%;
      margin-top: 50px;
      height: 54px;
      font-size: 16px;
      color: #333333;
    }
  }

  /**
	 * 管理框子
	 */
  .agementbox {
    position: fixed;
    top: calc(50% - 140px);
    left: calc(50% - 160px);
    z-index: 6;
    background: #FFFFFF;
    border-radius: 10px;
    width: 320px;
    padding: 20px;
    box-sizing: border-box;

    img {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 24px;
      height: 24px;
    }

    .title {
      font-size: 18px;
      color: #0D0015;
      margin-bottom: 16px;
    }

    .btn {
      height: 54px;
      font-size: 16px;
      color: #3AB0FF;
      line-height: 54px;
      text-align: center;
      border: 1px solid #3AB0FF;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  }

  .pagination {
    margin: 20px auto 0;

    /deep/ .mu-pagination {
      width: 100%;
      justify-content: center;
    }
  }
  .qtbtn{
    display: flex;
    justify-content: space-between;
  }
  .qtinput{
    margin-left: 1%;
    text-align: center;
    width: 80%;
    height: 96%;
    overflow: hidden;
    border: none;
  }
  .qtsave{
    height: 100%;
  }

</style>
