<template>
  <div class="containerbox">
    <div class="header">
      <img src="../assets/img/icon_return.svg" alt="" @click='$router.go(-1)' />
      已投全部数据
      <div class="save" @click='dialog = true'></div>
    </div>
    <!--签名列表-->
    <div class="box">
      <div v-for='(item,index) in list' :key='index' class="userbox" v-if='index>=(page-1)*pagesize&&index<page*pagesize'>
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
          <div class="tag">未回收</div>
        </div>
        <div class="body">
          <div class="address">
            <img src="../assets/img/icon_zhufang.svg" alt="" />
            <div>{{item.address}}</div>
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
            <div class="right">{{item.situation?item.situation:'-'}} </div>
          </div>
          <div class="list">
            <div class="left">投票类型：</div>
            <div class="right" v-if="item.type==1">{{item.type==1?'网络投票':'-'}} </div>
            <div class="right" v-if="item.type==2">{{item.type==2?'话务投票':'-'}} </div>
            <div class="right" v-if="item.type==3">{{item.type==3?'登门投票':'-'}} </div>
          </div>
          <mu-button color="success" @click="sure(index)">确定</mu-button>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="total>pagesize">
      <mu-pagination raised circle :total="total" :current.sync="page" :page-size="pagesize">
      </mu-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        page:1,
        total: '',
        pagesize: 15,
        list: []
      }
    },
    methods: {
      page() {
        console.log('1')
      },
      sure(index){
        if(this.list[index].vote_type==1){
          this.list[index].vote_type=2
        }else{
          this.list[index].vote_type=1
        }
        localStorage.setItem('alldata1',JSON.stringify(this.list))
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
      },
      
    },
    created() {
      console.log(JSON.parse(localStorage.getItem('alldata1')))
      this.list = JSON.parse(localStorage.getItem('alldata1'))
      this.total = JSON.parse(localStorage.getItem('alldata2')).user_num
    },
    mounted() {
       
    }

  }

</script>
<style scoped lang='less'>
  .containerbox {
    padding-top: 58px;
    box-sizing: border-box;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 58px;
    text-align: center;
    line-height: 58px;
    font-size: 20px;
    color: #333333;
    background: #FFFFFF;
    z-index: 1;

  }

  .header img {
    position: absolute;
    left: 0.29rem;
    top: 19px;
  }

  .save {
    position: absolute;
    font-size: 18px;
    color: #3AB0FF;
    top: 0;
    right: 0.29rem;
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

  .pagination {
    margin: 20px auto 0;

    /deep/ .mu-pagination {
      width: 100%;
      justify-content: center;
    }
  }

</style>
