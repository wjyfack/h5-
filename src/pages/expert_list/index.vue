<template>
    <div class="expert">
        <a :href="'../person_home/main?id='+item.user_id" class="expert-item" v-for="(item, index) in expertList" :key="key">
            <img :src="item.user_picture" alt="" class="avatar">
            <div class="cont">
                <div class="head">
                    <div class="lf">
                        <div class="name">{{item.nick_name}}</div>
                        <div class="brand" v-for="(its,indx) in item.brand" :key="kdj">
                            <img src="../../../static/imgs/p_gong.png" alt="" class="img" v-if="its == 2">
                            <img src="../../../static/imgs/p_zhuan.png" alt="" class="img" v-if="its == 3">
                            <img src="../../../static/imgs/p_zuo.png" alt="" class="img" v-if="its == 1">
                        </div>
                        
                    </div>
                    <div class="rt" v-if="item.region_shi != ''">
                        <img src="../../../static/imgs/my_dizhi.png" alt="" class="img">
                        <div>{{item.region_shi}}</div>
                    </div>
                </div>
                <div class="hao">
                    <div class="hao-item">
                        好评率 <div class="red">{{item.pingjialv}}%</div>
                    </div>
                     <div class="hao-item">
                        诚信度 <div class="red">{{item.xinyongdu}}%</div>
                    </div>
                </div>
                <div class="good">
                    擅长：
                    <div class="gi" v-for="(items,indexs) in item.cats_name" :key="kkk">{{items}}</div>
                </div>
            </div>
        </a>   
    </div>
</template>
<script>
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
export default {
    data() {
        return {
            active: 0
            ,expertList: []
        }
    }
    ,methods: {
        getExpertData() {
            fly.post('/?v=V1&g=Doctor&c=Expert&a=getExpertList'+Fun.getParam()).then((res) =>{
                if(res.code == 0) {
                    let list = res.data.list
                    for(let i in list) {
                        list[i].brand = Fun.getBrand(list[i].user_types)
                    }
                    this.expertList = this.expertList.concat(list)
                }
            })
        }
        
       
    }
    ,mounted() {
         this.getExpertData()
    }
}
</script>
<style lang="less" scoped>
.expert {
 background:#F9F9F9;
.expert-item{
    background: #ffffff;
    padding: 10px 20px;
    margin-bottom: 10px;
    display: flex;
    .avatar {
        width: 58px;
        height: 58px;
        border-radius: 50%;
    }
    .cont {
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
         padding-left: 10px;
        .head {
            display: flex;
            justify-content: space-between;
           
            .lf {
                display: flex;
                align-items: center;
                .name {color:#4C5264;font-size: 16px;margin-right: 5px;}
                .brand {
                    display: flex;
                    .img {width:22px;height: 22px; margin-right: 5px;}
                }
                
            }
            .rt {
                display: flex;
                align-items: center;
                color:#8B8B8B;
                font-size: 10px;
                .img {width: 8px;height: 10px;margin-right: 5px;}
            }
        }
        .hao{
            display: flex;
            color:#8B8B8B;
            font-size: 10px;
            padding: 5px 0;
            .hao-item {
                display: flex;
                align-items: center;
                min-width: 75px;
                .red {
                    color:#FC5F6B;
                    margin-left: 5px;
                }
            }
            
        }
        .good {
            display: flex;
            color:#8B8B8B;
            font-size: 10px;
            .gi {margin-left: 5px;}
        }
    }
  }
}

</style>

