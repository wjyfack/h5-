<template>
    <div class="problem">
        <div class="problem-item" v-for="(item,index) in questionList" :key="key">
            <div class="head" @click="toOpen(index)">
                <div class="title van-ellipsis">{{item.title}}</div>
                <img src="../../../static/imgs/arrow.png" alt="" class="img" :class="{'act': active == index}">
            </div>
            <div class="cont" :class="{'active': active == index}">
                <div class="con">
                    <wxParse :content="item.content" />
                </div>
                <div class="user">
                    <div class="item" >
                        <img src="../../../static/imgs/p_use.png" alt="" class="gg_img">
                        <div class="gd">有用</div>
                    </div>
                    <div class="item">
                        <img src="../../../static/imgs/p_no_use.png" alt="" class="gg_img">
                        <div class="">没用</div>
                    </div>
                </div>
            </div>
        </div>
        <van-toast id="van-toast" />
    </div>
</template>

<script>
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
import Toast from '../../../static/vant/toast/toast';
import wxParse from 'mpvue-wxparse'
export default {
    components: {
        wxParse
    }
    ,data(){
        return{
            active: 0
            ,questionList: []
        }
    }
    ,methods: {
        toOpen(index){
            this.active = index
        }
        ,getData() {
            fly.post('/?v=V1&g=Common&c=Help&a=getHelpfaqList'+Fun.getParam(),{
                help_type: 1
            })
                .then((res)=> {
                    if(res.code == 0) {
                        this.questionList = res.data.list
                    } else {
                        Toast(res.message)
                    }
                })
        }
    }
    ,mounted() {
        this.getData()
    },
}
</script>
<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.problem {
    background: #f9f9f9;
    &-item {
        padding: 10px 20px;
        margin-bottom: 10px;
        
        background: #ffffff;
        .head {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color:#4C5264;
            .title {
                flex: 1;
            }
            .img {
                width:  6px;
                height: 11px;
                -moz-transform: rotate(90deg);
                -webkit-transform:rotate(90deg);
                transform: rotate(90deg);
            }
            .act {
                -moz-transform: rotate(-90deg);
                -webkit-transform:rotate(-90deg);
                transform: rotate(-90deg);
            }
        }
        
        .cont {
            display: none;
            flex-direction: column;
            .con {
                color:#828282;
                font-size: 12px; 
                min-height: 30px;
            }
            .user {
                display: flex;
                width:100%;
                .item {
                    width: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color:#BCC5D3;
                    font-size: 12px;
                    .gg_img {
                        width:16px;
                        height: 16px;
                        margin-right: 10px;
                    }
                    .gd {
                        color:#5887F9;
                    }
                }
            }
        }
        .active {
            display: flex;
        }
    }
}
</style>
