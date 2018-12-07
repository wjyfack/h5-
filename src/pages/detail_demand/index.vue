<template>
<div class="demand">
    <div class="header van-hairline--bottom">
        <div class="title">{{info.title}}</div>
        <div class="mini">
            <div>发布于：{{info.add_time}}</div>
            <div class="eye"><img src="../../../static/imgs/eye.png" alt="" class="eye-img">{{info.read_count}}</div>
        </div>
    </div>
    <div class="content">
        <div>{{info.content}}</div>
        <div class="cont-img">
            <img :src="item" alt="" class="cont-img-item" v-for="(item,index) in info.pics_str" :key="kkk">
        </div>
    </div>
    <div class="good">
        <div class="good-item">
            <div class="hd">目标预算</div>
            <div class="cont">{{info.budget}}元</div>
        </div>
        <div class="good-item">
            <div class="hd">期望天数</div>
            <div class="cont">{{info.qiwang_days}}天</div>
        </div>
        <div class="good-item">
            <div class="hd">需求者</div>
            <div class="cont">{{info.contact_name}}</div>
        </div>
        <div class="good-item">
            <div class="hd">联系方式</div>
            <div class="cont">{{info.contact_phone}}</div>
        </div>
    </div>
    <div class="bao">
        <div class="brand">已有{{info.quoted_count}}人报价</div>
        <div class="hd">报价记录</div>
        <div class="info" v-for="(item,index) in quotedList" :key="kkk">
            <div class="info-item"><div class="name">{{item.contact_name}}</div> <div>{{item.add_time}}</div></div>
            <div class="info-item"><div>联系方式：{{item.contact_phone}}</div></div>
            <div class="info-item"><div>预报单价：{{item.quoted_price}}</div></div>
            <div class="info-item"><div>所需时间： {{item.need_days}}天</div> 
            <div class="opt">
                <img src="../../../static/imgs/rp_gou.png" alt="" class="img">
                <img src="../../../static/imgs/edit.png" alt="" class="img">
            </div></div>
        </div>
    </div>
    <a :href="'../baojia/main?demand_id='+info.id" class="baojia">报价</a>
    <div class="tips">
        <div class="tips-item">1、以上所展示的信息由用户自行发布，内容的真实性、准确性和合法性由发布此信息的发布方负责。传动先生对此不承担任何保证责任。</div>
        <div class="tips-item">2、我们建议您在跟该用户发生任何交易之前，务必先确认其资质，若是涉及金额过大需先签署正规合同。请谨慎交易，谨防欺诈行为。</div>
    </div>
</div>
</template>
<script>
import fly from '@/utils/fly'
import Fun from '@/utils/index'
import * as Params from '@/utils/params'
export default {
    data() {
        return {
            id: 0
            ,info: {}
            ,quotedList: {}
        }
    }
    ,methods: {
        getData() {
            // 需求详情
            fly.post('/?v=V1&g=Doctor&c=Demand&a=getDemandDetail'+Fun.getParam(),{
                demand_id: this.id 
            }).then((res)=> {
                if(res.code == 0) {
                   this.info = res.data.info
                   this.quotedList = res.data.quoted_list
                } else {
                    console.log(res.message)
                }
            })
        }
    }
    ,mounted() {
        this.id = this.$mp.query.id
        this.getData()
    },
}
</script>
<style lang="less" scoped>
.demand {
    background: #F9F9F9;
    .header {
        margin-top: 5px;
        padding: 10px 20px;
        background: #ffffff;
        .title {
            font-size: 16px;
            font-weight: bold;
            color:#000;
        }
        .mini {
            display: flex;
            justify-content: space-between;
            padding-top: 5px;
            color:#8E8E8E;
            font-size: 8px;
            .eye {
                .eye-img {
                    width: 11px;
                    height: 7px;
                    margin-right: 5px;
                }
            }
        }
    }
    .content {
        color:#8E8E8E;
        font-size: 12px;
        background: #ffffff;
        padding: 10px 20px;
        margin-bottom: 5px;
        .cont-img {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-top: 5px;
            &-item {
                width: 76px;
                height: 76px;
                border-radius: 3px;
                margin-right: 10px;
            }
        }
    }
    .good {
        display: flex;
        justify-content: space-around;
        padding: 10px 20px;
        margin-bottom: 5px;
        background: #ffffff;
        .good-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            .hd {background: #5887F9;color:#ffffff;padding: 0 5px;border-radius: 8px;}
            .cont {color:#8E8E8E;padding-top: 5px;}
        }
    }
    .bao {
        position: relative;
        background: #ffffff;
        padding: 10px 20px;
        .hd {
            border-left: 4px solid #5887F9;
            color:#4C5264;
            font-size: 14px;
            padding-left: 5px;
            line-height: 1;
            margin-bottom: 10px;
        }
        .info {
            margin: 10px 0;
            border-radius: 5px;
            background: #F6F6F6;
            padding: 10px;
            .info-item {
                display: flex;
                justify-content:space-between;
                color:#8E8E8E;
                font-size: 10px;
                .name {color:#2E2E2E;}
                .opt {
                    display: flex;
                    .img {width:15px;height: 15px;margin-left: 5px;}
                }
            }
        }
        .brand {
           min-width: 84px; 
           text-align: center;
           border-top-left-radius: 11px;
           border-bottom-left-radius: 11px;
           background: #FC5F6B;
           color:#ffffff;
           position:absolute;
           top: 10px;
           right: 0;
           font-size: 10px;
           padding: 0 5px;
        }
    }
    .baojia {
        margin: 10px 20px;
        padding: 10px 20px;
        text-align: center;
        border-radius: 3px;
        font-size: 14px;
        background: #5887F9;
        color:#ffffff;
    }
    .tips {
        padding: 10px 20px 40px 10px;
        color:#828282;
        font-size: 10px;
        .tips-item {
            margin-bottom: 5px;
        }
    }
}
</style>

