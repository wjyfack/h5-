<template>
    <div>
        <div class="bell">
            <div class="hearder">
                <img src="../../../static/imgs/bell_bg.png" alt="" class="img" mode="aspectFill">
                <div class="price">{{user_money}}</div>
            </div>
            
        </div>
         <div class="nongne">
            <a href="pages/publish/main" class="nongne_item van-hairline--bottom">
                <img src="../../../static/imgs/bell-l1.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">充值</div>
                <img src="../../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="" class="nongne_item van-hairline--bottom">
                <img src="../../../static/imgs/bell-l2.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">提现</div>
                <img src="../../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="" class="nongne_item van-hairline--bottom">
                <img src="../../../static/imgs/bell-l3.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">流水</div>
                <img src="../../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="" class="nongne_item van-hairline--bottom">
                <img src="../../../static/imgs/bell-l4.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">积分详情</div>
                <img src="../../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
            <a href="" class="nongne_item van-hairline--bottom">
                <img src="../../../static/imgs/bell-l5.png" alt="" class="nongne_img" mode="widthFix">
                <div class="name">我的优惠券</div>
                <img src="../../../static/imgs/arrow.png" alt="" class="arrow">
            </a>
           
        </div>
    </div>
    
</template>
<script>

export default {
    data() {
        return {
            user_money: 0
        }
    }
    ,mounted() {
        let  user_money = this.$mp.query.id
        this.user_money = user_money
    },
}
</script>
<style lang="less" scoped>
.bell {
    .hearder {
        // background: url('../../../static/imgs/bell_bg.png') center center no-repeat;
        // background-size: 100%;
        .img {
            width: 100%;
            height: 200px;
        }
        
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .price {
            position:absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            color: #ffffff;
            font-size: 40px;
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
            width: 23px;
            // height: 20px;
        }
        .name {
            flex: 1;
            font-size: 12px;
            color:#606060;
            padding-left: 10px;
        }
        .arrow {
            width:  6px;
            height: 11px;
            color: #5887F9;
        }
    }
}
</style>

