
<template>
  <div class="containerbox">
   <!--头部-->
  	<div class="header">
  		<img src="../assets/img/icon_return.svg" alt="" @click='$router.go(-1)'/>
  		用户资料修改
  		<div class="save" @click='dialog = true'>保存</div>
  	</div>
  	<div class="mid" v-if="JSON.stringify(agementdata) != '{}'">
  		<div class="top">{{JSON.stringify(agementdata) != '{}'?agementdata.address:''}}</div>
  		<div class="info">
  			<div class="title">基本资料<img src="../assets/img/icon_bluerectangle.svg" alt="" /></div>
  			<div class="list">
  				<div class="left">住房面积</div>
  				<div class="right"><input type="text" placeholder="请输入当前住房面积" v-model='agementdata.area'/></div>
  			</div>
  			<div class="list">
  				<div class="left">用户姓名</div>
  				<div class="right"><input type="text" placeholder="请输入用户姓名" v-model='agementdata.hu_list[0].name'/></div>
  			</div>
  			<div class="list">
  				<div class="left">联系方式</div>
  				<div class="right"><input type="text" placeholder="请输入用户联系方式" v-model='agementdata.hu_list[0].phone'/></div>
  			</div>
  			<div class="" v-for='(item,index) in agementdata.hu_list' :key='index' v-if="index > 0">
  				<div class="list">
	  				<div class="left">用户姓名</div>
	  				<div class="right">
	  					<input type="text" placeholder="请输入用户姓名" v-model='item.name'/>
	  					<img src="../assets/img/icon_delete.svg" alt="" @click="agementdata.hu_list.splice(index,1)"/>
	  				</div>
	  			</div>
	  			<div class="list">
	  				<div class="left">联系方式</div>
	  				<div class="right">
	  					<input type="text" placeholder="请输入用户联系方式" v-model='item.phone'/>
	  					<img src="../assets/img/icon_delete.svg" alt="" @click="agementdata.hu_list.splice(index,1)"/>
	  				</div>
  				</div>
  			</div>
  			<div class="list">
  				<div class="left"></div>
  				<div class="right" @click='agementdata.hu_list.push({name:"",phone:""})'>增加一条联系方式 <img src="../assets/img/icon_plus.svg" alt="" /></div>
  			</div>
  		</div>
  		<div class="info">
  			<div class="title">其它资料<img src="../assets/img/icon_bluerectangle.svg" alt="" /></div>
  			<div class="list">
  				<div class="left">身份证号</div>
  				<div class="right"><input type="text" placeholder="请输入用户身份证号码" v-model="agementdata.identity"/></div>
  			</div>
  			<div class="textarealist">
  				<div class="left">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</div>
  				<div class="right"><textarea type="text" placeholder="填写备注" v-model="agementdata.remark"/></div>
  			</div>

  		</div>
  	</div>
  	<mu-dialog title="提示" width="360" :open.sync="dialog">
	    	确定修改？
	    <mu-button slot="actions" flat color="primary" @click="save">确定</mu-button>
	  </mu-dialog>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
      	dialog:false,
       	agementdata:{},
       	villagearrindex:0,
      }
    },
    watch: {

    },
    computed: {},
    methods: {
    	/**
    	 * 保存
    	 */
    	save(){
    		const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    		let result = true;
    		if(!this.agementdata.area){
    			this.$toast.error('请输入当前住房面积');
    			return
    		}
    		for (var index = 0; index < this.agementdata.hu_list.length; index++) {
          if (!this.agementdata.hu_list[index].name||!this.agementdata.hu_list[index].phone) {
          	result = false;
          	break ;
          }
        }
    		if(!result){
    			this.$toast.error('请完善联系方式');
    			this.dialog = false;
    			return
    		}
    		
    		if(this.agementdata.identity && !reg.test(this.agementdata.identity)){
    			this.$toast.error('请输入正确身份证号');
    			this.dialog = false;
    			return
    		}
    		
    		this.agementdata.is_edit = 1;
    		let data = JSON.parse(localStorage.getItem('data')), length = data[this.villagearrindex].list.length;
    		for(let i = 0 ; i < length ; i++){
    			if(data[this.villagearrindex].list[i].id == this.agementdata.id){
    				data[this.villagearrindex].list[i] = this.agementdata;
    				break ;
    			}
    		}
    		localStorage.setItem('data',JSON.stringify(data));
    		localStorage.setItem('isrefresh',1);
    		this.dialog = false;
    		this.$router.go(-1);
    	},
    },
    activated(){
	 		this.agementdata = this.$route.query.agementdata;
    	this.villagearrindex = this.$route.query.villagearrindex;
    },
    created() {
    },
    mounted() {
    	this.agementdata = this.$route.query.agementdata;
    	this.villagearrindex = this.$route.query.villagearrindex;
    }
  }
</script>
<style scoped lang='less'>
.containerbox{
	padding-top: 58px;
	box-sizing: border-box;
}
.header{
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
	img{
		position: absolute;
		left: 0.29rem;
		top: 19px;
	}
	.save{
		position: absolute;
		font-size: 18px;
		color: #3AB0FF;
		top: 0;
		right: 0.29rem;
	}
}
.mid{
	width: 6.7rem;
	min-width: 300px;
	margin: 0 auto;
	padding-top: 14px;
	.top{
		height: 54px;
		display: flex;
		align-items: center;
		position:relative;
		background: #FFFFFF;
		padding-left: 20px;
		box-sizing:border-box;
		font-size: 16px;
		color: #333333;
		&:before{
			content: '';
			position:absolute;
			top: 12px;
			left: 0;
			height: 30px;
			width: 3px;
			background: #3AB0FF;
		}
	}
	.info{
		background: #FFFFFF;
		margin: 10px 0;
		padding: 15px 20px;
		box-sizing: border-box;
		.title{
			font-size: 16px;
			color: #333333;
			img{
				vertical-align: text-top;
			}
		}
		.list{
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ebebeb;
			box-sizing: border-box;
			height: 54px;
			font-size: 16px;
			color: #333333;
			.left{
				width: 70px;
				margin-right: 0.488rem;
			}
			.right{
				flex: 1;
				position: relative;
				input{
					width: 80%;
					border: none;
				}
				img{
					position: absolute;
					top: 0;
					right: 0.195rem;
					width: 24px;
					height: 24px;
				}
				textarea{
					width: 100%;
				}
			}
		}
		.textarealist{
			display: flex;
			margin-top: 10px;
			.left{
				width: 70px;
				margin-right: 0.488rem;
			}
			.right{
				flex: 1;
				textarea{
					width: 100%;
				}
			}
			
		}
	}
}
</style>