<template>
    <div class="login">
        <img src="../../../static/imgs/logo.jpg" alt="" class="img" >
        <div class="p1">传动先生</div>
        <div class="p2">申请获取你的公开信息(昵称，头像等)</div>
        <div class="btn">
            <van-button size="normal" type="primary" block="true" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">微信授权</van-button>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
        }
    }
    ,methods: {
        bindGetUserInfo(e){ // 获取到的数据
            wx.setStorage({
                key:"userInfo",
                data:e.mp.detail
            })
           wx.redirectTo({url:'../index/main'})
        }
    }
    
}
</script>
<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .img {
        height: 80px;
        width:80px;
        border-radius: 50%;
        margin-top: 40px;
        margin-bottom: 10px;
    }
    .p1 {
        padding: 10px 0;
        font-size: 14px;
        color: #333;
    }
    .p2 {
        padding-bottom: 20px;
        font-size: 16px;
        color: #999;
    }
    .btn {
        width:90%;

    }
}
</style>
