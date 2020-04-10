<template>
  <div class="home">
    <cube-scroll>
      <i class="cubeic-scan scan"></i>
      <div class="mySearch">
        <!-- <cube-input class="searchInput" v-model="searchB"  ></cube-input> -->
        <input class="searchInput" type="text" v-model="searchB" />
      </div>

      <!-- 占位背景块 -->
      <div class="bgDiv"></div>

      <!-- 轮播图 -->
      <div class="myslide">
        <cube-slide ref="slide" :data="items" @change="changePage">
          <cube-slide-item
            v-for="(item, index) in items"
            :key="index"
            @click.native="clickHandler(item, index)"
          >
            <a>
              <img :src="item.image" class="myImg" />
            </a>
          </cube-slide-item>
        </cube-slide>
      </div>  
      <!-- 轮播图 -->

      <!-- 分类 @change=""-->
      <cube-slide ref="slideList" :data="lists" @change="changeItems" :auto-play="false">
        <cube-slide-item v-for="(list, index) in lists" :key="index">
          <div class="myUl">
            <div
              class="myItem"
              v-for="(itemx,indexx) in list"
              :key="indexx"
              @click="clickClass(itemx.bookType)"
            >
              <img :src="itemx.image" alt />
              {{itemx.label}}
            </div>
          </div>
        </cube-slide-item>
      </cube-slide>
      <!-- 分类 -->
      <!-- 为你推荐 -->
      <div class="recommend">猜你喜欢</div>
      <div class="waterFallPanel">
        <div class="Box" v-for="(item,key) in favorList" :key="key">
          <div :class="key%3==0?'imgClass':'imgClass2'">
            <img class="img" :src="item.img" />
          </div>

          <div class="textPanel">
            <div class="introduce">{{item.introduce}}</div>
            <div class="bookPrice">
              <span style="font-size: 12px;font-weight: bold;">￥</span>{{item.price}}
              <div class="poss">{{item.tag}}</div>
            </div>
            <div class="passPrice">￥{{item.passPrice}}</div>
          </div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
// @ is an alias to /src
import api from '../api.js'
export default {
  data() {
    return {
      items: [
        {
          url: "",
          image: require("../assets/img1.jpg")
        },
        {
          url: "",
          image: require("../assets/img2.jpg")
        },
        {
          url: "",
          image: require("../assets/img3.jpg")
        }
      ],
      lists: [
        [
          {          
            bookType: "online",
            image: require("../assets/icon/online.png"),
            label: "网络文学"
          },
          {
            bookType: "note",     
            image: require("../assets/icon/note.png"),
            label: "小说"
          },
          {
            bookType: "leasure",    
            image: require("../assets/icon/leassion.png"),
            label: "文艺"
          },
          {
            bookType: "business",     
            image: require("../assets/icon/business.png"),
            label: "经营"
          },
          {
            bookType: "scial",      
            image: require("../assets/icon/scial.png"),
            label: "社科"
          },
          {
            bookType: "life",          
            image: require("../assets/icon/life.png"),
            label: "生活"
          }
        ],
        [
          {
            bookType: "scintic",
            image: require("../assets/icon/scintic.png"),
            label: "科教"
          }
        ]
      ],
      //猜你喜欢列表
      favorList:[],
      //搜索绑定值
      searchB: ""
    };
  },
  created(){
    this.getFavorList()
  },
  mounted() {

    const panel = document.querySelector(".home");
    const bodyHeight = window.innerHeight;
    panel.style.height = bodyHeight - 58 + "px";
  },
  methods: {
    //轮播图的改变图片触发的函数
    changePage(current) {},
    //轮播图点击时触发的函数
    clickHandler(item, index) {
      console.log(item, index);
    },
    //分类块切换时的触发函数
    changeItems() {},
    //点击分类按钮触发的函数
    clickClass( bookType) {
      this.$router.push({ name: 'bookClass', params: { bookType: bookType } });
    },
    //获取猜你喜爱列表
    getFavorList(){
      api.getfavorList().then(res=>{
        console.log(res)
        this.favorList=res.data
      }).catch(err=>{

      })
    }
  }
};
</script>
<style  scoped>
.home {
  height: auto;
  background-color: rgb(247, 247, 247);
}
/* 轮播图 */
.myImg {
  width: 100%;
  height: 25vh;
  border-radius: 10px;
}
/* 扫描二维码 */
.scan {
  float: left;
  margin-left: 25px;
  margin-top: 15px;
  color: rgb(184, 184, 184);
}
/* s搜索框块 */
.mySearch {
  padding: 10px 70px 0px 70px;
  background-color: rgba(36, 34, 32, 0.8);
}
/* 搜索输入框 */
.searchInput {
  width: 100%;
  height: 4px;
  border-radius: 15px;
  font-size: 14px;
  padding: 12px 10px;
}
/* 搜索聚焦样式 */
.searchInput:focus {
  outline: 0;
  border-color: rgb(245, 189, 105);
}
/* 背景占位 */
.bgDiv {
  width: 100vw;
  height: 18vh;
  background-color: rgba(36, 34, 32, 0.8);
  position: absolute;
  z-index: -1;
}
/* 轮播按钮 */
.myslide {
  padding: 15px;
}
.myUl {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 14px;
}
/* 轮播按钮图标 */
.myUl img {
  width: 8vw;
  height: 8vw;
  display: block;
  margin: 15px;
}
.myItem {
  margin:10px 20px;
}
/* 为你推荐 */
.recommend {
  padding: 10px 0;
  font-size: 20px;
}
/* 瀑布流 */
.waterFallPanel {
  -moz-column-gap: 0px; /* Firefox */
  -webkit-column-gap: 0px; /* Safari and Chrome */
  column-gap: 0px;
  -moz-column-count: 2; /* Firefox */
  -webkit-column-count: 2; /* Safari and Chrome */
  column-count: 2;
}

.Box {
  margin: 0px 0px 10px 10px;
  width: 46vw;
  background: #fff;
  border-radius: 10px;
  /* box-shadow: 1px 0px 5px #afafaf; */
  height: 100%;
  overflow: auto;
}
.Box .imgClass {
  height: 200px;
  overflow: hidden;
}
.Box .imgClass2 {
  height: 100px;
  overflow: hidden;
}
.Box .img {
  width: 100%;
  border-radius: 10px 10px 0 0;
}
.introduce {
  font-size: 12px;
}
.bookPrice {
  display: flex;
  align-items: center;
  color: rgb(255, 36, 7);
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding-top: 5px;
}
.bookPrice .poss {
  border: 1px solid rgb(247, 131, 115);
  color: rgb(255, 36, 7);
  font-size: 9px;
  padding: 1px 2px 0px 2px;
  border-radius: 3px;
  margin-left: 5px;
  display: inline-block;
  
}
.home .textPanel {
  padding: 8px;
}
.textPanel .passPrice{
  color: rgb(131, 131, 131);
  text-decoration:line-through;
  font-size: 14px;
  margin-top: 5px;
}
</style>