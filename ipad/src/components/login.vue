/**
*  创建者:菜菜
*  创建时间:2019/5/9 11:03
*  项目:ipad
*  文件名:login
*/
<template>
  <div class="containerbox">
    <img src="../assets/img/logo.jpg" alt="" class="logo">
    <div class="box">
      <img src="../assets/img/icon_phone.svg" alt="">
      <input type="text" placeholder="请输入您的手机号" v-model="name" value="name">
    </div>
    <div class="box">
      <img src="../assets/img/icon_mima.svg" alt="">
      <input type="password" placeholder="请输入您的密码" v-model="password" value="password">
    </div>
		<mu-button color="primary" @click="login" class="button" :disabled='disabled'>登录</mu-button>
		<!--数据框子-->
  	<mu-dialog class="uploaddata" :open='updatashow'>
  		<div class="box">
  			<div class="name" >数据更新</div>
  			<div class="upload" >
  				<mu-flex class="demo-linear-progress">
			    	<mu-linear-progress></mu-linear-progress>
			  	</mu-flex>
			  	大约需要1分钟
  			</div>
		  	<!--<div class="cancel" @click='cancel'>取消</div>-->
  		</div>
  	</mu-dialog>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
      	name:'',
      	password:'',
      	disabled:false,
      	updatashow:false,
      }
    },
    watch: {},
    computed: {},
    methods: {
    	login(){
    		if(!(this.name && this.password)){
			    this.$toast.error('手机号和密码不能为空');
    			return
    		}
    		this.disabled = true;
    		this.$post('phone/Drop/login',{name:this.name,password:this.password}).then(res=>{
    			if(res.code){
    				localStorage.setItem('id',res.data.id)
    				localStorage.setItem('name',res.data.name)
    				this.updatashow = true;
						this.$post('phone/Drop/h_index',{u_id:res.data.id}).then(res=>{
							if(res.code==1){
	    					this.$router.push({path:'/'});
								localStorage.setItem('data',JSON.stringify(res.data))
								localStorage.setItem('alldata1',JSON.stringify(res.data[0].over_info.list))
								localStorage.setItem('alldata2',JSON.stringify(res.data[0].over_info))
	    					localStorage.setItem('isrefresh',1)
								this.name='';
	    					this.password='';
							}else if(res.code == 2){
//								this.$toast.error(res.msg);
								this.$router.push({path:'/notask'})
							}
							//延迟3秒修改按钮状态 
//							setTimeout(()=>{
//								this.disabled = false;
//								this.updatashow = false;
//							},5000)
						}).catch(res=>{
							this.disabled = false;
							this.updatashow = false;
		        	this.$toast.error('网络异常');
			      })
    			}else{
    				this.disabled = false;
    				this.$toast.error(res.msg);
    			}
    		}).catch(res=>{
					this.disabled = false;
        	this.$toast.error('网络异常');
	      })
    	}
    },
    activated(){
    	//this.disabled = false;
    },
    created() {
    },
    mounted() {
    	this.disabled = false;
			this.updatashow = false;
    },
  }
</script>
<style scoped lang='less'>
  .containerbox {
		display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    .logo {
      width: 93px;
      height: 93px;
      margin-bottom: 80px;
    }
    .box {
      width: 300px;
      height: 54px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border: 1px solid #CCCCCC;
      border-radius: 4px;
      padding: 14px;
      box-sizing: border-box;
      img {
        width: 24px;
        height: 24px;
        margin-right: 20px;
      }
      input {
        border: 0;
        width: 100%;
        flex: 1;
        font-size: 15px;
        color: #BBBBBB;
        background: transparent;
      }
    }
    .button {
      font-size: 16px;
      color: #FFFFFF;
      width: 300px;
      height: 54px;
      background: #3AB0FF;
      border-radius: 4px;
      margin-bottom: 60px;
    }
  }
  .uploaddata{
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.4);
	z-index: 10;
	.box{
		width:290px;
		height:170px;
		background: #FFFFFF;
		border-radius: 10px;
		padding-top:20px;
		padding-bottom:54px;
		box-sizing: border-box;		
		position:fixed;
		top: calc(50% - 86px);
		left:calc(50% - 145px);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.name{
			font-size: 18px;
			color: #0D0015;
			margin-bottom: 20px;
		}
		.upload{
			align-items: center;
			display: flex;
			font-size: 14px;
			color: #A7AEBD;
			.demo-linear-progress{
				margin: 0 10px;
				width: 100px;
			}
			/deep/.mu-linear-progress-background{
				border-radius: 10px;
			}
			/deep/.mu-linear-progress-determinate{
				border-radius: 10px;
			}
		}
		.cancel{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 54px;
			line-height: 54px;
			text-align: center;
			font-size: 16px;
			color: #333333;
			background: #F5F6F8;
			box-shadow: 0 0 0 0 #EBEBEB;
		}
	}
}
</style>