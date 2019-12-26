<template>
  <div id="app">

      <!--<transition :name="transitionName">-->
		    <keep-alive>     <!--使用keep-alive会将页面缓存-->
        	<router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
	      </keep-alive>
      <!--</transition>-->
      <!--<transition>-->
      	<router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
      <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      transitionName: 'slide-right' // 默认动态路由变化为slide-right
    }
  },
  watch: {
    '$route'(to, from) {
//    console.log(to.meta.index);
//    console.log(from.meta.index);
      if (to.meta.index < from.meta.index) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  min-height: 100vh;
}
.Router {
  position: absolute;
  width: 100%;
  transition: all .5s ease;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}

.mu-snackbar-top{
	top:10%;
}
</style>
