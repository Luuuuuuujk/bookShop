<template>
  <div id="index">
    <!--  -->
    <div class="myTag">
      <cube-tab-bar v-model="selectedLabelSlots" show-slider>
        <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
          <div class="inBG" @click="clickMe(item.path,item.index)">
            <p>
              <i slot="icon" :class="item.icon"></i>
            </p>
            <span class="myLabel">{{item.label}}</span>
          </div>
        </cube-tab>
      </cube-tab-bar>
    </div>
    <transition class="theSlider" :name="slideright">
      <router-view class="Router"></router-view>
    </transition>

    <!-- <cube-tab-panels v-model="selectedLabelSlots">
    <cube-tab-panel v-for="item in tabs" :label="item.label" :key="item.label">
      <router-view class="Router"></router-view>
    </cube-tab-panel>
    </cube-tab-panels>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //动画名字
      slideright: "slide-left",
      selectedLabelSlots: "主页",
      indexx: null,
      tabs: [
        {
          label: "主页",
          icon: "cubeic-home",
          path: "/home",
          index: 1
        },
        {
          label: "喜欢",
          icon: "cubeic-like",
          path: "/like",
          index: 2
        },
        {
          label: "购物车",
          icon: "cubeic-mall",
          path: "/shopCar",
          index: 3
        },
        {
          label: "订单",
          icon: "cubeic-person",
          path: "/order",
          index: 5
        },
        {
          label: "我的",
          icon: "cubeic-person",
          path: "/identety",
          index: 4
        }
      ]
    };
  },
  watch: {
    indexx(newv, oldv) {
      console.log(newv);
      console.log(oldv);
      if (newv > oldv) {
        this.slideright = "slide-left";
      } else {
        this.slideright = "slide-right";
      }
    }
  },
  methods: {
    clickMe(path, index) {
      if (path == "/" + this.$route.name) {
        return;
      } else {
        setTimeout(() => {
          this.$router.push(path);
        }, 90);
      }
      this.indexx = index;
    }
  },
  mounted(){
    const leftP=document.querySelector('.myTag')
  }
};
</script>
<style scope>
#index .myTag {
  position: fixed;
  width: 100vw;
  bottom: 0px;
  height: 58px;
  font-size: 22px;
  z-index: 999;
  opacity: 1;
  box-shadow: 0px -1px 10px #888888;
  background-color: #fff;
}
#index .myLabel {
  font-size: 14px;
}
.theSlider {
  position: relative;
  
}
#index .Router {
  position: absolute;
  width: 100%;
  transition: all 0.2s ease;
}
.slide-left-enter,.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
.slide-left-leave-active,.slide-right-enter {
  
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}



</style>