<template>
<div class="message">
    <a class="message_item">
        <div class="art_img">
            <img src="../../../static/imgs/ms_zan.png" alt="" class="img">
            <!--<div class="abs_img"></div>-->
        </div>
        <div class="art_info">
            <div class="art_title">
                <div class="title">点赞</div>
                <div class="time"></div>
            </div>
            <div class="art_con">
                <div class="no_read"></div>
                <div class="mes">暂无消息</div>
            </div>
        </div>
    </a>
    <a class="message_item">
        <div class="art_img">
            <img src="../../../static/imgs/ms_tongzhi.png" alt="" class="img">
            <!--<div class="abs_img"></div>-->
        </div>
        <div class="art_info">
            <div class="art_title">
                <div class="title">通知</div>
                <div class="time"></div>
            </div>
            <div class="art_con">
                <div class="no_read"></div>
                <div class="mes">暂无消息</div>
            </div>
        </div>
    </a>
    <a class="message_item">
        <div class="art_img">
            <img src="../../../static/imgs/ms_pinglun.png" alt="" class="img">
            <!--<div class="abs_img"></div>-->
        </div>
        <div class="art_info">
            <div class="art_title">
                <div class="title">评论</div>
                <div class="time"></div>
            </div>
            <div class="art_con">
                <div class="no_read"></div>
                <div class="mes">暂无消息</div>
            </div>
        </div>
    </a>
</div> 
</template>
<script>
export default {
    data() {
        return {

        }
    } 
}
</script>
<style lang="less" scoped>
.message {
    margin-top: 5px;
    &_item {
        padding: 5px 20px;
        display: flex;
        background: #ffffff;
        .art_img {
            .img {
                width:50px;
                height: 50px; 
                border-radius: 5px;
            }
            position: relative;
            .abs_img {
                width: 10px;
                height: 10px;
                position: absolute;
                background: #FC5F6B;
                top: -3px;
                right: -3px;
                border-radius: 50%;
            }
        }
        .art_info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 10px;
            .art_title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title {font-size: 14px;color:#4C5264; align-self: flex-start;}
                .time {font-size: 12px;color:#A1A1A1;}
            }
            .art_con {
                font-size: 12px;
                display: flex;
                .no_read {
                    color: #FC5F6B;
                    padding-right: 10px;
                }
                .mes {color:#A1A1A1;}
            }
        }
        
    }
}
</style>

