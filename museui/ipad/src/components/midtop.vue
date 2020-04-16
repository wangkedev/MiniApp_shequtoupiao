<template>

   <mu-row class='mid'>
  	<div class='title'>
		<div class="left">用户签名<img src="../assets/img/icon_bluerectangle.svg" alt="" /></div>
		<div class="right">
			<div @click='iswho = "uploaddata"; dialog = true;'><img src="../assets/img/icon_sjsc.svg" alt="" />数据上传</div>
			<div @click='iswho = "updata"; dialog = true;'><img src="../assets/img/icon_sjgx.svg" alt="" />数据更新</div>
		</div>
  	</div>
  	<div class='screen'>
  		<div>
  			<!-- 是否签名 -->
			<mu-button ref="qianming" @click="screenarr[0].show = !screenarr[0].show">
				{{screenarr[0].data[screenarr[0].index].name}}
				<img src="../assets/img/icon_shaixuan.svg" alt="" />
			</mu-button>
			<mu-popover cover :open.sync="screenarr[0].show" :trigger="screenarr[0].qianming">
			   <mu-list>
			    <mu-list-item button v-for="(item,index) in screenarr[0].data" :key="index" @click='screen(0,index)'>
			      <mu-list-item-title>{{item.name}}</mu-list-item-title>
			    </mu-list-item>
			  </mu-list>
			</mu-popover>
			<!-- 是否出租 -->
			<mu-button ref="chuzu" @click="screenarr[1].show = !screenarr[1].show">
				{{screenarr[1].data[screenarr[1].index].name}}
				<img src="../assets/img/icon_shaixuan.svg" alt="" />
			</mu-button>
			<mu-popover cover :open.sync="screenarr[1].show" :trigger="screenarr[1].chuzu">
			   <mu-list>
			    <mu-list-item button v-for="(item,index) in screenarr[1].data" :key="index" @click='screen(1,index)'>
			      <mu-list-item-title>{{item.name}}</mu-list-item-title>
			    </mu-list-item>
			  </mu-list>
			</mu-popover>

			<!-- 编号搜索-->
			<div class="inputbox">
				编号：<input type="number" v-model="min" placeholder="开始编号" @blur='search'/> 到<input type="number" v-model="max" placeholder="结束编号" @blur='search'/>
			</div>
  		</div>

		<!-- 搜索框 -->
		<div class="searchbox">
			<mu-text-field v-model="searchvalue" placeholder="请输入地址和名字搜索" action-icon='search' @keyup.enter='search' :action-click='search'></mu-text-field>
		</div>
  	</div>
  	<!--数据框子-->
  	<mu-dialog class="uploaddata" :open='uploaddatashow||updatashow'>
  		<div class="box">
  			<div class="name" v-if='uploaddatashow'>数据上传</div>
  			<div class="upload" v-if='uploaddatashow'>
  				上传中
  				<mu-flex class="demo-linear-progress">
			    	<mu-linear-progress mode="determinate" :value="uploaddatavalue"></mu-linear-progress>
			  	</mu-flex>
			  	{{uploaddatavalue}}%
  			</div>
  			<div class="name" v-if='updatashow'>数据更新</div>
  			<div class="upload" v-if='updatashow'>
  				<mu-flex class="demo-linear-progress">
			    	<mu-linear-progress></mu-linear-progress>
			  	</mu-flex>
			  	大约需要1分钟
  			</div>
		  	<div class="cancel" @click='cancel'>取消</div>
  		</div>
  	</mu-dialog>
  	
  	<mu-dialog title="提示" width="360" :open.sync="dialog">
	    	确定{{iswho =='uploaddata'?'数据上传':'数据更新'}}
    	<mu-button slot="actions" flat color="primary" @click="sure">确定</mu-button>
  	</mu-dialog>
	  
	<mu-dialog title="" width="360" :open.sync="passworddialog" @close='password="";'>
	    <mu-text-field v-model="password" label="请输入密码" label-float  type='password' icon="locked" class="passwordinput"></mu-text-field>
	    <mu-button slot="actions" flat color="primary" @click=" passwordsure ">确定</mu-button>
	</mu-dialog>
  </mu-row>

</template>

