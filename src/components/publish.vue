<template>
    <div class="content">
        <van-transition :show="isSort" name="slide-left">
        <div class="publish">
            <div class="img_select">
                <div class="img_select_item" @click="onImage">
                    <img src="../../static/imgs/add.png" class="img">
                </div> 
                <div class="img_select_item" v-for="(item,index) in imgArr" :key="key">
                    <img :src="item" class="img">
                    <img src="../../static/imgs/close.png" class="close" @click="onClose(index)">
                </div>
            </div> 
            <div class="textarea-hi">
                <van-cell-group class="">
                    <van-field
                        :value="title"
                        placeholder="在此填写标题"
                        :border=" true"
                        maxlength= "30"
                        @change="onChangeTittle"
                    />
                    <van-field
                        :value="deatil"
                        placeholder="在此输入更加详细的信息~"
                        type="textarea"
                        :border="false"
                        autosize
                        @change="onChangedetail" 
                    />

                </van-cell-group> 
            </div>
            <div class="addr">
                <van-icon name="location"></van-icon>
                <div class="addr_detail">佛山 南海</div>
            </div>   
            <div class="more_add">
                <van-cell-group>
                    <van-cell
                        title="分类"
                        is-link
                        value="分类"
                        :border="true"
                        @click="onClickSort"
                    />
                    <van-field
                        label="预算"
                        :value="yunsuan"
                        placeholder="输入您预算的金额~"
                        :border=" true"
                        
                    />
                    <van-field
                        label="联系手机"
                        :value="phone"
                        placeholder="输入您的手机号码~"
                        :border=" true"
                        
                    />
                    <van-field
                        label="联系人"
                        :value="concat"
                        placeholder="怎么称呼您呢？"
                        :border=" true"
                        
                    />
                </van-cell-group>
            </div>
            <div class="tips">填写完毕，按下方按钮发布~</div>
            <van-toast id="van-toast" />
            <div class="set_btn">
                <van-button size="large" square type="danger" @click="onPublish">发布</van-button>
            </div>
        </div>
        </van-transition>
        <van-transition :show="!isSort" name="slide-right">
            <van-tree-select
            :items="sorts"
            :main-active-index="0"
            :active-id="0"
            bind:click-nav="onClickNavs"
            bind:click-item="onClickItems"
            />
        </van-transition>
    </div>
</template>
<script>
import Toast from '../../static/vant/toast/toast';
export default {
    data() {
        return {
            title: ''
            ,isSort: true
            ,detail: ''
            ,imgArr: []
            ,sorts: [
                    {
                        // 导航名称
                        text: '所有城市',
                        // 该导航下所有的可选项
                        children: [
                        {
                            // 可选项的名称
                            text: '温州',
                            // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
                            id: 1002
                        },
                        {
                            // 可选项的名称
                            text: '杭州',
                            // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
                            id: 1001
                        }
                        ]
                    }
                ]
        }
    }
    ,methods: {
        onChangeTittle(event) {
           this.title = event.mp.detail
        }
        ,onChangedetail(event) {
           this.detail = event.mp.detail
        }
        ,onImage() {
            let _this = this
            if(_this.imgArr.length == 3) {
               Toast('最多显示3张图片');
               return false;
            }
            wx.chooseImage({
                count: 1
                ,sizeType: ['original', 'compressed']
                ,sourceType: ['album', 'camera']
                ,success(res) {
                    // console.log(res)
                    _this.imgArr.push(res.tempFilePaths)
                }
                ,fail(res) {
                    console.log(res)
                }
            })    
        }
        ,onClose(index) {
           this.imgArr.splice(index,1);
        }
        ,onPublish(){
            console.log('发表')
        }
       
        ,onClickSort() {
            this.isSort = !this.isSort
        }
        ,onClickNavs() { // 一级分类
            console.log(123)
        }
        ,onClickItems() { // 二级分类
            console.log(123)
        }
    }
    
}
</script>
<style lang="less" scoped>
.publish {
    background: #F9F9F9;
    .img_select {
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        margin-bottom: 10px;
        &_item {
            position: relative;
            width: 66px;
            height: 66px;
            box-sizing: border-box;
            border-radius: 5px;
            margin-right: 10px;
            .img {
                width: 66px;
                height: 66px;  
                border-radius: 5px;
            }
            .close {
                position:absolute;
                width:17px;
                height: 17px;
                right: -7px;
                top: -7px;
            }
             &:last-child {
                margin-right: 0;
            }
        }
       
    }
    .textarea-hi {
        min-height: 200px;
        background: #FFFFFF;
        
    }
    .addr {
        padding: 10px 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #FFFFFF;
        margin-bottom: 10px;
        &_detail {
            padding: 5px 0 5px 10px;
            font-size: 12px;
            color:#4C5264;
        }
    }
    .tips {
        padding: 10px;
        text-align: center;
        color:#5887F9;
        font-size: 10px;
    }
    .set_btn {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }
}
.content {
    padding-bottom: 50px;
}
</style>

