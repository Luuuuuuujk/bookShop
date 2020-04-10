<template>
  <div id="Login">
    <div class="myForm">
      <img src="../assets/head.jpg" class="myHead" alt="">
      <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
export default {
  data() {
    return {
      model: {
        //绑定的数据
        username: "13138117346",
        password: "125800"
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
            trigger: "blur",
            messages: {
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
              type: "password",
              eye: { open: false, reverse: false }
            },
            rules: {
              //校验规则
              required: true
            },
            trigger: " blur",
            messages: {
              required: "密码不能为空！"
            }
          },
          //确认按钮
          {
            type: "submit",
            label: "登陆"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler() {
      api
        .login(this.model)
        .then(data => {
          console.log(data);
          //判断状态码是否正确
          if (data.meta.status !== 200) {
            //失败弹出层
            this.toast = this.$createToast({
              txt: data.meta.msg,
              type: "error"
            });
            this.toast.show();
            
          } else if (data.meta.status === 200) {
            //成功之后弹出层
            this.toast = this.$createToast({
              txt: data.meta.msg,
              type: "correct",
              time: 1000
            });
            this.toast.show();
            this.$store.commit('settoken',data.meta.token)
            window.sessionStorage.setItem('token',data.meta.token)
            setTimeout(()=>{
              this.$router.push("/index")
            },1000)
            
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
/* .myForm{ 
  margin-top: 20vh;
} */
.myHead{
  width: 10vh;
  height: 10vh;
  margin: 30px 0;
  border-radius: 50px;
}
</style>