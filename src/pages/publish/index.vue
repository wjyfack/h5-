<template>
    <div class="content">
        <div class="publish">
            <div class="img_select">
                <div class="img_select_item" @click="onImage">
                    <img src="../../../static/imgs/add.png" class="img">
                </div> 
                <div class="img_select_item" v-for="(item,index) in imgArr" :key="key">
                    <img :src="item" class="img">
                    <img src="../../../static/imgs/close.png" class="close" @click="onClose(index)">
                </div>
            </div> 
            <div class="textarea-hi">
                <van-cell-group class="textarea-hi">
                    <van-field
                       
                        placeholder="在此填写标题"
                        :border=" true"
                        maxlength= "30"
                        @change="onChangeTittle"
                    />
                    <van-field
                        placeholder="在此输入更加详细的信息~"
                        type="textarea"
                        :border="false"
                        autosize
                        @change="onChangeDetail" 
                    />

                </van-cell-group> 
            </div>
            <!-- <div class="addr" @click="onCloseAddr">
                <van-icon name="location"></van-icon>
                <div class="addr_detail">{{area.province}} {{area.city}}</div>
            </div> -->
            <div class="bell">
                <div class="cells van-hairline--bottom" @click="onCloseSort">
                    <div class="name">分类</div>
                    <div class="detail">{{sort}} <img src="../../../static/imgs/arrow.png" class="arrow"></div>
                </div>
            </div>
            <div class="more_add">
                <van-cell-group>
                    <van-field
                        label="期望天数"
                        placeholder="输入期望天数~"
                        :border=" true"
                         @change="onChangQiwan" 
                    />
                    <van-field
                        label="预算"
                        placeholder="输入您预算的金额~"
                        :border=" true"
                         @change="onChangeDudget" 
                    />
                    <van-field
                        label="联系手机"
                        :value="phone"
                        placeholder="输入您的手机号码~"
                        :border=" true"
                         @change="onChangePhone" 
                    />
                    <van-field
                        label="联系人"
                        :value="concat"
                        placeholder="怎么称呼您呢？"
                        :border=" true"
                         @change="onChangeName" 
                    />
                </van-cell-group>
            </div>
            <div class="tips">填写完毕，按下方按钮发布~</div>
            <van-toast id="van-toast"/>
            <div class="set_btn" v-if="isBtn">    
                <van-button size="large" square type="danger" @click="onPublish">发布</van-button>
            </div>
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
        <!-- <van-popup :show="isAddr" @close="onCloseAddr" position="bottom" custom-class="sort_tree">
            <van-area :area-list="areaList" :columns-num="2" @cancel="onCloseAddr" @confirm="getAddr"/>
        </van-popup> -->
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
            sort: '分类'
            ,imgArr: []
            ,isSort: false // 分类
            ,isBtn: true
            ,sortOne: 0
            ,sortTwo: 0
            ,sortOneList: []
            ,sortTwoList: []
            ,reg_phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/ // 验证手机号
            ,reg_num: /\d*$/
            ,demandData: {
                user_id: 0
                ,cat_id: 0
                ,title: ''
                ,content: ''
                ,budget: 0
                ,contact_name: ''
                ,contact_phone: ''
                ,qiwang_days: 0
                ,pics_str: []
            }
            
        }
    }
    ,computed: {
        userData(){
            return wx.getStorageSync('userData')
        }
    }
    ,methods: {
         onChangeTittle(event) {
           this.demandData.title = event.mp.detail
        }
        ,onChangeDetail(event) {
           this.demandData.content = event.mp.detail
        }
        ,onChangQiwan(event) {
             this.demandData.qiwang_days = event.mp.detail
        }
        ,onChangeDudget(event) {
            this.demandData.budget = event.mp.detail
        }
        ,onChangeName(event) {
            this.demandData.contact_name = event.mp.detail
        }
        ,onChangePhone(event) {
            this.demandData.contact_phone = event.mp.detail
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
            }).then((res) => {
                if(pid == 0) {
                    this.sortOneList = res.data.list
                } else {
                    this.sortTwoList = res.data.list
                }
            })
        }
        ,onPublish(){
           
            this.demandData.user_id = this.userData.user_id
            if(this.demandData.user_id <= 0) {
                Toast('请登录')
                wx.navigateTo({url: '../my_login/main'})
                return;
            }
            if(this.demandData.title == '') {
                Toast('请输入标题')
                return;
            }
            if(!this.reg_num.test(this.demandData.qiwang_days)) {
                Toast('请输入天数')
                return;
            }
            if(!this.reg_num.test(this.demandData.budget)) {
                Toast('预算价格有误')
                return;
            }
            if(!this.reg_phone.test(this.demandData.contact_phone)) {
                Toast('电话号有误')
                return;
            }
            if(this.demandData.content == '') {
                Toast('请输入详情')
                return;
            }
            // 新增需求（必须登录）
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=Demand&a=addDemand
            // user_id
            // cat_id
            // title
            // content
            // budget
            // contact_name
            // contact_phone
            // qiwang_days
            // pics_str
            fly.post('/?v=V1&g=Doctor&c=Demand&a=addDemand'+Fun.getParam(),this.demandData)
                .then((res) => {
                    if(res.code == 0) {
                        if(res.data.demand_id) {
                            Toast('发布成功')
                            setTimeout(()=>{
                                wx.navigateBack({delta: 1})
                            },1000)
                        }
                       
                    }else {
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
            this.getSort(pid)
        }
        ,onSelectItem(pid,name,index){
            this.sortTwo = index
            this.demandData.cat_id = pid
            this.sort = name
            this.onCloseSort()
        }
    }
    ,mounted: function(){
        this.getSort(0)
        console.log(this.userData)
        if(this.userData.user_id <= 0) {
            Toast('请先登录')
            wx.navigateTo({url: '../my_logins/main'})
        }
    }
    
}
</script>
<style lang="less" scoped>
.bg-ff {
    background: #FFFFFF;
}
.sort_tree {
    width: 100%;
    height: 100%;
    .back {padding: 10px;}
}
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
        //padding: 5px 20px;
        background: #FFFFFF;
        .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #FC5F6B;
            color: #FFFFFF;
            padding:10px;
        }
    }
}
.content {
    padding-bottom: 50px;
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

