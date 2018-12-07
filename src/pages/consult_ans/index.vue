<template>
    <div class="publish">
        <div class="textarea-hi">
            <van-cell-group >
                <van-field
                    :value="deatil"
                    placeholder="在此输入回答内容~"
                    :border="false"
                    type="textarea"
                    autosize
                    @change="onChangedetail" 
                />
            </van-cell-group>
        </div>
       <div class="img_select">
            <div class="img_select_item" @click="onImage">
                <img src="../../../static/imgs/add.png" class="img">
            </div> 
            <div class="img_select_item" v-for="(item,index) in imgArr" :key="key">
                <img :src="item" class="img">
                <img src="../../../static/imgs/close.png" class="close" @click="onClose(index)">
            </div>
        </div>
        <div class="tips"></div>
        <van-toast id="van-toast" />
        <div class="set_btn" v-if="isBtn">
            <van-button size="large" type="danger" square @click="onPublish">提交</van-button>
        </div>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
import Toast from '../../../static/vant/toast/toast';
export default {
    data() {
        return {
            id: 0
            ,detail: ''
            ,imgArr: []
            ,imgs: []
            ,isBtn: true
            
        }
    }
    ,methods: {
        onChangedetail(event) {
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
                   
                    //console.log(res)
                    wx.uploadFile({
                        url: Params.default.host+'/?v=V1&g=Common&c=Upload&a=uploadImage'+Fun.getParam(),
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        formData: {
                            'img_classify': 'doctor'
                            //,'img_size': '400x400'
                        },
                        success (datas){
                            const data = JSON.parse(datas.data)
                            console.log(data)
                            if(data.code == 0) {
                                 _this.imgs.push(Params.oHost+data.data.img_path)
                            } else {
                                Toast('上传失败')
                            }
                        }
                    })
                }
                ,fail(res) {
                    console.log(res)
                }
            })    
        }
        ,onClose(index) {
           this.imgArr.splice(index,1);
           this.imgs.splice(index,1);
        }
        ,onPublish(){
            if(this.detail == '') {
                Toast('内容不能为空')
                return
            }
            let str = '' 
            for(let i in this.imgs) {
                str += "<img src='"+this.imgs[i] +"'/>"
            }
            let cont = '<p>'+this.detail+'</p><p>'+str+'</p>'
            // 咨询评论和回复(必须登录)
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=Consult&a=postConsultComment
            // content
            // consult_id
            // comment_id		//回复时必填这个和to_user_id，评论时没有这两个参数
            // to_user_id
            // is_niming			//1匿名 0 不匿名
            fly.post('/?v=V1&g=Doctor&c=Consult&a=postConsultComment'+Fun.getParam(),{
                consult_id: this.id
                ,content: cont
                ,is_niming: 0
            }).then((res)=> {
                if(res.code == 0) {
                    wx.navigateTo({
                    url: '../detail_consult/main?id='+this.id
                    })
                } else {
                    console.log(res.message)
                }
            })
        }
        
    }
    ,mounted() {
      let id = this.$mp.query.id
      this.id = id   
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
    }
}
.sort_tree {
    width: 100%;
    height: 100%;
    .back {padding: 10px;}
}
.bell {
    background: #FFFFFF;
    .cells {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        .name{
            font-size: 16px;
            color:#333;
        }
        .detail {
            display: flex;
            align-items: center;
            font-size: 14px;
            color:#B2B2B2;
            .arrow {
                margin-left: 5px;
                width:  6px;
                height: 11px;
                color: #5887F9;
            }
        }
    }
    
}
.tree-select {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  font-size: 16px
}

.tree-select__nav {
  width: 35%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: scroll;
  background-color: #fff;
  -webkit-overflow-scrolling: touch
}

.tree-select__nitem {
  line-height: 44px;
  padding: 0 15px;
  background-color: #fff
}

.tree-select__nitem--active,
.tree-select__nitem:active {
  background-color: #f8f8f8
}

.tree-select__nitem--active {
  font-weight: 500
}

.tree-select__content {
  padding: 0 15px;
  margin-left: 35%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch
}

.tree-select__item {
  position: relative;
  line-height: 44px;
  padding-left: 5px;
  padding-right: 18px
}

.tree-select__item--active,
.tree-select__item:active {
  color: #f44
}

.tree-select__selected {
  float: right;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: inherit
}
</style>

