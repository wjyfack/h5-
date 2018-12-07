<template>

    <div class="publish">
       <!-- <div class="img_select">
            <div class="img_select_item" @click="onImage">
                <img src="../../../static/imgs/add.png" class="img">
            </div> 
            <div class="img_select_item" v-for="(item,index) in imgArr" :key="key">
                <img :src="item" class="img">
                <img src="../../../static/imgs/close.png" class="close" @click="onClose(index)">
            </div>
        </div> -->
        <div class="bell">
            <div class="cells van-hairline--bottom" @click="onCloseSort">
                <div class="name">分类</div>
                <div class="detail">{{sort}} <img src="../../../static/imgs/arrow.png" class="arrow"></div>
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
        </van-cell-group>
        <van-cell-group >
            <van-field
                :value="deatil"
                placeholder="在此输入更加详细的信息~"
                :border="false"
                type="textarea"
                autosize
                @change="onChangedetail" 
            />
        </van-cell-group>
        </div>
        <div class="tips">问题描述的更清晰方便于他人为您解答哦~</div>
        <van-toast id="van-toast" />
        <div class="set_btn" v-if="isBtn">
            <van-button size="large" type="danger" square @click="onPublish">发布</van-button>
        </div>
         <van-popup :show="isSort" @close="onCloseSort" position="bottom" custom-class="sort_tree">
            <div class="back"><van-button size="small" type="default" @click="onCloseSort">返回</van-button></div>
            <div class="tree-select">
                <div class="tree-select__nav">
                    <div
                    v-for="(item, index) in sortOneList"
                    :key="key"
                    class="tree-select__nitem van-ellipsis"
                    @click="onClickNav(item.cat_id,index)"
                    :class="{'tree-select__nitem--active': index == sortOne}"
                    >
                    {{item.cat_name}}
                    </div>
                </div>
                <div class="tree-select__content">
                    <div
                    v-for="(item, index) in sortTwoList"
                    :key="key"
                    class="tree-select__item van-ellipsis"
                    :class="{'tree-select__item--active': index == sortTwo}"
                    @click="onSelectItem(item.cat_id,item.cat_name,index)"
                    >
                    {{item.cat_name}}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import Toast from '../../../static/vant/toast/toast';
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
import fly from '@/utils/fly'
export default {
    data() {
        return {
            title: ''
            ,detail: ''
            ,imgArr: []
            ,detail: ''
            ,sort: '分类'
            ,imgArr: []
            ,isSort: false // 分类
            ,isBtn: true
            ,sortOne: 0
            ,sortTwo: 0
            ,sortOneList: []
            ,sortTwoList: []
            ,cat_id: 0
            ,field_id: 0
        }
    }
    ,computed: {
        userData(){
            return wx.getStorageSync('userData')
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
                   
                    //console.log(res)
                    wx.uploadFile({
                        url: Params.default.host+'/?v=V1&g=Common&c=Upload&a=uploadImage'+Fun.getParam(),
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        formData: {
                            'img_classify': 'doctor'
                        },
                        success (datas){
                            const data = JSON.parse(datas.data)
                            console.log(data)
                            if(data.code == 0) {
                                 _this.demandData.pics_str.push(data.data.img_path)
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
           this.demandData.pics_str.splice(index,1);
        }
        ,getSort(pid) {
            fly.post('/?v=V1&g=Doctor&c=Cat&a=getCatsByPid'+Fun.getParam(), {
                pid: pid
                ,cat_type: 1
                ,sort_type: 2
            }).then((res) => {
                if(pid == 0) {
                    this.sortOneList = res.data.list
                } else {
                    this.sortTwoList = res.data.list
                }
            })
        }
        ,onClose(index) {
           this.imgArr.splice(index,1);
        }
        ,onPublish(){
            console.log(this.title,this.detail,this.cat_id,this.field_id)
            if(this.title == '') {
                Toast('请输入标题')
                return 
            }
            if(this.detail == '') {
                Toast('请输入内容')
                return
            }
            if(this.cat_id == 0 || this.field_id == 0) {
                Toast('请输入分类')
                return
            }
            // 发布咨询（必须登录）
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=Consult&a=postConsult
            // 'consult_id'			
            // 'cat_id'			
            // 'field_id'		
            // 'type'				//1普通,2一对一
            // 'to_user_id'		//一对一的专家id
            // 'title'			
            // 'content'			
            // 'is_open'			//1公开，0不公开
            fly.post('/?v=V1&g=Doctor&c=Cat&a=getCatsByPid'+Fun.getParam(), {
                'cat_id': this.cat_id		
                ,'field_id':this.field_id
                ,'type':1			//1普通,2一对一
                ,'title': this.title			
                ,'content': this.detail		
                ,'is_open': 1			//1公开，0不公开
            }).then((res) => {
                if(res.code == 0) {
                    Toast('发布成功,等待审核')
                    setTimeout(()=>{
                        wx.navigateBack({delta: 1})
                    },1500)
                } else {
                   Toast(res.message)
                }
            })
        }
        ,onCloseSort() {
            this.isSort = !this.isSort            
            this.isBtn = this.isSort ? false:true
          
        }
        ,onClickNav(pid,index) {
            this.sortOne = index
            this.cat_id = pid
            this.getSort(pid)
        }
        ,onSelectItem(pid,name,index){
            this.sortTwo = index
            this.field_id = pid
            this.sort = name
            this.onCloseSort()
        }
    }
    ,mounted: function(){
        this.getSort(0)
        console.log(this.userData)
        if(this.userData.user_id <= 0) {
            Toast('请先登录')
            // wx.nav
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
  font-size: 16px;
  min-height: 200px;
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