<script>
  export default {
    components: {},
    props: {
    	min_input:{
    		type:String,
    		defualt:'',
    	},
    	max_input:{
    		type:String,
    		defualt:'',
    	},
    	searchval:{
    		type:String,
    		defualt:'',
    	},
    	screenarr:{
    		type:Array,
      		default:()=>[]
    	},
    },
    data() {
      return {
      	dialog:false,
      	iswho:'',
		nownum:0,
		allupnum:1,
      	uploaddatashow:false,//上传
      	updatashow:false,
      	searchvalue:this.searchval,//搜索的值
      	max:this.max_input,
      	min:this.min_input,
      	source:null,//终止请求发送
      	end:false,//终止循环数据上传
      	password:"",
      	passworddialog:false,
      }
    },
    watch: {
		max(val,old){
			this.$emit('upinputdata',{name:'max_input',val:val});
			this.$emit('gotop',true);
		},
		min(val,old){
			this.$emit('upinputdata',{name:'min_input',val:val});
			this.$emit('gotop',true);
		},
		searchvalue(val,old){
			this.$emit('upinputdata',{name:'searchval',val:val});
			this.$emit('gotop',true);
		},
    },
    computed: {
		uploaddatavalue:{
			get:function(){
				return Number((this.nownum/this.allupnum*100).toFixed(2))
			},
			set:function(){
				
			}
		}
    },
    methods: {
    	/**
    	 * 确认密码按钮 
    	 */
    	passwordsure(){
    		if(!this.password){
    			this.$toast.error('请输入密码');
    			return 
    		}
			this.$post('/phone/Drop/dd_config',{pass_word:this.password}).then(res=>{
				if(res.code == 1){
					this.password = '';
					this.passworddialog = false; 
		    		this.updata(); 
		    		this.updatashow = true;
				}else{
					this.password = '';
					this.passworddialog = false;
		        	this.$toast.error(res.msg);
				}
			}).catch(res=>{
				this.password = '';
				this.passworddialog = false;
	        	this.$toast.error('网络异常');
			})
    	},
    	/*
    	 * 确认按钮
    	 */
    	sure(){
    		this.dialog = false;
    		if(this.iswho == 'updata'){
    			this.passworddialog = true;
    		}else{
    			this[this.iswho]();
    		}
    	},
    	/**
    	 * 取消
    	 */
    	cancel(){
    		this.uploaddatashow = false;
    		this.updatashow = false;
    		if(typeof this.source ==='function'){
	          	this.source('终止请求'); //取消请求
//	          	this.end = true;
	          	this.nownum = 0;
	          	this.allupnum = 1;
	        }
    	},
    	/**
    	 * 数据上传
    	 */
    	uploaddata(){
    		console.log('我上传了')
			this.uploaddatashow = true;
			let data = JSON.parse(localStorage.getItem('data')),arr = [];
										   console.log('获取的getItemdata:',data);

    		for(let i = 0 ; i < data.length ; i++){
    			data[i].list.forEach((v,index)=>{
    				console.log(v)
    				if(v.is_edit || v.vote_type!=0 || v.is_zu){
    					v.topic_id = data[i].topic_id;
    					arr.push(v)
    				}
    			})
			}
							   console.log('获取的数据arr:',arr);

    		console.log('我走到这里了')
			this.allupnum = arr.length;
			this.up(arr)
    	},
    	up(data){
			// var dataStr = [1,2,3,4];
				   console.log('获取的数据data:',data);
    		// this.axios.post('https://cstoupiao.sharexwd.top/phone/Drop/do_edit', {data:JSON.stringify(data[0]),u_id:localStorage.getItem('id')},{
    		this.axios.post('https://tpapi.yuanshixiong.cn/phone/Drop/do_edit', {data:JSON.stringify(data[0]),u_id:localStorage.getItem('id')},{
    		// this.axios.post('https://tpapi.yuanshixiong.cn/phone/Drop/do_edit', {data:JSON.stringify(dataStr[0]),u_id:'110'},{
    		// this.axios.post('https://tpapi.yuanshixiong.cn/phone/Drop/do_edit', {data:JSON.stringify(data[0])},{
	          cancelToken: new this.axios.CancelToken((c)=> {
	            this.source = c;
	          })
	       	}).then((res) => {
	       		data.splice(0,1);
	       		if(data.length !=0){
	       			setTimeout(()=>{
	       				this.nownum++;
						this.up(data);
	       			},10)
	       		}else{
	       			this.uploaddatashow = false;
	       			this.$toast.success(res.data.msg);
	       			this.updata();
	       		}
				if(res.data.code!=1){
					this.$toast.error(res.data.msg);
				}
	       	}).catch(res=>{
	       		this.cancel()
	       		this.$toast.error('上传失败请重新上传，请勿更新！');
	       		console.log(res)
	       	})
    	},
			
    	/**
    	 *数据更新 
    	 */
    	updata(){
    		this.updatashow = true;
    		let that = this;
			// this.axios.post('https://cstoupiao.sharexwd.top/phone/Drop/h_index', {u_id:localStorage.getItem('id')},{
			this.axios.post('https://tpapi.yuanshixiong.cn/phone/Drop/h_index', {u_id:localStorage.getItem('id')},{
	          cancelToken: new this.axios.CancelToken((c)=> {
	            this.source = c;
	          })
	       	}).then((res) => {
				   console.log('数据更新res:',res);
				if(res.data.code==1){
					localStorage.setItem('data',JSON.stringify(res.data.data));
					//调用index页面 数据更新
					that.$emit('getvillagearr');
					that.$emit('getdata');
				}else if(res.data.code == 2){
					that.$router.push({path:'/notask'})
				}
				that.updatashow = false;
	        }).catch(res=>{
	        	this.updatashow = false;
	        	this.$toast.error('网络异常');
	        })
    	},
    	/**
    	 * 搜索 
    	 */
    	search(){
    		this.$emit('getdata');
    		this.$emit('gotop',true);
    	},
    	/**
    	 * 筛选点击事件   
    	 * 由于数据类型是引用类型  改变了之后源数据就变了
    	 */
    	screen(screenarrindex,dataindex){
    		this.screenarr[screenarrindex].show=false; 
    		if(this.screenarr[screenarrindex].index == dataindex){
    			return //如果相同
    		}
    		this.screenarr[screenarrindex].index=dataindex; 
    		this.search();
    		this.$emit('gotop',true);
    	},
    },
    created() {
    },
    mounted() {
		this.screenarr[0].qianming = this.$refs.qianming.$el;
		this.screenarr[1].chuzu = this.$refs.chuzu.$el;
    },
    activated(){
		this.screenarr[0].qianming = this.$refs.qianming.$el;
		this.screenarr[1].chuzu = this.$refs.chuzu.$el;
    },
  }
