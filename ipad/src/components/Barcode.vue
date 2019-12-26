<template>
  <div class="containerbox">
    <div class="header">
      <img src="../assets/img/icon_return.svg" alt="" @click='gobaclk' />
      签名对比
      <div class="save" @click='dialog = true'></div>
    </div>
    <div class="smdb">
      <div class="scan">
        <div id="bcid">
        </div>
        <footer>
          <!-- <mu-button color="success" @click="startRecognize">开始扫描</mu-button> -->
          <!-- <mu-button color="success" @click="startScan">2.开始扫描</mu-button>
          <mu-button color="success" @click="cancelScan">3.结束扫描</mu-button>
          <mu-button color="success" @click="closeScan">4.关闭控件</mu-button> -->
        </footer>
      </div>
    </div>
    <div class="debu">
      {{resultval}}
    </div>
  </div>
</template>
<script>
  let scan = null
  export default {
    data() {
      return {
        codeUrl: '',
        resultval:"",
        agementdata:"",
        villagearrindex:"",
        img:""
      }
    },
    methods: {
      // 创建扫描控件
      startRecognize() {
        let that = this
        if (!window.plus) return
        scan = new plus.barcode.Barcode('bcid', [  
          plus.barcode.CODE128  
        ]);  
        scan.onmarked = function(type, result){
          console.log('Success: type='+type+', result='+result);
          result = result.replace(/\n/g, '')
          that.resultval = result
          if(that.agementdata.sole==result){
            let data = JSON.parse(localStorage.getItem('data')), length = data[that.villagearrindex].list.length;
            for(let i = 0 ; i < length ; i++){
              if(data[that.villagearrindex].list[i].id == that.agementdata.id){
                data[that.villagearrindex].list[i].img = that.img;
                data[that.villagearrindex].list[i].vote_type = 1;
                data[that.villagearrindex].list[i].start_time = (new Date()).getTime();
                break ;
              }
            }
            data[that.villagearrindex].is_user_num++;
            localStorage.setItem('data',JSON.stringify(data));
            localStorage.setItem('isrefresh',1);
            that.cancelScan()
            that.closeScan()
            that.$toast.success('匹配成功');
            that.$router.go(-2);
          }else{
            that.cancelScan()
            that.closeScan()
            that.$toast.error('匹配失败，请重新匹配');
            that.$router.go(-1);
          }
        };
      },
      // 开始扫描
      startScan() {
        if (!window.plus) return
        scan.start()
      },
      // 关闭扫描
      cancelScan() {
        if (!window.plus) return
        scan.cancel()
      },
      // 关闭条码识别控件
      closeScan() {
        if (!window.plus) return
        scan.close()
      },
      gobaclk(){
        this.cancelScan()
        this.closeScan()
        this.$router.go(-1)
      }
    },
    created() {

    },
    mounted() {
      this.agementdata = JSON.parse(localStorage.getItem('agementdata'))
      this.img = this.$route.query.img
      this.villagearrindex = this.$route.query.villagearrindex
      this.startRecognize()
    }

  }

</script>
<style scoped lang='less'>
  .scan {
    height: 100%;
  }
  .debu{
   width: 100px;
   height: 100px;
   margin-top: 500px;
  }
  footer {
      position: absolute;
      left: 0;
      top:100px;
      height: 30px;
      line-height: 30px;
      z-index: 2;
    }
  #bcid {
      width: 100%;
      height: 400px;
      margin-top:150px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:3rem;
      text-align: center;
      color: #fff;
      background: #ccc;
    }
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

  .smdb {
    width: 100%;
    /* height: calc(100vh - 58px); */
    text-align: center;
    margin-top: 200px;
    /* line-height: calc(100vh - 58px); */
  }

</style>
