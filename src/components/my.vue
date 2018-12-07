<template>
    <div class="my">
        <div class="person">
            <img :src="baseInfo.user_picture" alt="" class="avatar_img">
            <div class="info">
                <div class="name">{{baseInfo.nick_name}}</div>
                <div class="id">{{baseInfo.user_name}}</div>
            </div>
            <a class="setting" :href="'../setting/main?nick_name='+baseInfo.nick_name+'&user_picture='+baseInfo.user_picture"><img src="../../static/imgs/my_setting.png" class="set"> <div class="sett">设置</div></a>
        </div>
        <div class="option">
            <a :href="'../my_order/main?id=2'" class="option_item">
                <img src="../../static/imgs/my_fukuan.png" alt="" class="img">
                <div class="name">待付款</div>
            </a>
            <a :href="'../my_order/main?id=3'" class="option_item">
                <img src="../../static/imgs/my_fuwu.png" alt="" class="img">
                <div class="name">待服务</div>
            </a>
            <a :href="'../my_order/main?id=6'" class="option_item">
                <img src="../../static/imgs/my_pinjia.png" alt="" class="img">
                <div class="name">评价</div>
            </a>
            <a :href="'../my_order/main?id=8'" class="option_item">
                <img src="../../static/imgs/my_shouhou.png" alt="" class="img">
                <div class="name">售后</div>
            </a>
            <a :href="'../my_order/main?id=0'" class="option_item">
                <img src="../../static/imgs/my_all.png" alt="" class="img">
                <div class="name">全部订单</div>
            </a>
        </div>
        <div class="bell">
            <a :href="'../my_bell/main?id='+baseInfo.user_money" class="cells van-hairline--bottom">
                <div class="name">我的钱包</div>
                <div class="detail">账单、提现 <img src="../../static/imgs/arrow.png" class="arrow"></div>
            </a>
            <div class="bell_my_bell">
                <div class="item">
                    <div class="price">{{baseInfo.user_money}}</div>
                    <div class="bell_name">账户余额</div>
                </div>
                <div class="item">
                    <div class="price">{{accountInfo.coupon_count}}</div>
                    <div class="bell_name">优惠券</div>
                </div>
                <div class="item">
                    <div class="price">{{baseInfo.pay_points}}</div>
                    <div class="bell_name">账户积分</div>
                </div>
                
            </div>
        </div>
        <div class="nongne">
            <div v-for="(item, index) in doctor_info.brand" :key="index">
            <a href="../my_repair_order/main" v-if="2 == item" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/p_gong.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">我的维修订单</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="../my_article/main" v-if="1 == item" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/p_zuo.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">我的文章列表</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            </div>
            <a href="../my_publish/main" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/my_fabu.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">我的发布</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="../my_shou/main" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/my_shouc.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">我的收藏</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/my_dizhi.png" alt="" class="nongne_img nongne_imgs" mode="widthFix">
                <div class="name">我的地址</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="../my_renzheng/main" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/my_card.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">实名认证 <div class="res">({{shiNameStatus}})</div></div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="../my_problem/main" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/my_wenti.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">常见问题</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/my_kefu.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">客服咨询</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="" class="nongne_item van-hairline--bottom">
                <img src="../../static/imgs/my_women.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">关于我们</div>
                <img src="../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
        </div>
    </div>
</template>

