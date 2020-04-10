<template>
    <div id="shopCar">
        <div class="cartarr" v-for="(item,index) in cartarr" :key="index">
            {{item.title}}
            <div>
                <i class="cubeic-add" @click="item.cartcount++"></i>
                <span>{{item.cartcount}}</span> 
                <i class="cubeic-remove" @click="item.cartcount--"></i>
            </div>
        </div>
        <cube-button>下单</cube-button>
        <cube-button>清空购物车</cube-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cartarr:[
                {
                    title:'斗破苍穹完整版',
                    cartcount:6
                },{
                    title:'舞动乾坤完整版',
                    cartcount:4
                }
            ]
        }
    }
}
</script>
<style scoped>

</style>