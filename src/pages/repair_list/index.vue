<template>
<div class="repair">
    <a :href="'../detail_repair/main?id='+item.id" class="repair-item" v-for="(item, index) in repairList" :key="key">
    <div class="repair-header">
        <img :src="item.user_picture" alt="" class="actor">
        <div class="self">
        <div class="name">{{item.real_name}}</div>
        <div class="info">
            <div class="addr"> <span v-for="(it,inde) in item.user_Region" :key="ky">{{it}}</span> &nbsp;</div>
            <!-- <div class="online">当前在线</div>
            <div class="unline">当前离线</div> -->
        </div>
        </div>
    </div>
    <div class="repair-imgs">
        <div class="img-item" v-for="(items, indexs) in item.pics_str" :key="keys"><img :src="items" alt="" class="img"></div>
    </div>
    <div class="repair-title">{{item.title}}</div>
    <div class="repair-price"><div class="yy">¥</div>　<div>{{item.price}}</div>  </div>
    </a>
</div>
</template>
<script>
import * as Params from '@/utils/params'
import fly from '@/utils/fly'
import Toast from '../../../static/vant/toast/toast';
import Fun from '@/utils/index'
export default {
    data() {
        return {
            repairPage: 1
            ,repairList: [] // 维修列表
        }
    }
    ,methods: {
        getrepairsData() {
        fly.post('/?v=V1&g=Doctor&c=Repair&a=getRepairList'+Fun.getParam(),{
            cat_id: 0
            ,field_ids: 0
            ,page: this.repairPage
            ,keyword: this.keyword
            ,page_size: 15
        }).then((res)=>{
            // console.log(res)
            this.repairList = this.repairList.concat(res.data.list)
            Toast.clear()
        })
        }
    }
    ,mounted() {
        this.keyword = this.$mp.query.keyword || ''
       this.getrepairsData()
    }
    ,onReachBottom(){ // 底部添加更多
        Toast.loading({
        mask: true,
        message: '加载中...'
        })
        this.repairPage ++
        this.getrepairsData()
    }
}
</script>
<style lang="less" scoped>
.repair{
  background: #F9F9F9;
  .repair-item {
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #FFFFFF;
    .repair-header {
      display: flex;
      padding: 5px 0;
      .actor {width: 27px;height: 27px;margin-right: 10px;border-radius: 50%;}
      .self{
        flex: 1;
        display: flex;
        flex-direction: column;
        .name {font-size:12px;color:#4C5264; border-radius: 50%;}
        .info{
          font-size: 8px;
          display: flex;

          .addr {color: #A7A7A7;}
          .online {color:#2ECB8B;}
          .unline {color: #A7A7A7;}
        }
      }
    }
    .repair-imgs {
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
    .repair-title {
      font-size: 12px;
      color:#4C5264;
      padding-bottom: 5px;
    }
    .repair-price {
      display:flex;
      align-items: center;
      justify-content: flex-start;

      color: #FC5F6B;
      font-size: 12px;
      .yy {
        font-size: 8px;
      }
    }
  }
}
</style>

