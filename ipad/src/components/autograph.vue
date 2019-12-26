/**
*  创建者:菜菜
*  创建时间:2019/5/9 11:04
*  项目:ipad
*  文件名:autograph
*/
<template>
  <div class="containerbox">
  	<!--头部-->
  	<div class="header">
  		<img src="../assets/img/icon_return.svg" alt="" @click='$router.go(-1)'/>
  		发放签名
  	</div>
  	<div class="mid">
  		<div class="top">{{topname != ''?topname.address+'，'+topname.name:''}}</div>
  		<div class="autograph">
  			<div class="title">签名区域<img src="../assets/img/icon_bluerectangle.svg" alt="" /></div>
  			<div class="canvas">
  				<canvas id="canvas" :width="canvaswidth" height="400"></canvas>
  			</div>
  			<div class="bottom">
  				<mu-button @click='clear'>重新签名</mu-button>
  				<mu-button color="primary" @click='savedialog = true'>确认签名</mu-button>
  			</div>
  		</div>
  	</div>
  	
  	<mu-dialog title="设备横竖提示" width="360" :open="dialog">
	    	签名时请不要切换设备的横竖屏
	    <mu-button slot="actions" flat color="primary" @click="dialog = false">确定</mu-button>
	  </mu-dialog>
	  
	  <mu-dialog title="保存提示" width="360" :open.sync="savedialog">
	    	确定保存签名？
	    <mu-button slot="actions" flat color="primary" @click="save">确定</mu-button>
	  </mu-dialog>
  </div>
</template>

<script>
	var draw;
	var preHandler = function(e){e.preventDefault();}
//画的实例
	class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')
        //获取元素上下位置
//      console.log(this.canvas.offsetLeft,this.canvas.offsetTop)
//      this.stage_info = this.canvas.getBoundingClientRect()
				this.stage_info = {left:this.canvas.offsetLeft,top:this.canvas.offsetTop}
//      console.log(this.stage_info)
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    init(width) {
			this.width = width
	    var that = this; 
	    this.canvas.addEventListener('touchstart', function(event) {
	        document.addEventListener('touchstart', preHandler, false); 
	        that.drawBegin(event)
	    })
	    this.canvas.addEventListener('touchend', function(event) { 
	        document.addEventListener('touchend', preHandler, false); 
	        that.drawEnd()
	    })
	    //初始化画板 清空所有东西
	    this.clear()
    }
    drawBegin(e) {
//  	console.log('我开始了')
	    var that = this;
	    window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
	    this.cxt.strokeStyle = "#000"
	    this.cxt.beginPath()
	    //初始位置
	    this.cxt.moveTo(
	        e.changedTouches[0].clientX - this.stage_info.left,
	        e.changedTouches[0].clientY - this.stage_info.top
	    )
	    this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
	    this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
	    canvas.addEventListener("touchmove",function(){
	        that.drawing(event)
	    })
    }
    drawing(e) {
//  	console.log('我正在画')
        this.cxt.lineTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
        this.cxt.stroke()
    }
    drawEnd() {
//  	console.log('我停止了')
        document.removeEventListener('touchstart', preHandler, false); 
        document.removeEventListener('touchend', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        //canvas.ontouchmove = canvas.ontouchend = null
    }
    clear() {
      this.cxt.clearRect(0, 0, this.width, 400)
    }
    save(){
      return canvas.toDataURL("image/png")
    }
	}
  export default {
    components: {},
    props: {},
    data() {
      return {
      	villagearrindex:0,//小区的索引
      	agementdata:{},//签名的用户信息
      	dialog:false,//设备横竖禁止提示
      	savedialog:false,//是否保存提示
      	canvaswidth:300,
      	interval:null,
		  img:null,
		  topname:"",
      }
    },
    watch: {

    },
    computed: {
    	
    },
    methods: {
    	init(){
    		this.agementdata = this.$route.params.agementdata;
			//console.log('用户信息',this.agementdata);
	    	this.villagearrindex = this.$route.params.villagearrindex;
	    	this.canvaswidth = document.getElementsByClassName('canvas')[0].clientWidth;
	    	draw = new Draw('canvas');
	      draw.init(this.canvaswidth);
	      //创建定时器 监听屏幕的大小变化 
	      let that = this;
//	      this.interval = setInterval(function(){
////					console.log('我是定时器');
//	      	if(document.getElementsByClassName('canvas')[0].clientWidth!=that.canvaswidth){
//	      		if(!that.dialog){
//	      			that.dialog=true;
//	      		}
//	      	}
//				}, 2000);
	      
    	},
    	clear(){
        draw.clear();
	    },
	    save(){
            this.img = draw.save();
    		// let data = JSON.parse(localStorage.getItem('data')), length = data[this.villagearrindex].list.length;
    		// for(let i = 0 ; i < length ; i++){
    		// 	if(data[this.villagearrindex].list[i].id == this.agementdata.id){
    		// 		data[this.villagearrindex].list[i].img = this.img;
    		// 		data[this.villagearrindex].list[i].vote_type = 1;
    		// 		data[this.villagearrindex].list[i].start_time = (new Date()).getTime();
    		// 		break ;
    		// 	}
    		// }
    		// data[this.villagearrindex].is_user_num++;
    		// localStorage.setItem('data',JSON.stringify(data));
    		// console.log('数据内容',data);
			// localStorage.setItem('isrefresh',1);
			this.savedialog = false;
			// this.$router.go(-1);
			this.$router.push({path:"/Barcode",query:{img:this.img,villagearrindex:this.villagearrindex}});
	    },
    },
    created() {
    	
    },
    activated(){
//			this.init();
    },
    mounted() {
		this.init();
		this.topname = JSON.parse(localStorage.getItem('agementdata'))
    },
    beforeRouteLeave(to,from,next){
    	clearInterval(this.interval)
    	next();
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
}
.mid{
	padding: 0 0.29rem;
	box-sizing: border-box;
	margin-top: 10px;
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
	.autograph{
		margin-top: 10px;
		background: #FFFFFF;
		padding: 20px;
		box-sizing: border-box;
		.title{
			font-size: 16px;
			color: #333333;
			
			img{
				vertical-align: text-top;
			}
		}
		.canvas{
			margin: 16px 0;
			width: 100%;
			height: 400px;
			canvas{
				border: 1px solid #C8CFDC;
				box-sizing: border-box;
			}
		}
		.bottom{
			display: flex;
			justify-content: flex-end;
			button{
				margin-left: 30px;
			}
		}
	}
}
</style>