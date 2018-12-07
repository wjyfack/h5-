<template>
    <div class="publish">
       <van-tabs :active="active" @change="onChange" :color="'#5887F9'" custom-class="fixed-tab">
            <van-tab title="维修">
                <div class="publish-item" v-for="(item, index) in repairList" :key="key">
                    <div class="cont">
                        <img :src="item.pics_str" alt="" class="or_img">
                        <div class="or_cont">
                             <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                             <div class="price"><div class="ya">￥</div><div class="men">1000.00</div></div>
                            <div class="mini-title"><div class="mini">评价 50</div><div class="mini">浏览 5651</div></div>
                        </div>
                       
                    </div>
                   
                    <div class="btn-list">
                        <div class="status" v-if="item.audit_status == 2">正在展示</div>
                        <div class="status" v-if="item.audit_status == 1">正在审核</div>
                        <div class="item">
                            <div class="btn-item c1" @click="changeRepair('sale',item.id,2)" v-if="item.is_onsale == 1">上架</div>
                            <div class="btn-item c1" @click="changeRepair('sale',item.id,1)" v-if="item.is_onsale == 2">下架</div>
                            <div class="btn-item" @click="changeRepair('detele',item.id,1)">删除</div>
                        </div>
                        
                    </div>
                </div>
            </van-tab>
            <van-tab title="需求">
            <div class="xuqiu">
                <div class="xuqiu-item" v-for="(item, index) in xuqiuList" :key="key">
                    <div class="title title van-multi-ellipsis--l">{{item.title}}</div>
                    <div class="cont title van-multi-ellipsis--l">{{item.content}}</div>
                    <div class="xuqiu-imgs">
                        <div class="img-item" v-for="(items, indexs) in item.pics_str" :key="keys"><img :src="items" alt="" class="img"></div>
                    </div>
                   
                    <div class="bar">
                        <div class="bar-item hl">已结束</div>
                        <div class="bar-item">已有{{item.quoted_count}}人报价</div>
                        <div class="time">{{item.add_time}}</div>
                    </div>
                    <div class="btn-list">
                        <div class="status"></div>
                        <div class="item">
                            <!-- <div class="btn-item c1">编辑</div>
                            <div class="btn-item">删除</div> -->
                        </div>
                    </div>
                </div>
            </div>  
            </van-tab>
            <van-tab title="咨询">
                <div class="consult">
                    <div class="consult-item" v-for="(item, index) in consultList" :key="key">
                        <div class="head">
                            <div class="cont">
                                <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                                <div class="mini">
                                    <div>{{item.nick_name}}</div>
                                    <div>{{expert_answer_count}} 评论</div>
                                </div>
                            </div>
                            <!-- <img src="http://placehold.it/100x100" alt="" class="img"> -->
                        </div>
                        <div class="btn-list">
                            <div class="status"></div>
                            <div class="item">
                                <!-- <div class="btn-item c1">编辑</div>
                                <div class="btn-item">删除</div> -->
                            </div>
                        </div>
                    </div>   
                </div>
            </van-tab>
        </van-tabs>
        <van-dialog id="van-dialog" />
        <van-toast id="van-toast" />
    </div>
