<template>
    <div id="Register">
            <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
    </div>
</template>

<script>
import api from '../api.js'
export default {
  data() {
    return {
      model: {
        //绑定的数据
        username: "",
        password: ""
      },
      schema: {
        fields: [
          //用户名配置
          {
            type: "input",
            modelKey: "username",
            label: "账号：",
            props: {
              placeholder: "请输入账号",
              clearable: true
            },
            rules: {
              //校验规则
              required: true,
              min: 3,
              max: 15
            },
            trigger: 'blur',
            messages:{
              required: "用户名不能为空！",
              min: "用户名长度不能小于3个！",
              max: "用户名长度不能大于15个！"
            }
          },
          //密码配置
          {
            type: "input",
            modelKey: "password",
            label: "密码：",
            props: {
              placeholder: "请输入密码",
              type:'password',
              eye: true
            },
            rules: {
              //校验规则
              required: true,
            },
            trigger: 'blur',
            messages:{
              required: "密码不能为空！",
            }
          },
          //确认按钮
          {
              type:'submit',
              label:'注册',
              
          }
        ]
      }
    };
  },
  methods: {
     submitHandler() {
          api.register(this.model).then((data)=>{
            console.log(data)
          }).catch((error)=>{
            console.log(error)
          })
        
    }
  }
};
</script>