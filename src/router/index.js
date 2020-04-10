import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Register = ()=> import('../views/Register.vue')
const Login = ()=> import('../views/Login.vue')
const user = ()=> import('../views/user.vue')
const index = ()=> import('../views/index.vue')
const home = ()=> import('../views/home.vue')
const shopCar = ()=> import('../views/shopCar.vue')
const identety = ()=> import('../views/identety.vue')
const like = ()=> import('../views/like.vue')
const bookClass = ()=> import('../views/bookClass.vue')
const routes = [
  {
    path: '/',
    name: 'user',
    redirect:'/Login',
    component: user,
    children:[
      {
        path: '/Register',
        name: 'Register',
        component: Register
      },
      {
        path: '/Login',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    redirect:'/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: home
      },
      {
        path: '/shopCar',
        name: 'shopCar',
        component: shopCar
      },
      {
        path: '/identety',
        name: 'identety',
        component: identety
      },
      {
        path: '/like',
        name: 'like',
        component: like
      },
      {
        path: '/bookClass',
        name: 'bookClass',
        component: bookClass
      },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
