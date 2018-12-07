<template>
    <div class="publish">
        <div class="consult">
            <a :href="'/pages/detail_article/main?id='+item.id" class="consult-item" v-for="(item, index) in artilceList" :key="key">
                <div class="head">
                    <div class="cont">
                        <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                        <div class="mini">
                            <div>{{item.nick_name}}</div>
                            <div>{{item.add_time}}</div>
                        </div>
                    </div>
                    <img :src="item.list_pic" alt="" class="img">
                </div>
            </a>   
        </div>
    <van-toast id="van-toast" />
    </div>
</template>
<script>
import fly from '@/utils/fly'
import Fun from '@/utils/index'

import * as Params from '@/utils/params'
import Toast from '../../../static/vant/toast/toast';
export default {
    data() {
        return {
            artilceList: []
            ,page: 1
        }
    }
    ,methods: {
        getArtilceList(){
            fly.post('/?v=V1&g=Doctor&c=Article&a=getArticleList'+Fun.getParam(),{
                keyword: ''
                ,cat_id: 0
                ,field_id: 0
                ,sort: 'new' //默认new,hot,top,all,like,comment
                ,page: this.page
                ,page_size: 15
            }).then((res)=>{
                if(res.code == 0) {
                    this.artilceList = this.artilceList.concat(res.data.list)
                } 
            })
        }
    }
    ,mounted() {
        this.getArtilceList()
    }
    ,onReachBottom(){ // 底部添加更多
        this.page++
        this.getArtilceList()
    }
}
</script>
<style lang="less" scoped>
.publish {
 background:#F9F9F9;
.publish-item{
    background: #ffffff;
    padding: 10px 20px;
    margin-bottom: 10px;
     .cont {
         display: flex;
         .or_img {width:80px;height: 80px;border-radius: 5px;}
         .or_cont {
             flex: 1;
             display: flex;
             flex-direction: column;
             justify-content: space-around;
             padding-left: 10px;
             .title {
                 color:#4C5264;
                 font-size: 12px;
                 font-weight: bold;
             }
             .price {
                 display: flex;
                 align-items: center;
                 color:#FC5F6B;
                 .ya {font-size: 8px;}
                 .men {font-size: 12px;}
             }
             .mini-title {
                 display: flex;
                 .mini {
                    color:#A2A2A2;
                    font-size: 10px;
                    margin-right: 20px;  
                 } 
             }
         }
     }
    
 }
}
.btn-list {
    display: flex;
    align-items: center;
    padding: 5px 0;
    .status {font-size: 10px;color:#393939;}
    .item {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .btn-item {
            color: #FC5F6B;
            border: 1px solid #FC5F6B;
            font-size: 12px;
            min-width: 66px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;  
            border-radius: 20px;
        }
        .c1 {
            color:#393939;
            border-color:#C9C9C9;
        } 
    }
    
}
.xuqiu {
  background: #F9F9F9;
  &-item {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #FFFFFF;
    .title {color:#4C5264;font-size: 12px;}
    .cont {color:#8D8D8D;font-size: 10px;}
    
    .xuqiu-imgs {
      display: -webkit-box;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      height: 90px;
      .img-item {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        margin-right: 10px;
        .img {width: 100%;height:100%;border-radius: 5px;}
      }
    }
    .bar {
      display: flex;
      margin-top: 5px;
      &-item {
        color:#5887F9;
        font-size: 10px;
        background: #E8EFFF;
        padding: 0px 12px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .hl {
          color:#FC5F6B;
          background: #FCD7DA;
      }
      .time {
          flex:1;
          display: flex;
          justify-content: flex-end;
          font-size: 10px;
          color:#A7A7A7;
      }
    }
  }
}
.consult {
   background: #F9F9F9;
    &-item {
        background: #FFFFFF;
        padding:10px 20px 0 20px;
        margin-bottom: 10px;
        .head {
            display: flex;
            padding-bottom: 10px;
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
                }
            }
        }

    }
}
</style>