<script>
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
export default {
    data(){
        return {
            shiNameStatus: '立即去认证'
            ,baseInfo: {
                user_picture: ''
                ,nick_name: ''
                ,user_money:0
                ,pay_points: 0
            }
            ,accountInfo: {
                coupon_count: 0
            }
            ,userData: {}
            ,doctor_info: {brand:[]}
        }
    }
    // ,computed: {
    //     userData() {
    //         var value = wx.getStorageSync('userData')
    //         return value
    //     }
    // }
    ,methods: {
        bindViewTap (url) {
            // const url = '../logs/main'
            wx.navigateTo({ url })
        }
        ,getInfo(session_id) {
            // 我的个人中心（必须登录）
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=User&a=getMyInfo
           
            fly.post('/?v=V1&g=Common&c=User&a=getMyInfo&d=wx_minprogram&s='+session_id)
                .then((res)=>{
                    if(res.code == 0) {
                        this.accountInfo = res.data.account_info
                        this.baseInfo = res.data.base_info
                        let info = res.data.doctor_info
                        info.brand = Fun.getBrand(info.user_types)
                        this.doctor_info = info
                    }
                })
        }
        ,getshiName(session_id) {
            fly.post('/?v=V1&g=Common&c=User&a=getMyRealInfo&d=wx_minprogram&s='+session_id)
                .then((res)=>{
                    console.log(res.data.user_real_info.review_status)
                    if(res.code == 0) {
                        let name = '立即去认证'
                        switch(~~(res.data.user_real_info.review_status)) {
                            case 0:
                                name = '未审核'
                            break;
                            case 1:
                                name = '通过'
                            break;
                            case 2:
                                name = '不通过'
                            break;
                           
                        }
                        this.shiNameStatus = name
                       
                    }
                })
        }
        ,tologin(_this) {
            wx.clearStorage()
             wx.login({
                success (res) {
                    if (res.code) {
                       console.log('abc')
                        wx.getUserInfo({
                         success: function(data) {
                             console.log(data)
                            wx.setStorageSync('userInfo', data)
                            let userData = data
                            //发起网络请求
                            fly.post('/?d=wx_minprogram&v=V1&g=Common&c=Login&a=login', {
                                login_type: 'wx_minprogram'
                                ,encrypted_data: userData.encryptedData
                                ,iv: userData.iv
                                ,raw_data: userData.rawData
                                ,signature: userData.signature
                                // ,useInfo: userData.useInfo
                                ,js_code: res.code
                            }).then(function (response) {
                                console.log(response.data)
                                if(response.code == 0) {
                                   wx.setStorage({
                                    key:"userData",
                                    data:response.data
                                    })
                                    wx.setStorageSync('userData', response.data)
                                   
                                   if(response.data.user_id > 0) {// 有用户信息
                                        _this.getInfo(response.data.session_id)
                                        _this.getshiName(response.data.session_id) 
                                   } else { // 前去绑定帐号
                                    wx.navigateTo({url: '../my_login/main'})
                                   }
                                }
                            }).then(() => {
                                   
                            })
                        }   
                        })
                    } else {
                    console.log('登录失败！' + res.errMsg)
                    }
                }
              })
        }
    }
    ,mounted(){
        let _this = this
        wx.checkSession({
            success () {
                let userData = wx.getStorageSync('userData')
               if(userData.user_id > 0 && userData.session_id != '') {
                   _this.getInfo(userData.session_id)
                   _this.getshiName(userData.session_id)
               } else {
                   _this.tologin(_this)
               }
            },
            fail () { 
             _this.tologin(_this)
            }
        })
    //  if(true) {
    //      this.bindViewTap('../my_login/main')
    //  }   
    }   
}
</script>
<style lang="less" scoped>
.my {
    background: #F9F9F9;
    .person {
        display: flex;
        align-items: center;
        background: #5887F9;
        padding: 20px;
        .avatar_img {
            width: 64px;
            height: 64px;
            border-radius: 5px;
        }
        .info {
            flex:1;
            display: flex;
            flex-direction: column;
            color: #FFFFFF;
            padding-left: 10px;
            .name{font-size: 16px;}
            .id {font-size: 12px;}
        }
        .setting {
            color: #ffffff;
            font-size: 14px;
            display: flex;
            align-items: center;
            .set {
                width: 12px;
                height: 12px;
                vertical-align:middle;
                margin-right: 5px;
            }
            .sett {
                display: inline-block;
            }
        }
    }
    .option {
        padding: 20px 0;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #FFFFFF;
        &_item  {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .img {width: 20px;height: 20px;}
            .name {
                padding-top: 10px;
                font-size: 12px;
                color:#606060;
            }
        }
    }
    .bell {
        background: #FFFFFF;
        .cells {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            .name{
                font-size: 14px;
                color:#4C5264;
            }
            .detail {
                display: flex;
                align-items: center;
                font-size: 12px;
                color:#B2B2B2;
                .arrow {
                    margin-left: 5px;
                    width:  6px;
                    height: 11px;
                    color: #5887F9;
                }
            }
        }
        &_my_bell {
            padding: 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 10px;
            .item {
                display: flex;
                justify-content:center;
                align-items: center;
                flex-direction: column;
                .price {
                    font-size: 16px;
                    color:#FC5F6B;
                }
                .bell_name {
                    font-size: 12px;
                    color: #606060;
                }
            }
        }
    }
    .nongne {
       
        padding-bottom: 40px;
        &_item {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            align-items: center;
            background: #FFFFFF;
            .nongne_img {
                width: 20px;
                // height: 20px;
            }
            .nongne_imgs {
                width: 20px;
                 height: 20px;
            }
            .name {
                flex: 1;
                font-size: 12px;
                color:#606060;
                padding-left: 10px;
                display: flex;
                align-items: center;
                .res {
                    color:#FC5F6B;
                    font-size: 10px;
                    margin-left: 5px;
                }
            }
            .arrow {
                width:  6px;
                height: 11px;
                color: #5887F9;
            }
        }
    }
}
</style>
