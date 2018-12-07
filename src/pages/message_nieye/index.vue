<template>
<div class="neiye">
    <div class="neiye_item">
        <div class="header">
            <img src="http://placehold.it/100x100" class="img">
            <div class="info">
                <div class="name van-ellipsis">王老贴</div>
                <div class="time">14:52</div>
            </div>
            <div class="btn">回复</div>
        </div>
        <div class="cont">
            <div class="hd van-ellipsis">这是相当牛批呀老铁~</div>
            <div class="art">
                <img src="http://placehold.it/100x100" class="art_img">
                <div class="art_info">
                    <div class="art_title van-ellipsis">钢铁是怎么炼成的？</div>
                    <div class="art_con van-multi-ellipsis--l2">
                        我来告诉你钢铁是怎么炼成的，就像这样，地滴答滴滴地滴答滴滴地滴答滴滴地滴答滴滴地滴答滴滴地...
                    </div>
                </div>
            </div> 
        </div>
    </div>
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
.neiye {
    background: #f9f9f9;
    margin-top: 5px;
    &_item {
        margin-bottom: 10px;
        background: #ffffff;
        padding: 10px 20px;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .img {
                width: 28px;
                height: 28px;
                border-radius: 5px;
            }
            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding-left: 10px;
                .name {
                    font-size: 14px;
                    color:#4C5264;
                }
                .time {
                   color: #A1A1A1;
                   font-size: 8px; 
                }
            }
            .btn {
                border-radius: 11px;
                color:#ffffff;
                background: #5887F9;
                font-size: 12px;
                padding: 0 5px;
            }
        }
        .cont {
            padding: 0 20px;
            .hd {
                color:#4C5264;
                font-size: 14px;
                padding: 5px 0;
            }
            .art {
                display: flex;
                background: #F9F9F9;
                .art_img {width:50px;height: 50px;}
                .art_info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 10px;
                    .art_title {font-size: 14px;color:#4C5264;}
                    .art_con {font-size: 10px;color:#A2A2A2;}
                }
            }
        }
    }
}
</style>

