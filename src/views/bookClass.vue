<template>
  <div id="bookClass">
    <cube-scroll class="letfTabs" v-if="tabShow">
      <ul>
        <li
          v-for="(item,index) in tabsList"
          :class="item.active?'active':''"
          :key="index"
          @click="makeActive(item)"
        >{{item.label}}</li>
      </ul>
    </cube-scroll>

    <cube-scroll class="rightTabs">
      <!-- 轮播图 -->
      <div class="myslide">
        <cube-slide ref="slide" :data="items">
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

      <ul>
        <li v-for="(item,index) in dataList" :key="index">
          <div class="listBox">
            <div class="leftItem">
              <img :src="item.img" width="100%" height="100%" />
            </div>
            <div class="rightItem">
              <div class="titleX">{{item.title}}</div>
              <div class="priceX">
                <span>￥</span>
                {{item.price}}
              </div>
              <div class="detailX">月销量：{{item.sellNum}} 点评：{{item.commentNum}}条</div>
            </div>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>


<script>
import api from "../api.js";
export default {
  data() {
    return {
      tabShow:true,
      tabsList: [],
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
      dataList: []
    };
  },
  created() {
       this.getTablist()  
       this.getDataList()
  },
  mounted() {
    this.autoHeight();

  },
  methods: {
    //菜单激活方法
    makeActive(item) {
      this.tabsList.forEach(item => {
        item.active = false;
      });
      item.active = true;
      //获取session里面的bookType
      if (this.$route.params.bookType) {
        window.sessionStorage.setItem("bookType", item.bookIndex);
      }
      //刷新列表
      this.getDataList();
    },
    //自动获取滚动区的高度
    autoHeight() {
      // const leftP=document.
      //窗口自适应
      const leftP = document.querySelector(".letfTabs");
      const rightP = document.querySelector(".rightTabs");
      const bodyHeight = window.innerHeight;
      leftP.style.height = bodyHeight - 58 + "px";
      rightP.style.height = bodyHeight - 58 + "px";
    },
    //进来加载active
    activeMethod() {
      if (this.$route.params.bookType) {
        window.sessionStorage.setItem("bookType", this.$route.params.bookType);
      }
      const bookType = window.sessionStorage.getItem("bookType");
      // console.log(this.tabsList)
      this.tabsList.forEach(item => {
        if (item.bookIndex == bookType) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    //加载datalist
    getDataList() {
      const type = window.sessionStorage.getItem("bookType");
      api.getTypeDataLsit(type).then(res => {
          console.log(res);
          this.dataList=res.data
          //判断状态码是否正确
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTablist(){
      console.log(1)
      api.getTypeTabLsit().then(res => {
          console.log(res);
          res.data.forEach(item=>{
            item.active=false
          })
          this.tabsList=res.data
          //判断状态码是否正确
        }).then(()=>{
          //解决异步问题
          this.activeMethod()
        })
        .catch(error => {
          console.log(error);
        });
        return true
    }
  }
};
</script>
<style scoped>
#bookClass {
  display: flex;
}
#bookClass .letfTabs {
  /* width: 20vw; */
  left: 0;
}

.letfTabs ul {
  background-color: #ededed;
  width: 20vw;
  /* height: 90vh; */
}
.letfTabs li {
  /* border:1px solid black; */
  font-size: 12px;
  color: #333;
  padding: 18px 13px;
}
#bookClass .active {
  background-color: rgb(248, 248, 248);
  color: #e8864c;
}
/* 瀑布流布局 */
#bookClass .rightTabs {
  left: 0;
  width: 80vw;
  padding-top: 5px;
  background-color: rgb(248, 248, 248);
}
#bookClass .rightTabsFull {
  left: 0;
  width: 100%;
  padding-top: 5px;
  background-color: rgb(248, 248, 248);
}
/*右边列表快 */
#bookClass .listBox {
  display: flex;
  height: 120px;
  width: 90%;
  margin: 5px 5px;
  background: #fff;
  box-shadow: 1px -1px 5px #ccc;
  border-radius: 7px;
  padding: 15px 10px;
}

#bookClass .leftItem {
  width: 40%;
}
#bookClass .rightItem {
  width: 60%;
  margin-left: 5px;
}
#bookClass .titleX {
  font-size: 14px;
  text-align: left;
}
#bookClass .priceX {
  color: rgb(255, 36, 7);
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 20px;
  text-align: left;
}
#bookClass .detailX {
  font-size: 12px;
  text-align: left;
  color: rgb(141, 141, 141);
}
.priceX span {
  font-size: 14px;
}
/* 轮播图 */
#bookClass .myImg {
  width: 100%;
  height: 20vh;
  border-radius: 7px;
}

#bookClass .myslide {
  padding: 3%;
}
/* .Box1{
  margin:0px 0px 10px 10px;
  height: 21vh;
  width: 37vw;
  background: rgb(224, 90, 90);
  break-inside: avoid;
} */
</style>