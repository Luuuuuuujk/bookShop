import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token:''
    },
    mutations:{
        settoken(state,token){
            state.token=token
        }
    },
    actions:{

    },
    getters:{

    }
})