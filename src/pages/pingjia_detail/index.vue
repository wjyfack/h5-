<template>
    <div class="detail">
        <div class="zhonghe">
            <div class="left van-hairline--right">
                <div class="zong">综合评分</div>
                <div class="fen">{{good_info.pingjia.zonghe}}</div>
                <div class="star_img">
                    <img src="../../../static/imgs/rp_star.png" alt="" class="img" v-for="(item,index) in zongHeSart" :key="key">
                </div>
            </div>
            <div class="right">
                <div class="r-item">服务评价：<span class="fe">{{good_info.pingjia.fuwu}}</span> 分</div>
                <div class="r-item">态度评价：<span class="fe">{{good_info.pingjia.taidu}}</span> 分</div>
                <div class="r-item">专业评价：<span class="fe">{{good_info.pingjia.zhuanye}}</span> 分</div>
            </div>
        </div>
        <van-tabs :active="active" color="#5887F9" @change="onChange">
            <van-tab :title="'好评'+good_info.pingjia.type_hao">
                <div class="content">
                    <div class="pingjia">
                        <div class="pingjia-item van-hairline--bottom" v-for="(item,index) in haoList" :key="k">
                             <div class="pingjia-info">
                                 <div class="name">
                                     <img :src="item.user_picture" alt="" class="img">
                                     <div>{{item.nick_name}}</div>
                                </div>
                                 <div class="ping">
                                     <div>好评</div>
                                     <img src="../../../static/imgs/rp_star.png" alt="" class="img" v-for="(tt,ii) in item.star_num" :key="ks">
                                 </div>
                             </div> 
                             <div class="cont van-multi-ellipsis--l2">
                                 {{item.content}}
                             </div>
                             <div class="footer">
                                 <span>{{item.add_time}}</span>
                                 <span>交易金额¥{{item.total_pay}}</span>
                             </div>        
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'中评'+good_info.pingjia.type_zhong">
                <div class="content">
                    <div class="pingjia">
                        <div class="pingjia-item van-hairline--bottom" v-for="(item,index) in zhongList" :key="k">
                             <div class="pingjia-info">
                                 <div class="name">
                                     <img :src="item.user_picture" alt="" class="img">
                                     <div>{{item.nick_name}}</div>
                                </div>
                                 <div class="ping">
                                     <div>好评</div>
                                     <img src="../../../static/imgs/rp_star.png" alt="" class="img" v-for="(tt,ii) in item.star_num" :key="ks">
                                 </div>
                             </div> 
                             <div class="cont van-multi-ellipsis--l2">
                                 {{item.content}}
                             </div>
                             <div class="footer">
                                 <span>{{item.add_time}}</span>
                                 <span>交易金额¥{{item.total_pay}}</span>
                             </div>        
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="'差评'+good_info.pingjia.type_cha">
                <div class="content">
                    <div class="pingjia">
                        <div class="pingjia-item van-hairline--bottom" v-for="(item,index) in chaList" :key="k">
                             <div class="pingjia-info">
                                 <div class="name">
                                     <img :src="item.user_picture" alt="" class="img">
                                     <div>{{item.nick_name}}</div>
                                </div>
                                 <div class="ping">
                                     <div>好评</div>
                                     <img src="../../../static/imgs/rp_star.png" alt="" class="img" v-for="(tt,ii) in item.star_num" :key="ks">
                                 </div>
                             </div> 
                             <div class="cont van-multi-ellipsis--l2">
                                 {{item.content}}
                             </div>
                             <div class="footer">
                                 <span>{{item.add_time}}</span>
                                 <span>交易金额¥{{item.total_pay}}</span>
                             </div>        
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
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
            ,id: 0
            ,good_info: {
                pingjia: {
                    "fuwu": 0,
                    "taidu": 0,
                    "zhuanye": 0,
                    "zonghe": 0,
                    "type_hao": 0,
                    "type_zhong": 0,
                    "type_cha": 0,
                    "count": 0, 
                }
            }
            ,zongHeSart: 0
            ,haoList: []
            ,zhongList: []
            ,chaList: []
            ,haoPage: 0
            ,zhongPage: 0
            ,chaPage: 0
        }
    }
    ,methods: {
        onChange(event) {
            this.active = event.mp.detail.index
            this.getPingJia()
        }
        ,getData() {
            // 维修项目详情
            fly.post('/?v=V1&g=Doctor&c=Repair&a=getRepairDetail'+Fun.getParam(),{
                repair_id: this.id 
            }).then((res)=> {
                if(res.code == 0) {
                    this.good_info = res.data.good_info
                    console.log(this.good_info)
                     this.zongHeSart = this.getStarNum(this.good_info.pingjia.zonghe)
                } else {
                    console.log(res.message)
                }
            })
        }
        ,getPingJia() {
            let page = 1
            switch(this.active) {
                 case 0: // 好
                    page = ++this.haoPage
                break;
                 case 1:　// 中
                    page = ++this.zhongPage
                break;
                 case 2:　// 差
                    page = ++this.chaPage
                break;
            }
            fly.post('/?v=V1&g=Doctor&c=Repair&a=getRepairCommentList'+Fun.getParam(),{
                repair_id: this.id
                ,pingjia_type: this.active +1// 1好评2中评3差评
                ,page: page
                ,page_size: 15
            }).then((res)=> {
                if(res.code == 0) {
                    let data = res.data.list
                    for(let i in data) {
                        data[i].star_num = this.getStarNum(data[i].zonghe_pingjia)
                    }
                    switch(this.active) {
                        case 0: // 好
                           this.haoList = this.haoList.concat(data)
                        break;
                        case 1:　// 中
                            this.zhongList = this.zhongList.concat(data)
                        break;
                        case 2:　// 差
                            this.chaList = this.chaList.concat(data)
                        break;
                    }
                } else {
                    console.log(res.message)
                }
            })
        }
        ,getStarNum(num) {
            return ~~(num /20)
        }
    }
    ,mounted() {
        this.id = this.$mp.query.id
        this.getData()
        this.getPingJia()
    },
}
</script>
<style lang="less" scoped>
.detail {
    background: #F9F9F9;
    .content {
        .pingjia {
            background: #FFFFFF;
            
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
                .footer {
                    display: flex;
                    padding: 5px 0;
                    justify-content: space-between;
                    color:#8B8B8B;
                    font-size: 12px;
                }
            }
        }
       
    }
    .zhonghe {
        display: flex;
        padding: 10px 0;
        .left {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .zong {font-size: 12px; color:#4C5264;}
            .fen {color:#F6B503;font-size: 18px;}
            .star_img {
                display: flex;
                .img {width:12px;height: 12px;}
            }
        }
        .right {
            display: flex;
            width: 50%;
            flex-direction: column;
             justify-content: center;
            align-items: center;
            padding: 5px 0;
            .r-item {
                font-size: 12px;
                color:#4C5264;
                .fe {
                    color: #F6B503;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>

