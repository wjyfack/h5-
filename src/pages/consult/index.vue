<template>
    <div class="content">
       <a href="" class="search"> 搜索您所寻找的答案~ <van-icon name="search" class="s_icon"/></a>
       <div class="bar">
           <a href="../consult_publish/main" class="bar-item">
               <img src="../../../static/imgs/consult_wenti.png" alt="" class="img" mode="aspectFit">
               <div class="name">问题发布</div>
           </a>
           <a href="" class="bar-item">
               <img src="../../../static/imgs/consult_new.png" alt="" class="img" mode="aspectFit">
               <div class="name">最新</div>
           </a>
           <a href="" class="bar-item">
               <img src="../../../static/imgs/consult_hot.png" alt="" class="img" mode="aspectFit">
               <div class="name">热门</div>
           </a>
           <a href="" class="bar-item">
               <img src="../../../static/imgs/consult_tuizhan.png" alt="" class="img" mode="aspectFit">
               <div class="name">推荐</div>
           </a>
           <a href="" class="bar-item">
               <img src="../../../static/imgs/consult_sort.png" alt="" class="img" mode="aspectFit">
               <div class="name">分类</div>
           </a>
       </div>
       <div class="consult">
            <div class="consult-hd van-hairline--bottom">
                <div class="hd">精选咨询</div>
            </div>
            <a href="" class="consult-item van-hairline--bottom">
                <div class="cont">
                    <div class="title van-multi-ellipsis--l2">什么联轴器才是最好用的呢用的呢用的呢用的呢用的呢用的呢</div>
                    <div class="mini">
                        <div>追风少年刘全有</div>
                        <div>2 评论</div>
                    </div>
                </div>
                <img src="http://placehold.it/100x100" alt="" class="img">
            </a>
       </div>
       <bar :act="1"></bar>
    </div>
</template>
<script>
import bar from '@/components/tabBar'
export default {
    data() {
        return {

        }
    }
    ,components: {
        bar
    }

}
</script>
<style lang="less" scoped>

.content {
    width: 100%;
    height: 100%;
    background: #f9f9f9;
    .search {
        margin: 10px 20px;
        color: #8E8E8E;
        background: #FFFFFF;
        border-radius: 20px;
        
        font-size: 12px;
        padding: 5px;
        text-align: center;
        .s_icon {
            margin-left: 5px;
            color:#0090ff;
        }
    }
    .bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #FFFFFF;
        padding: 10px 0;
        margin-bottom: 10px;
        &-item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .img {width: 25px;height: 25px;}
            .name {
                font-size: 12px;
                color: #4C5264;
            }
        }
    }
    .consult {
        background: #FFFFFF;
        &-hd {
            padding: 10px 0;
            .hd {
                padding-left: 10px;
                margin-left:20px;
                border-left: 4px solid #0090ff;
                font-size: 14px;
                color:#4C5264;
            }
        }
        &-item {
            display: flex;
            padding:10px 0;
            margin: 0 20px;
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
                }
            }
            
        }
    }
}
</style>

