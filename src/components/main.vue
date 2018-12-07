<template>
  <scroll-view scroll-y="true" class="container" @scrolltolower="onLoadMore">
   
    <div class="search-bar">
      <a :href="'../search/main?opt=repair'" class="search">
        搜索您需要的服务<img src="../../static/imgs/search.png" class="search-icon"/>
      </a>
      <!-- <div><img src="../../static/imgs/filters.png" alt="" class="filter"></div> -->
    </div>
   <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000"> 
      <block v-for="(item, index) in banners" :index="index" :key="key">
        <swiper-item> 
          <image :src="item.ad_code" class="slide-image" mode="scaleToFill"/> 
        </swiper-item> 
      </block> 
    </swiper>
    <!-- 轮播图 end-->
    <div class="bg-f9">
      <div class="service">
       <a href="../repair_list/main" class="service-item">
         <img src="../../static/imgs/weixiu.png" alt="" class="service-img">
         <div class="service-name">项目维修</div>
       </a>
       <a href="../publish/main" class="service-item">
         <img src="../../static/imgs/xuqiu.png" alt="" class="service-img">
         <div class="service-name">需求发布</div>
       </a>
       <a href="../consult_publish/main" class="service-item">
         <img src="../../static/imgs/wenda.png" alt="" class="service-img">
         <div class="service-name">咨询发布</div>
       </a>
       <a href="../expert_list/main" class="service-item">
         <img src="../../static/imgs/zhuanjia.png" alt="" class="service-img">
         <div class="service-name">专家服务</div>
       </a>
      </div>
    </div>
    
    
    <div class="connt">
      <!-- 专家列表 -->
      <div class="head">
        <div class="titl">专家列表</div>
        <a href="../expert_list/main" class="more">更多>></a>
      </div>
      <div class="expert">
        <a :href="'../person_home/main?id='+item.user_id" class="expert-item" v-for="(item, index) in expertList" :key="key">
          <img :src="item.user_picture" alt="" class="expert-img">
          <div class="expert-name">{{item.real_name}}</div>
        </a>
      </div>
      <!-- 文章列表 -->
      <div class="head">
          <div class="titl">文章列表</div>
          <a href="/pages/article_list/main" class="more">更多>></a>
        </div>
      <div class="article">
        <a :href="'/pages/detail_article/main?id='+item.id" class="article-item" v-for="(item, index) in articleList" :key="key">
          <div class="art-title van-ellipsis van-hairline--bottom">{{item.title}}</div>
          <div class="min_time">{{item.add_time}}</div>
        </a>
      </div>
    </div>
    <van-tabs :active="active" @change="onChange" :color="'#5887F9'" :custom-class="scrollTop">
      <!-- 选择框 -->
      <div class="select" :class="{selects: scrollTop != ''}">
        <!-- <div class="select-item">
          <div class="select-item-name" :class="{'active': isPrice}" @click="onSelect(1)"> <span>默认排序<van-icon name="arrow" class="arrow-icon"/></span></div>
          <van-transition :show="isPrice" :name="'fade-down'">
            <div class="select-pos">
              <div class="pos-item van-hairline--top">默认排序</div>
              <div class="pos-item van-hairline--top">价格由高到底</div>
              <div class="pos-item van-hairline--top">价格由低到高</div>
            </div>
          </van-transition>
        </div>
        <div class="select-item">
          <div class="select-item-name" :class="{'active': isSort}" @click="onSelect(2)"> <span>分类<van-icon name="arrow" class="arrow-icon"/></span></div>
          <van-transition :show="isSort" :name="'fade-down'">
            <div class="select-pos">
              <div class="pos-item van-hairline--top">默认排序</div>
              <div class="pos-item van-hairline--top">价格由高到底</div>
              <div class="pos-item van-hairline--top">价格由低到高</div>
            </div>
          </van-transition>
        </div> -->
      </div>
      <van-tab title="项目维修">
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
      </van-tab>
      <van-tab title="需求列表">
        <div class="xuqiu">
          <a :href="'../detail_demand/main?id='+item.id" class="xuqiu-item" v-for="(item, index) in xuqiuList" :key="key">
              <div class="title title van-multi-ellipsis--l">{{item.title}}</div>
              <div class="cont title van-multi-ellipsis--l">{{item.content}}</div>
              <div class="xuqiu-imgs">
                <div class="img-item" v-for="(items, indexs) in item.pics_str" :key="keys">
                  <img :src="items" alt="" class="img">
                  </div>
              </div>
              <div class="name">
                <div>联系人:{{item.contact_name}}</div>
                <div>联系方式:{{item.contact_phone}}</div>
                <div>{{item.add_time}}</div>
              </div>
              <div class="bar">
                <div class="bar-item">正在进行</div>
                <div class="bar-item">已有{{item.quoted_count}}人报价</div>
              </div>
          </a>
        </div>
      </van-tab>
      <van-tab title="问题咨询">
        <div class="consult">
            <a :href="'../detail_consult/main?id='+item.id" class="consult-item van-hairline--bottom" v-for="(item, index) in consultList" :key="key">
                <div class="cont">
                    <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                    <div class="mini">
                        <div>{{item.nick_name}}</div>
                        <div>{{item.expert_answer_count}} 评论</div>
                    </div>
                </div>
                <!-- <img src="http://placehold.it/100x100" alt="" class="img"> -->
            </a>
       </div>
      </van-tab>
    </van-tabs>
     <van-toast id="van-toast" />
  </scroll-view>
