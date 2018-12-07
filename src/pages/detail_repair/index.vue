<template>
    <div class="detail">
        <div class="content">
            <!-- 轮播图 -->
            <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000"> 
            <block v-for="(item, index) in good_info.pics_str" :index="index" :key="key">
                <swiper-item> 
                <image :src="item.url" class="slide-image" mode="scaleToFill"/> 
                </swiper-item> 
            </block> 
            </swiper>
            <!-- 轮播图 end-->
            <div class="tou">
                <div class="head">
                    <div class="price"><div class="yan">￥</div><div>{{select.price}}/次</div> </div>
                    <img src="../../../static/imgs/rp_share.png" class="share">
                </div>
                <div class="detail van-multi-ellipsis--l2">{{good_info.title}}</div>
                <div class="infos">
                    <div>总计销量&nbsp;{{good_info.buy_count}}</div>
                    <div>收藏&nbsp;{{good_info.read_count}}</div>
                    <div>{{good_info.regions_name}}</div>
                </div>
            </div>
            <div class="baozhang">
                <div class="hd">传动先生，全程保障交易安全</div>
                <div class="tiao">
                    <div class="tiao-item">
                        <img src="../../../static/imgs/rp_gou.png" class="img">
                        <div>验收合格后，再付款给服务商</div>
                    </div>
                    <div class="tiao-item">
                        <img src="../../../static/imgs/rp_gou.png" class="img">
                        <div>所有服务商，100%实名认证</div>
                    </div>
                    <div class="tiao-item">
                        <img src="../../../static/imgs/rp_gou.png" class="img">
                        <div>交易出问题，可获保证金赔付</div>
                    </div>
                    <div class="tiao-item">
                        <img src="../../../static/imgs/rp_gou.png" class="img">
                        <div>承诺不向雇主收取任何费用&nbsp;</div>
                    </div>
                </div>
            </div>
            <a :href="'../person_home/main?id='+user_info.user_id" class="info">
                <img :src="user_info.user_picture" alt="" class="avatar">
                <div class="person-info">
                    <div class="info-name">
                        <div class="name">{{user_info.real_name}}</div>
                        <div class="bar">{{user_info.zizhi}}</div>
                    </div>
                    <div class="haopin">
                        <div class="haopin-item">
                            <div>好评率 </div>
                            <div class="cl">100%</div>
                        </div>
                        <div class="haopin-item">
                            <div>诚信度 </div>
                            <div class="cl">100</div>
                        </div>
                        <div class="haopin-item">
                            <div>已缴纳保证金 </div>
                            <div class="cl"></div>
                        </div>
                    </div>
                </div>
                
            </a>
            <div class="pingjia">
                <div class="hd van-hairline--bottom">
                    <div class="left">
                        <div class="biao">客户评价</div>
                        <div class="tiao">({{allPingjia}}条)</div>
                    </div>
                    <a :href="'../pingjia_detail/main?id='+id" class="right">
                        <div>查看全部</div>
                        <img src="../../../static/imgs/arrow.png" alt="" class="img">
                    </a>
                </div>
                <div class="pingjia-item van-hairline--bottom" v-for="(item,index) in pingjiaTwoList" :key="k">
                        <div class="pingjia-info">
                            <div class="name">
                                <img :src="item.user_picture" alt="" class="img">
                                <div>{{item.nick_name}}</div>
                        </div>
                            <div class="ping">
                                <div>好评</div>
                                <img src="../../../static/imgs/rp_star.png" alt="" class="img" v-for="(items,indexs) in 5" :key="kk">
                            </div>
                        </div> 
                        <div class="cont van-multi-ellipsis--l2">
                            {{item.content}}
                        </div>        
                </div>
            </div>
            <div class="service">
                <div class="hd van-hairline--bottom">
                    <div class="left">
                        <div class="biao">服务详情</div>
                        <div class="tiao"></div>
                    </div>
                </div>
                <div class="cont">
                    <wxParse :content="good_info.content"/>
                </div>
            </div>
            <div class="fixed-tab van-hairline--top">
                <div class="tabb">
                    <div class="tabl">
                        <!-- <img src="../../../static/imgs/rp_shouc.png" class="sh-img"> 收藏 -->
                    </div>
                    <div class="tabr">
                        <div class="tabr-item c1" @click="toColse">选择服务</div>
                        <div class="tabr-item c2" @click="onQueding">购买服务</div>
                        <div class="clear"></div>
                    </div>
                </div>
                
            </div>
        </div>
        <van-popup :show="show" @close="toColse" position="bottom" :overlay="false">
            <div class="commit van-hairline--top">
                <div class="commit-header"><div @click="toColse">取消</div>　<div @click="onQueding">确定</div></div>
                <div class="hd">选择服务</div>
                <div class="commit-list">
                    <div class="commit-item" @click="onCommit(index)" :class="{'active': item.id == select.id}" v-for="(item,index) in good_attr" :key="key">{{item.title}}</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
