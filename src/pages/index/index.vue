<template>
  <div class="container">
    <mains v-if="active == 0"></mains>
    <consult v-else-if="active == 1"/>
    
    <message v-else-if="active == 3"/>
    <my v-else-if="active == 4"/>
    <van-tabbar :active="act" @change="onChangeTab">
      <van-tabbar-item>
        <span>首页</span>
        <image slot="icon" src="../../static/imgs/home.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="/static/imgs/home_act.png " class="icon" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>咨询</span>
        <image slot="icon"  src="../../static/imgs/zixun.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="../../static/imgs/zixun_act.png" class="icon" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item class="up">
        <span>发布</span>
        <image slot="icon" src="../../static/imgs/fabu.png" class="icon1" mode="aspectFit" />
        <image slot="icon-active" src="../../static/imgs/fabu.png" class="icon1" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item >
        <span>消息</span>
        <image slot="icon" src="../../static/imgs/xiaoxi.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="../../static/imgs/xiaoxi_act.png" class="icon" mode="aspectFit" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <image slot="icon" src="../../static/imgs/usr.png" class="icon" mode="aspectFit" />
        <image slot="icon-active" src="../../static/imgs/usr_act.png" class="icon" mode="aspectFit" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import mains from '@/components/main'
import consult from '@/components/consult'
import publish from '@/components/publish'
import message from '@/components/message'
import my from '@/components/my'

import fly from '@/utils/fly'
import Fun from '@/utils/index'
export default {
  data () {
    return {
      active: 0
      ,userInfo: {}
    }
  },

  components: {
    mains
    ,consult
    ,publish
    ,message
    ,my
  },

  methods: {
    getBarData(data) {
      console.log(data)
    }
    ,bindViewTap (url) {
      // const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      let _this = this
      wx.getSetting({
        success (res) {
          if(res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(data) {
                // const user = {
                //   encryptedData: data.encryptedData
                //   ,iv: data.iv
                //   ,signature: data.signature
                //   ,userInfo: data.userInfo
                // }
                wx.setStorage({
                  key:"userInfo",
                  data:data
                })
              }
            })
  
          } else {
            // 跳到授权页面
            _this.bindViewTap('../login/main')
          }
          
        }
      })

    },
    onChangeTab(event) {
        let detail = event.mp.detail // 0:首页1:咨询2:发布3:消息4:我的
        
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
            // name = '发布'
            this.active = 0;
            this.bindViewTap('../publish/main')
            return ;
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
        this.active = detail
        this.changeNavigateBar(name)
    }
    ,changeNavigateBar(name) {
        wx.setNavigationBarTitle({
        title: name//页面标题为路由参数
      })
    }
    
  },
  
  created () {
    // 调用应用实例的方法获取全局数据
     this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.container {
  padding-bottom: 50px;
}
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