</script>
<style scoped lang='less'>
.mid{
	background: #FFFFFF;
	.title{
		width: 100%;
		height: 58px;
		display: flex;
		justify-content: space-between;
		border-bottom:1px solid #ebebeb;
		padding: 0 0.29rem;
		box-sizing: border-box;		
		.left{
			font-size: 18px;
			color: #333333;
			line-height: 58px;
			img{
				vertical-align: text-top;
			}
		}
		.right{
			display: flex;
			align-items: center;
			div{
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #333333;
				margin-left: 0.39rem;
				img{
					width: 24px;
					height: 24px;
					margin-right: 8px;
				}
			}
		}
	}
	.screen{
		box-sizing: border-box;		
		width: 100%;
		height: auto;
		padding: 7px 0.29rem 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		.mu-raised-button{
			width: 105px;
			margin-bottom: 7px;
		}
		.inputbox{
			display: inline-block;
			margin-bottom: 7px;
			input{
				text-align: center;
				width: 70px;
				margin-left: 6px;
				border-radius: 6px;
			}
			
		}
		.searchbox{
			width: 290px;
			display: inline-block;
			background: #F5F6F8;
			border-radius: 4px;
			padding: 0 0.136rem;
			margin-bottom: 7px;
			.mu-input{
				width: 100%;
				min-height: auto;
				padding-bottom: 4px;
				margin-bottom: 0;
				/deep/.mu-text-field-input{ 
					font-size: 14px;
					color: #A7AEBD;
				}
			}
			
		}
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


.passwordinput{
	/deep/.mu-input-label{
		left:66px;
	}
	/deep/.mu-text-field-input{
		padding-left: 10px;		
	}
}
</style>