import wxParse from 'mpvue-wxparse'
export default {
    components: {
        wxParse
    },
    data() {
        return {
            active: 0
            ,id: 0
            ,show: false
            ,good_info: {}
            ,good_attr: {}
            ,user_info: {}
            ,pingjiaTwoList: {}
            ,allPingjia: 0
            ,select: {}
        }
    }
    ,methods: {
        onChange(event) {
            this.active = event.mp.detail
        }
        ,getData(id) {
            // 维修项目详情
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=Repair&a=getRepairDetail 
            // repair_id
            fly.post('/?v=V1&g=Doctor&c=Repair&a=getRepairDetail'+Fun.getParam(),{
                repair_id: id 
            }).then((res)=> {
                if(res.code == 0) {
                 
                    this.allPingjia = res.data.good_info.pingjia.count
                    this.user_info = res.data.user_info
                    this.good_attr = res.data.good_attr
                    this.good_info = res.data.good_info
                    this.select = res.data.good_attr[0]
                } else {
                    console.log(res.message)
                }
            })
        }
        ,getPingjia(id,pingjia_type,page,page_size) {
            fly.post('/?v=V1&g=Doctor&c=Repair&a=getRepairCommentList'+Fun.getParam(),{
                repair_id: id
                ,pingjia_type: pingjia_type// 1好评2中评3差评
                ,page: page
                ,page_size: page_size
            }).then((res)=> {
                if(res.code == 0) {
                    
                    if(page_size == 3) {
                        this.pingjiaTwoList = res.data.list
                    }
                } else {
                    console.log(res.message)
                }
            })
        }
        ,getStar(data) {
            let pingjia = data
            for(let i in data) {
                pingjia['star_num'] = ~~(data[i].zonghe_pingjia / 20)
                //if(pingjia['star_num']<3)
            }
        }
        ,toColse() {
            this.show = !this.show
        }
        ,onCommit(index) {
        　　// console.log(index)
            this.select = this.good_attr[index]
        }
        ,onQueding() {
            let data = JSON.stringify(this.select)
            // 跳到提交页面
            wx.navigateTo({
                url: '../order_sure/main?name='+this.user_info.nick_name+'&select='+data
            })
        }
        

    }
    ,mounted() {
        // console.log(this)
        let query = this.$mp.query
        this.id = query.id
        this.getData(query.id)
        this.getPingjia(query.id,1,1,3)
    },
}
</script>
<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");