</template>
<script>
import fly from '@/utils/fly'
import Fun from '@/utils/index'
import * as Params from '@/utils/params'
import Dialog from '../../../static/vant//dialog/dialog';
import Toast from '../../../static/vant/toast/toast';
export default {
    data() {
        return {
            active: 0
            ,repairList: []
            ,consultList: []
            ,xuqiuList: []
            ,pageRepair: 0
            ,pageXuqiu: 0
            ,pageConsult: 0
        }
    }
    ,methods: {
        onChange(event){
            console.log(event)
        }
        ,getdata() {
           this.getrepirList()
           this.getxuqiuList()
           this.getconsultList()
        }
        ,getrepirList(){
            fly.post('/?v=V1&g=Doctor&c=Repair&a=getMyRepairList'+Fun.getParam(),{
                keyword: ''
                ,page: this.pageRepair
                ,page_size: 10
            }).then((res)=>{
                console.log(res)
                this.repairList = this.repairList.concat(res.data.list)
            })
        }
        ,getxuqiuList(){
            fly.post('/?v=V1&g=Doctor&c=Demand&a=getMyDemandList'+Fun.getParam(),{
                keyword: ''
                ,page: this.xuqiuList
                ,page_size: 10
            }).then((res)=>{
                this.xuqiuList = this.xuqiuList.concat(res.data.list)
            })
        }
        ,getconsultList(){
            fly.post('/?v=V1&g=Doctor&c=Consult&a=getMyConsultList'+Fun.getParam(),{
                keyword: ''
                ,type: 0
                ,page: this.pageConsult
                ,page_size: 10
            }).then((res)=>{
                this.consultList = this.consultList.concat(res.data.list)
            })
        }
        ,changeRepair(opt,id,sale) {
            // 修改我的维修项目（必须登录）
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=Repair&a=editMyRepair
            // repair_id
            // type del_repair删除/on_sale上下架
            // val  删除时=1    上下架时1下架，2上架
            let type = 'on_sale'
            let title = '是否上架？'
            let sucTitle = '上架成功'
            switch(opt) {
                case 'sale':
                if(sale == 1) {
                    title = '是否下架？'
                    sucTitle = '下架成功'
                }
                break
                case 'detele':
                type = 'del_repair'
                title = '确实删除？'
                sucTitle = '删除成功'
                break
            }
            Dialog.confirm({
                title: title,
                message: ''
                }).then(() => {
                fly.post('/?v=V1&g=Doctor&c=Repair&a=editMyRepair'+Fun.getParam(),{
                    repair_id: id
                    ,type: type
                    ,val: sale
                    }).then((res)=>{
                       if(res.code == 0) {
                          
                           Toast(sucTitle)
                           this.repairList = []
                           this.getrepirList()
                       } else {
                           Toast('操作失败')
                       }
                    })
                }).catch(() => {
                // on cancel
            });
            
        }
    }
    ,mounted() {
        this.getdata()
    }
}
</script>
<style lang="less" scoped>
.publish {
 background:#F9F9F9;
.publish-item{
    background: #ffffff;
    padding: 10px 20px;
    margin-bottom: 10px;
     .cont {
         display: flex;
         .or_img {width:80px;height: 80px;border-radius: 5px;}
         .or_cont {
             flex: 1;
             display: flex;
             flex-direction: column;
             justify-content: space-around;
             padding-left: 10px;
             .title {
                 color:#4C5264;
                 font-size: 12px;
                 font-weight: bold;
             }
             .price {
                 display: flex;
                 align-items: center;
                 color:#FC5F6B;
                 .ya {font-size: 8px;}
                 .men {font-size: 12px;}
             }
             .mini-title {
                 display: flex;
                 .mini {
                    color:#A2A2A2;
                    font-size: 10px;
                    margin-right: 20px;  
                 } 
             }
         }
     }
    
 }
}
.btn-list {
    display: flex;
    align-items: center;
    padding: 5px 0;
    .status {font-size: 10px;color:#393939;}
    .item {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .btn-item {
            color: #FC5F6B;
            border: 1px solid #FC5F6B;
            font-size: 12px;
            min-width: 66px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;  
            border-radius: 20px;
        }
        .c1 {
            color:#393939;
            border-color:#C9C9C9;
        } 
    }
    
}
.xuqiu {
  background: #F9F9F9;
  &-item {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #FFFFFF;
    .title {color:#4C5264;font-size: 12px;}
    .cont {color:#8D8D8D;font-size: 10px;}
    
    .xuqiu-imgs {
      display: -webkit-box;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      height: 90px;
      .img-item {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        margin-right: 10px;
        .img {width: 100%;height:100%;border-radius: 5px;}
      }
    }
    .bar {
      display: flex;
      margin-top: 5px;
      &-item {
        color:#5887F9;
        font-size: 10px;
        background: #E8EFFF;
        padding: 0px 12px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .hl {
          color:#FC5F6B;
          background: #FCD7DA;
      }
      .time {
          flex:1;
          display: flex;
          justify-content: flex-end;
          font-size: 10px;
          color:#A7A7A7;
      }
    }
  }
}
.consult {
   background: #F9F9F9;
    &-item {
        background: #FFFFFF;
        padding:10px 20px 0 20px;
        margin-bottom: 10px;
        .head {
            display: flex;
            padding-bottom: 10px;
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

