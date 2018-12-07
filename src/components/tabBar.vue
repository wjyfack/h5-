<template>
    <van-tabbar :active="act" @change="onChangeTab">
      <van-tabbar-item>
        <span>首页</span>
        <image slot="icon" src="/static/imgs/home.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="/static/imgs/home_act.png " class="icon" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item :dot="true">
        <span>咨询</span>
        <image slot="icon"  src="/static/imgs/zixun.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="/static/imgs/zixun_act.png" class="icon" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item class="up">
        <span>发布</span>
        <image slot="icon" src="/static/imgs/fabu.png" class="icon1" mode="aspectFit" />
        <image slot="icon-active" src="/static/imgs/fabu.png" class="icon1" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>消息</span>
        <image slot="icon" src="/static/imgs/xiaoxi.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="/static/imgs/xiaoxi_act.png" class="icon" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <image slot="icon" src="/static/imgs/usr.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="/static/imgs/usr_act.png" class="icon" mode="aspectFit" />
      </van-tabbar-item>
    </van-tabbar>
</template>
 <script>
 export default {
     name: 'tab-bar'
     ,props: ['act']
     ,data() {
       return {
         
       }
     }
     ,methods:{
        onChangeTab(event) {
            let detail = event.mp.detail // 0:首页1:咨询2:发布3:消息4:我的
            //let url = '../index/main'
            let name = '传动医生'
            switch(detail) {
              case 0:
               // url = '../index/main'
               name = '传动医生'
              break;
              case 1:
               // url = '../consult/main'
               name = '咨询'
              break;
              case 2:
               // url = '../publish/main'
               name = '发布'
              break;
              case 3:
               // url = '../message/main'
               name = '消息'
              break;
              case 4:
               // url = '../my/main'
               name = '个人中心'
              break;
            }
            // emit 到父组件
           
            middle.$emit('barChange',detail)
            // wx.navigateTo({ url })
            this.changeNavigateBar(name)
        }
        ,changeNavigateBar(name) {
           wx.setNavigationBarTitle({
            title: name//页面标题为路由参数
          })
        }
      } 
        
 }
 </script>
 
 <style lang="less" scoped>
  .icon {
    width:20px;
    height: 20px;
  }
  .icon1 {
    width:40px;
    height: 40px;
    z-index: 199;
  }
  .up {
    margin-top: -17px;
  }
 </style>
 