.detail {
    background: #F9F9F9;
    .content {
        padding-bottom: 40px;
        .tou {
            background: #FFFFFF;
            padding: 10px 20px;
            margin-bottom: 10px;
            .head {
                display: flex;
                justify-content: space-between;
                .price {
                    display: flex;
                    color: #FC5F6B;
                    font-size: 16px;
                    .yan {
                        font-size: 12px;
                    }
                    
                }
                .share {
                    width: 14px;
                    height: 16px;
                }
            }
            .detail {
                color: #000000;
                font-size: 14px;
            }
            .infos {
                display: flex;
                justify-content: space-between;
                color: #8B8B8B;
                font-size: 10px;
            }
        }
        .baozhang {
             margin-bottom: 10px;
             background: #FFFFFF;
            padding: 10px 20px;
            .hd {
                color:#8B8B8B;
                font-size: 12px;
            }
            .tiao {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                &-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width:50%;
                    color:#8B8B8B;
                    font-size: 10px;
                    padding: 5px 0;
                    .img {
                        width: 13px;
                        height: 13px;
                        margin-right: 5px;
                    }

                }
            }
        }
        .info {
            padding: 10px 20px;
            display: flex;
            background: #FFFFFF;
            margin-bottom: 10px;
            .avatar{width:47px;height:47px;border-radius: 50%;}
            .person-info {
                flex:1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 10px;
               
                .info-name {
                    display: flex;
                    align-items: center;
                    .name {
                        font-size: 14px;
                        color:#4C5264;
                        margin-right:10px;
                    }
                    .bar {
                        background: #8A95FF;
                        color:#FFFFFF;
                        font-size: 10px;
                    }
                }
                .haopin {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px 0;
                    font-size: 10px;
                    color:#8B8B8B;
                    .haopin-item {
                        display: flex;
                        align-items: center;
                        .cl {
                            color:#FC5F6B;
                            font-size: 10px;
                            line-height: 1;
                        }
                    }
                    
                }
            }
        }
        .pingjia {
            background: #FFFFFF;
            .hd {
                padding: 10px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    .biao {
                        border-left: 5px solid #5887F9;
                        padding-left: 5px;
                        color:#4C5264;
                        font-size: 14px;
                        margin-right: 5px;
                    }
                    .tiao {
                        font-size: 14px;
                        color:#8B8B8B;
                    }
                    
                }
                .right {
                    display: flex;
                    align-items: center;
                    color:#5887F9;
                    font-size: 12px;
                    .img {
                        width: 6px;
                        height: 12px;
                        margin-left: 5px;
                    }
                }
            }
            .pingjia-item {
                padding: 10px 20px;
                display: flex;
                flex-direction: column;
                .pingjia-info {
                    display: flex;
                    justify-content: space-between;
                    .name {
                        display: flex;
                        align-items: center;
                        color:#8B8B8B;
                        font-size: 12px;
                        .img {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            margin-right: 5px;
                        }

                    }
                    .ping {
                        font-size: 12px;
                        color: #F6B503;
                        display: flex;
                        align-items: center;
                        min-width: 80px;
                        .img {
                            width:12px;
                            height: 11px;
                        }
                    }
                }
                .cont {
                    font-size: 12px;
                    color:#4C5264;
                }
            }
        }
        .service {
           background: #FFFFFF;
            .hd {
                padding: 10px 20px;
                display: flex;
                .left {
                    display: flex;
                    .biao {
                        border-left: 5px solid #5887F9;
                        padding-left: 5px;
                        color:#4C5264;
                        font-size: 14px;
                        margin-right: 5px;
                    }
                    .tiao {
                        font-size: 14px;
                        color:#8B8B8B;
                    }
                    
                }
            } 
            .cont {
                padding:5px 20px;
                min-height: 100px;
            }
        }
    }
}
.fixed-tab {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    .tabb {
        padding: 10px 20px;
        display: flex;
        background: #FFFFFF;
        .tabl {
            width: 30%;
            display: flex;
            align-items: center;
            color:#8B8B8B;
            font-size: 14px;
            .sh-img {
               width: 23px; 
               height: 22px;
               margin-left: 5px;
            }
        }
        .tabr {
            flex: 1;
            border-radius: 5px;
            .tabr-item {
               float: left;
               width: 50%;
               font-size: 14px;
               color:#FFFFFF;
               box-sizing: border-box;
               text-align: center;
               padding: 5px 0;
            }
            .c1 {background: #5887F9;border-bottom-left-radius: 3px;border-top-left-radius: 3px;}
            .c2 {background: #FC5F6B;border-bottom-right-radius: 3px;border-top-right-radius: 3px;}
            .clear {
                clear: both;
            }
        }
    }
}
.commit {
    min-height: 150px;
    .commit-header {
        display:flex;
        padding: 10px 20px;
        justify-content: space-between;
        font-size: 14px;
        color:#5887F9;
    }
    .hd {font-size: 14px;color:#4C5264;padding-bottom: 5px;padding-left: 20px;}
    .commit-list {
        display: flex;
        padding: 0 20px;
        .commit-item {
            padding: 5px 10px;
            font-size: 14px;
            border:1px solid #8B8B8B;
            border-radius: 5px;
            color:#8B8B8B;
            text-align: center;
            margin-right: 5px;
            margin-bottom: 5px;
        }
        .active {
            color:#FFFFFF;
            background: #5887F9;
            border-color:#5887F9;
        }
    }
}
</style>