</template>

<script>
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
import fly from '@/utils/fly'
import Toast from '../../static/vant/toast/toast'

export default {
  data () {
    return {
       active: 0
      ,userInfo: {}
      ,banners: []
      ,isPrice: false // 价格高低框
      ,isSort: false // 分类
      ,scrollTop: '' //
      ,repairList: [] // 维修列表
      ,expertList: [] // 专家列表
      ,consultList: [] // 咨询列表
      ,articleList: [] // 文章列表
      ,xuqiuList: [] // 需求列表
      ,consultPage: 1
      ,repairPage: 1
      ,xuqiuPage: 1
    }
  },

  methods: {
    // bindViewTap () {
    //   const url = '../logs/main'
    //   wx.navigateTo({ url })
    // },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
    ,onChange(event) {
      this.active = event.mp.detail.index
      
    }
    ,onSelect(num) {
      switch(num) {
        case 1: 
        this.isPrice = !this.isPrice
        break
        case 2:
        this.isSort = !this.isSort
        break

      }
    }
    ,getData(){
      Toast.loading({
        mask: true,
        message: '加载中...'
      })
      let _this = this
      this.getConsultData()
      this.getExpertData()
      this.getArticleData()
      this.getxuqiuData()
      this.getrepairsData()
      this.getAdData()
    }
    ,getExpertData() {
       fly.post('/?v=V1&g=Doctor&c=Expert&a=getIndexExpertList'+Fun.getParam()).then((res) =>{
        this.expertList = res.data.list
      })
    }
    ,getConsultData() { // 咨询
       fly.post('/?v=V1&g=Doctor&c=Consult&a=getConsultList'+Fun.getParam(),{
         cat_id: 0//cat_id
        ,field_id: 0//field_id
        ,page: this.consultPage
        ,page_size: 10
      }).then((res)=>{
        // console.log(this.consultList.concat(res.data.list))
        this.consultList = this.consultList.concat(res.data.list)
        Toast.clear()
      })
    }
    ,getArticleData() {
      fly.post('/?v=V1&g=Doctor&c=Article&a=getArticleList'+Fun.getParam(),{
         cat_id: 0//cat_id
        ,field_id: 0//field_id
        //,sort: 'new' // 默认new,hot,top,all,like,comment
        ,page: 1
        ,page_size: 2
      }).then((res)=>{
        //console.log(res)
        this.articleList = this.articleList.concat(res.data.list)
       
      })
    }
    ,getxuqiuData() {
      fly.post('/?v=V1&g=Doctor&c=Demand&a=getDemandList'+Fun.getParam(),{
         cat_id: 0//cat_id
        ,field_ids: 0//field_id
        //,sort: 'new' // 默认new,hot,top,all,like,comment
        ,page: this.xuqiuPage
        ,page_size: 10
      }).then((res)=>{
        //console.log(res)
        this.xuqiuList = this.xuqiuList.concat(res.data.list)
        Toast.clear()
      })
    }
    ,getrepairsData() {
      fly.post('/?v=V1&g=Doctor&c=Repair&a=getRepairList'+Fun.getParam(),{
         cat_id: 0
        ,field_ids: 0
        ,page: this.repairPage
        ,page_size: 15
      }).then((res)=>{
        // console.log(res)
        this.repairList = this.repairList.concat(res.data.list)
        Toast.clear()
      })
    }
    ,getAdData() {
      fly.post('/?v=V1&g=Common&c=Ad&a=getAdList'+Fun.getParam(),{
        ad_type: 'doctor_index_top'
      }).then((res)=>{
        if(res.code == 0)
        this.banners = res.data.list
      })
    }
  },
  created () {
    this.getData()
    
  }

  ,onReachBottom(){ // 底部添加更多
    console.log(this.active)
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    switch(this.active) {
      case 0: // 维修项目
        this.repairPage++
        this.getrepairsData()
      break;
      case 1: // 需求列表
        this.xuqiuPage++
        this.getxuqiuData()
      break;
      case 2:　// 咨询
         this.consultPage += 1
         this.getConsultData()
      break;
    }
  }
  ,onPageScroll(event){
    
    if(event.scrollTop > 458) {
      this.scrollTop = 'fixed-tab'
    } else {
      this.scrollTop = ''
    }
  }
}
</script>

