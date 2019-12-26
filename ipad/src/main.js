// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import museUi from 'muse-ui';
Vue.use(museUi);
import './assets/css/reset.css' //重置样式
require('amfe-flexible/index.js')
import 'muse-ui/dist/muse-ui.css';
import Toast from 'muse-ui-toast';
Vue.use(Toast,{
	position: 'top',               // 弹出的位置
	time: 2000,                       // 显示的时长
	closeIcon: 'x',               // 关闭的图标
	close: true,                      // 是否显示关闭按钮
	successIcon: '',      // 成功信息图标
	infoIcon: '',                 // 信息信息图标
	warningIcon: '',     // 提醒信息图标
	errorIcon: ''              // 错误信息图标
});
import {get,post} from './assets/js/httpRequestUtil'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.timeout = 0;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

/* eslint-disable no-new */
import Vconsole from 'vconsole';
//const vConsole = new Vconsole();
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
