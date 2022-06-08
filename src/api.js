import axios from 'axios'
import store from './store'
import router from './router';
axios.defaults.baseURL='http://192.168.31.103:8080/'
// axios.defaults.baseURL='http://192.168.1.100:8080/'
axios.defaults.headers['Content-Type']='application/json'

//axios 请求拦截器 请求的时候需要用token授权，才可以使用相对应的功能
axios.interceptors.request.use(config=>{
    //在返回的config对象里面有一个请求头head，在里面要加上一个字段Authorization，值为token（后端必须有设置token验证）
    config.headers.Authorization=window.sessionStorage.getItem('token') 
    //最后必须返回一个config
    return config
  });

  
// axios接收拦截器
axios.interceptors.response.use(response=>{
    if(response.status==200){
        if(response.data.meta.code==-1){
            //如果为-1，则过期，需要重新登陆清空vuex的token还有localstore的token
            store.commit('settoken','')
            sessionStorage.removeItem('token')
            //跳转到login页面
            router.replace('/Login')
        }
        return response
    }
    // console.log(response)
    return response
})

//post 请求
export function post(url,params){
    return new Promise((resolve,reject)=>{
        axios({
            method:'post',
            url,
            data:params
        }).then((res)=>{
            resolve(res.data)
        }).catch((error)=>{
            reject(error.response)
            if(error.response){
                alert('error')
            }
            else{
                alert('其他错误！！')
            }
        })
    })
}

// //get 请求
// export function get(url,params){
//     return new Promise((resolve,reject)=>{
//         axios({
//             method:'get',
//             url,
//             data:params
//         }).then((res)=>{
//             resolve(res.data)
//         }).catch((error)=>{
//             reject(error.response)
//             if(error.response){
//                 alert('error')
//             }
//             else{
//                 alert('ELSE')
//             }
//         })
//     })
// }

//调用接口
export default{
    //注册接口
    register(params){
        return post('users/user/Register',params)
    },
    //登陆接口
    login(params){
        return post('users/user/Login',params)
    },
    //获取分类页面的数据列表
    getTypeDataLsit(params){
        return post('classifyData/getList/getTypeList',params)
    },
    //获取分类标签的列表数据
    getTypeTabLsit(params){
        return post('classifyData/getList/getTypeTabList')
    },
    //获取猜你喜爱列表
    getfavorList(params){
        return post('classifyData/getList/getfavorList')
    },
}