<style scoped lang="less">
// .container {
//   padding-bottom: 50px;
// }
.tabbars{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.consult {
   background: #F9F9F9;
    &-item {
        background: #FFFFFF;
        display: flex;
        padding:10px 20px;
        margin-bottom: 10px;
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
    .name {font-size:10px;color: #A7A7A7;display: flex;justify-content: space-between;align-items: center;}
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
    }
  }
}
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
.selects {
  margin-top: 22px;
}
.select {
  display: flex;
  color: #A7A7A7;
  font-size: 12px;
  z-index: 99;
  &-item {
    width: 50%;
    background: #F9F9F9;
    position: relative;
    .select-item-name {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
      .arrow-icon{
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        transform: rotate(90deg);
      }
    }
   
  }
 
  &-pos {
    position: absolute;
    width: 100%;
   
    background: #FFFFFF;
    .pos-item {
      text-align: center;
      padding: 5px 0;;
     
    }
  }
   .active {
    background: #FFFFFF;
    .select-item-name {
      color: #FC5F6B;
    }
    .arrow-icon {
      transform: rotate(-90deg) !important;
    }
    
  }
}
.search-bar {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #5887F9;
  vertical-align: middle;
}
.search {
  flex: 1;
  background: #ffffff;
  border-radius: 20px;
  padding: 5px;
  text-align: center;
  color: #8E8E8E;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-right: 10px;
}
.filter {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.search-icon {
  width:15px;
  height: 15px;
  vertical-align: middle;
  margin-left: 5px; 
}
.bg-f9 {
 background: #F9F9F9;
  padding: 10px 20px;
}
.service {
 
  border-radius: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}
.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.service-img {
  width: 52px;
  height: 52px;
  margin: 0 auto;
}
.service-name {
  font-size: 16px;
  color:#4C5264;
}
.connt {
  padding: 5px 20px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:5px 0 ;
}
.head .titl {
  font-size: 16px;
  color: #5887F9;
}
.head .more {
  font-size: 12px;
  color: #BCC5D3;
}
.expert {
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &-item {
    margin-right: 10px;
    .expert-img {
      width:55px;
      height: 55px;
      border-radius: 50%;
    }
    .expert-name {
      color: #4C5264;
      font-size: 14px;
      text-align: center;
    }
  }
}
.article {
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8E8E8E;
   
    .art-title {
      
      padding: 10px 0;
      font-size: 12px;
    }
    .min_time {
      text-align: right;
      width: 40px;
      font-size: 10px;
    }
    
  }
}

</style>
