import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'




// 挂载路由导航守卫
router.beforeEach((to,from ,next)=>{
  //to将要访问的路径
  //from 从哪个路径而来
  //next放行 next('/login')强制跳转至login
  if(to.path==='/Login') return next();
  //获取token 
  const tokenstr=window.sessionStorage.getItem('token')
  if(!tokenstr) return next('/Login')
  else next()
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
