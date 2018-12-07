<template>
<div class="consult">
    <div class="consult-item van-hairline--bottom" v-for="(item, index) in articleList" :key="key">
        <div class="con">
            <div class="cont">
                <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                <div class="mini">
                    <div>{{item.like_count}}收藏</div>
                    <div>{{item.read_count}}评论</div>
                </div>
            </div>
            <img :src="item.list_pic" alt="" class="img"> 
        </div>
        <div class="btn-list">
            <div @click="zhangli(item.id)" class="btn-item" v-if="item.read_count_reward == 1">兑换阅读量</div>
            <a :href="'../detail_article/main?id='+item.id" class="btn-item">文章详情</a>
        </div>
    </div>
</div>
</template>
<script>
import fly from '@/utils/fly'
import Fun from '@/utils/index'

import Toast from '../../../static/vant/toast/toast';
import Dialog from '../../../static/vant/dialog/dialog';

export default {
    data() {
        return {
            articleList: []
            ,page: 1
        }
    }
    ,methods: {
        onChange(event){
            this.active = event.mp.detail.index
            this.changeOpt()
        }
        ,getdata() {
            fly.post('/?v=V1&g=Doctor&c=Article&a=getMyArticleList'+Fun.getParam(),{
               page: this.page
            }).then((res)=> {
                if(res.code == 0) {
                    Toast.clear()
                   this.articleList = res.data.list
                } else {
                   Toast(res.message)
                }
            })
        }
        ,zhangli(id) {
            Dialog.confirm({
            title: '确认兑换阅读量？',
            }).then(() => {
            // on confirm
                fly.post('/?v=V1&g=Doctor&c=Article&a=getMyArticleList'+Fun.getParam(),{
                    id: id
                    ,type:'read_count_reward'
                    ,val: 1
                }).then((res)=> {
                    if(res.code == 0) {
                        Toast('操作成功')
                        this.page = 1
                        this.articleList = []
                        this.getdata()
                    } else {
                    Toast(res.message)
                    }
                })
            }).catch(() => {
            // on cancel
            })
        }
    }
    
    ,mounted() {
        Toast.loading({
        mask: true,
        message: '加载中...'
        });
       this.getdata()
    }
    ,onReachBottom(){ // 底部添加更多
            Toast.loading({
        mask: true,
        message: '加载中...'
        });
       this.page ++
       this.getdata()
    }
}
</script>
<style lang="less" scoped>
.consult {
   background: #F9F9F9;
    .consult-item {
        background: #FFFFFF;
       
        padding:10px 20px;
        margin-bottom: 10px;
       
        .con {
             display: flex;
            justify-content: space-between;
            .img {
                width: 111px;
                height: 67px;
                border-radius:5px;
            }
            .cont {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-right: 10px;
                .title {
                    font-size: 14px;
                    color: #4C5264;
                }
                .mini {
                    display: flex;
                    justify-content: space-between;
                    color:#A1A1A1;
                    font-size: 10px;
                    padding: 5px 0;
                }
            }
        }
        .btn-list {
            padding: 10px 0;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .btn-item {
                color: #5887F9;
                border: 1px solid #5887F9;
                font-size: 12px;
                min-width: 66px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 5px;  
                border-radius: 20px;
            }
            .c1 {
                color:rgb(11, 13, 17);
                border-color:#4C5264;
            }
        }
    }
}
</style>

