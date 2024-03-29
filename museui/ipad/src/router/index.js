import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import autograph from '@/components/autograph'
import edit from '@/components/edit'
import notask from '@/components/notask'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        index:1,
        keepAlive:true
      }
    },
    {
      path:'/login',
      name:'登录',
      component:login,
      meta:{
        index:11
      }
    },
    {
      path:'/autograph/:villagearrindex/:agementdata',
      name:'签名',
      component:autograph,
      meta:{
        index:2
      }
    },
    {
    	path:'/edit',
    	name:'修改',
    	component:edit,
    	meta:{
    		index:2
    	}
    },
    {
    	path:'/notask',
    	name:'没有任务',
    	component:notask,
    	meta:{
    		index:2,
    		keepAlive:true
    	}
    }
  ]
})
