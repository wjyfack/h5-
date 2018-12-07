<template>
    <div class="content">
       <a href="" class="search"> 搜索您所寻找的答案~ <van-icon name="search" class="s_icon"/></a>
       <div class="bar">
           <a href="../consult_publish/main" class="bar-item">
               <img src="../../static/imgs/consult_wenti.png" alt="" class="img" mode="aspectFit">
               <div class="name">问题发布</div>
           </a>
           <div class="bar-item" @click="changeSort('new')">
               <img src="../../static/imgs/consult_new.png" alt="" class="img" mode="aspectFit">
               <div class="name">最新</div>
           </div>
           <div class="bar-item" @click="changeSort('hot')">
               <img src="../../static/imgs/consult_hot.png" alt="" class="img" mode="aspectFit">
               <div class="name">热门</div>
           </div>
           <div class="bar-item" @click="changeSort('top')">
               <img src="../../static/imgs/consult_tuizhan.png" alt="" class="img" mode="aspectFit">
               <div class="name">推荐</div>
           </div>
           <div class="bar-item" @click="onCloseSort">
               <img src="../../static/imgs/consult_sort.png" alt="" class="img" mode="aspectFit">
               <div class="name">分类</div>
           </div>
       </div>
       <div class="consult">
            <div class="consult-hd van-hairline--bottom">
                <div class="hd">精选咨询</div>
            </div>
            <a :href="'../detail_consult/main?id='+item.id" class="consult-item van-hairline--bottom" v-for="(item,index) in consultList" :key="key">
                <div class="cont">
                    <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                    <div class="mini">
                        <div>{{item.nick_name}}</div>
                        <div>{{item.comment_count}} 评论</div>
                    </div>
                </div>
                <!-- <img src="http://placehold.it/100x100" alt="" class="img"> -->
            </a>
            <van-toast id="van-toast" />
       </div>
       <van-popup :show="isSort" @close="onCloseSort" position="bottom" custom-class="sort_tree">
            <div class="back"><van-button size="small" type="default" @click="onCloseSort">返回</van-button></div>
            <div class="tree-select">
                <div class="tree-select__nav">
                    <div
                    v-for="(item, index) in sortListOne"
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
                    v-for="(item, index) in sortListTwo"
                    :key="key"
                    class="tree-select__item van-ellipsis"
                    :class="{'tree-select__item--active': index == sortTwo}"
                    @click="onSelectItem(item.cat_id)"
                    >
                     {{item.cat_name}}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import Toast from '../../static/vant/toast/toast';
import Fun from '@/utils/index'
export default {
    data() {
        return {
            consultList: []
            ,sortListOne: []
            ,sortListTwo: []
            ,sortOne: 0
            ,sortTwo: 0
            ,page: 1
            ,sort: 'new' //new,hot,top
            ,cat_id: 0
            ,field_id:0
            ,page_size: 15
            ,loading: true // 加载中。。。
            ,isSort: false // 分类
            ,pid: 0
            ,cat_type: 1
            ,sort_type: 2
            ,param : '&d=wx_minprogram&s='+(wx.getStorageSync('userData').session_id == undefined ? '' : wx.getStorageSync('userData').session_id)
        }
    }
    ,methods: {
       
        onCloseSort() {
            this.isSort = !this.isSort 
        }
        ,changeSort(sort) {
            // console.log(sort)
            this.sort = sort
            this.page = 1
            this.consultList = []
            this.getRepairData()
        }
        ,onClickNav(pid,index) {
            this.pid = pid
            this.sortOne = index
            this.getSort()
        }
        ,onSelectItem(index){
            this.cat_id = index
            this.consultList = []
            this.onCloseSort()
            this.getRepairData()
        }
        ,getRepairData() {
            let _this = this
            fly.post('/?v=V1&g=Doctor&c=Consult&a=getConsultList'+this.param,{
                cat_id: this.cat_id
                ,field_id: this.field_id
                ,page: this.page
                ,sort:this.sort           //new,hot,top
                ,page_size: this.page_size
            }).then(function(res){
                // console.log(_this.consultList.concat(res.data.list))
                if(res.code == 0) {
                    _this.consultList =_this.consultList.concat(res.data.list)

                }
            }).catch(function(error){
                console.log(error)
            })
        }
        ,onLoading(){
            Toast.loading({
                duration: 1500,
                mask: true,
                message: '加载中...'
            });
        }
        ,getSort() {
            fly.post('/?v=V1&g=Doctor&c=Cat&a=getCatsByPid'+this.param,{
                pid:this.pid
                ,cat_type: this.cat_type
                ,sort_type: this.sort_type
            }).then((res)=> {
                console.log(res.data.list,1111)
                if(res.code == 0) {
                    if(this.pid == 0) { // 一级分类
                     this.sortListOne = res.data.list
                    
                    }else { // 二级分类
                        this.sortListTwo = res.data.list
                    }
                }
                
            })
        }
    }
    ,created() {
        this.getSort()
        this.getRepairData()
    }
     ,onReachBottom(){ // 底部添加更多
        this.onLoading()
        this.page += 1
        this.getRepairData()
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
.back{padding: 10px;}
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

