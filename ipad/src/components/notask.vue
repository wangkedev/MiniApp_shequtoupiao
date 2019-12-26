
<template>
  <div class="containerbox">
		目前没有分配小区
		<mu-button color="success" @click='getdata'>重新获取任务</mu-button>
  	<mu-button color="error" @click='signout'>退出登录</mu-button>
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
        updatashow:false,
      }
    },
    watch: {

    },
    computed: {},
    methods: {
    	/**
    	 * 重新获取数据
    	 */
    	getdata(){
    		this.updatashow = true;
    		this.$post('phone/Drop/h_index',{u_id:localStorage.getItem('id')}).then(res=>{
					if(res.code == 1){
						localStorage.setItem('data',JSON.stringify(res.data));
						localStorage.setItem('isrefresh',1);
						this.$router.push({path:'/'});
					}else{
						this.$toast.error(res.msg);
					}
					this.updatashow = false;
				})
    	},
    	/**
    	 * 退出
    	 */
    	signout(){
    		localStorage.clear();
				this.$router.push({path:'/login'});
				localStorage.setItem('isrefresh',1);
    	},
    },
    created() {
    },
    mounted() {

    }
  }
</script>
<style scoped lang='less'>
.containerbox{
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 30px;
	button{
		width: 200px!important;
		margin: 20px;
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