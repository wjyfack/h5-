<template>
<div class="person">
    <div class="header">
        <div class="ruzhu" v-if="user_info.extend != undefined">
            <div>入驻时间: {{user_info.extend.ruzhu_time}}</div>
            <div> 从业时间: {{user_info.zhiye_nianxian}}年</div>
        </div>
        <div class="info">
            <img :src="user_info.user_picture" alt="" class="avatar">
            <div class="person">
                <div class="name">{{user_info.nick_name}}</div>
                <div class="barnd">
                    <span v-for="(item,index) in user_info.brand" :key="key" class="barnds">
                        <img src="../../../static/imgs/p_gong.png" v-if="item == 2" alt="" class="b-img">
                        <img src="../../../static/imgs/p_zhuan.png" v-if="item == 3" alt="" class="b-img">
                        <img src="../../../static/imgs/p_zuo.png" v-if="item == 1" alt="" class="b-img">
                    </span>
                    
                </div>
                <div class="jie">暂无信息</div>
            </div>
        </div>
    </div>
    <div class="cont">
            <div class="option">
                <!-- <div class="opt-btn">找他维修</div>
                <div class="opt-btn c1">关注Ta</div> -->
            </div>
            <div class="star" v-if="user_info.extend != undefined">
                <div class="star-item van-hairline--right">
                    <div class="star-img"><img src="../../../static/imgs/rp_star.png" alt="" class="img" v-for="(item, index) in user_info.xinyongdu" :key="index"></div>
                    <div>好评率</div>
                </div>
                <div class="star-item van-hairline--right">
                    <div class="star-img"><img src="../../../static/imgs/rp_star.png" alt="" class="img" v-for="(item, index) in user_info.zhuanyedu" :key="index" ></div>
                    <div>专业程度</div>
                </div>
                <div class="star-item">
                   <div class="cride">{{user_info.extend.haopinglv}}</div>
                    <div>好评率</div>
                </div>
            </div>
            <div class="goodfor van-hairline--bottom" v-if="user_info.extend != 'undefined'">
                <div class="goodfor-item" v-for="(item,idex) in user_info.extend.shanchanglingyu" :key="key">{{item}}</div>
            </div>
            <div class="guangzu">
                <div class="guangzu-item van-hairline--right">
                    <span class="b">{{user_info.focus_me}}</span>
                    <span>关注Ta的人</span>
                </div>
                <div class="guangzu-item">
                    <span class="b">{{user_info.my_focus}}</span>
                    <span>Ta关注的人</span>
                </div>
            </div>
        </div>
    <van-tabs :active="active" @change="onChange" color="#5887F9">
        <van-tab title="动态">
            <div class="dongtai" v-for="(item,index) in MixinsList" :key="key">
                <a :href="'../detail_repair/main?id='+item.repair_id" class="repair-item" v-if="item.type == 'new_repair'">
                    <div class="tade"><div>他发布了新的维修</div><div>{{item.add_time}}</div></div>
                    <div class="repair-imgs">
                    <div class="img-item" v-for="(items, indexs) in item.pics_str" :key="keys"><img :src="items" alt="" class="img"></div>
                    </div>
                    <div class="repair-title">{{item.title}}</div>
                    <div class="repair-price"><div class="yy">¥</div>　<div>{{item.price}}</div>  </div>
                </a>
                <a :href="'../detail_consult/main?id='+item.consult_id" class="consult-item van-hairline--bottom" v-else-if="item.type == 'new_consult'">
                    <div class="tade"><div>他发布了新的咨询</div><div>{{item.add_time}}</div></div>
                   
                    <div class="cont">
                        <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                        <div class="mini">
                            <div>{{item.read_count}}阅读</div>
                            <div>{{item.comment_count}} 评论</div>
                        </div>
                    </div>
                
                </a>
                <!-- 文章 -->
                 <a :href="'../detail_article/main?id='+item.article_id" class="article-item van-hairline--bottom" v-else-if="item.type == 'new_article'">
                    <div class="tade"><div>他发布了新的文章</div><div>{{item.add_time}}</div></div>
                    <div class="con">
                        <div class="cont">
                            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                            <div class="mini">
                                <div>{{item.read_count}}阅读</div>
                                <div>{{item.comment_count}} 评论</div>
                            </div>
                        </div>
                        <img src="item.list_pic" alt="" class="img">
                    </div>
                    
                </a>
                <a :href="'../detail_article/main?id='+item.article_id" class="article-item van-hairline--bottom" v-else-if="item.type == 'new_article_comment'">
                    <div class="tade"><div>他回答了该的文章</div><div>{{item.add_time}}</div></div>
                    <div class="ans">回答内容：　{{item.comment}}</div>
                    <div class="con">
                        <div class="cont">
                            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                            <div class="mini">
                                <div>{{item.read_count}}阅读</div>
                                <div>{{item.comment_count}} 评论</div>
                            </div>
                        </div>
                        <img src="item.list_pic" alt="" class="img">
                    </div>
                    
                </a>
                <a :href="'../detail_consult/main?id='+item.consult_id" class="new-consult-item" v-else-if="item.type == 'new_consult_comment'">
                    <div class="tade"><div>他回答了问题</div><div>{{item.add_time}}</div></div>
                    <div class="commit">{{item.comment}}</div>
                    <div class="cont">
                        <div class="or_cont">
                            <div class="title">
                               {{item.title}}
                            </div>
                             <div class="mini-title">{{item.content}}</div>
                        </div>
                    </div>
                </a>
            </div>
        </van-tab>
        <van-tab title="参与问答">
            <div class="dongtai" v-for="(item,index) in ansList" :key="key">
                 <a :href="'../detail_consult/main?id='+item.consult_id" class="consult-item van-hairline--bottom" v-if="item.type == 'new_consult'">
                    <div class="tade"><div>他发布了新的咨询</div><div>{{item.add_time}}</div></div>
                    <div class="cont">
                        <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                        <div class="mini">
                            <div>{{item.read_count}}阅读</div>
                            <div>{{item.comment_count}} 评论</div>
                        </div>
                    </div>
                </a>
                <a :href="'../detail_consult/main?id='+item.consult_id" class="new-consult-item" v-else-if="item.type == 'new_consult_comment'">
                    <div class="tade"><div>他回答了问题</div><div>{{item.add_time}}</div></div>
                    <div class="commit">{{item.comment}}</div>
                    <div class="cont">
                        <div class="or_cont">
                            <div class="title">
                               {{item.title}}
                            </div>
                             <div class="mini-title">{{item.content}}</div>
                        </div>
                    </div>
                </a>
            </div>
        </van-tab>
        <van-tab title="维修项目">
            <div class="dongtai">
                <a :href="'../detail_repair/main?id='+item.repair_id" class="repair-item" v-for="(item,index) in repairList" :key="key">
                    <div class="tade"><div>他发布了新的维修</div><div>{{item.add_time}}</div></div>
                    <div class="repair-imgs">
                    <div class="img-item" v-for="(items, indexs) in item.pics_str" :key="keys"><img :src="items" alt="" class="img"></div>
                    </div>
                    <div class="repair-title">{{item.title}}</div>
                    <div class="repair-price"><div class="yy">¥</div>　<div>{{item.price}}</div>  </div>
                </a>
            </div>
        </van-tab>
        <van-tab title="文章">
            <div class="dongtai" v-for="(item,index) in articleList" :key="key">
                <a :href="'../detail_article/main?id='+item.article_id" class="article-item van-hairline--bottom" v-if="item.type == 'new_article'">
                    <div class="tade"><div>他发布了新的文章</div><div>{{item.add_time}}</div></div>
                    <div class="con">
                        <div class="cont">
                            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                            <div class="mini">
                                <div>{{item.read_count}}阅读</div>
                                <div>{{item.comment_count}} 评论</div>
                            </div>
                        </div>
                        <img src="item.list_pic" alt="" class="img">
                    </div>
                </a>
                 <a :href="'../detail_article/main?id='+item.article_id" class="article-item van-hairline--bottom" v-else-if="item.type == 'new_article_comment'">
                    <div class="tade"><div>他回答了该的文章</div><div>{{item.add_time}}</div></div>
                    <div class="ans">回答内容：　{{item.comment}}</div>
                    <div class="con">
                        <div class="cont">
                            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
                            <div class="mini">
                                <div>{{item.read_count}}阅读</div>
                                <div>{{item.comment_count}} 评论</div>
                            </div>
                        </div>
                        <img src="item.list_pic" alt="" class="img">
                    </div>
                    
                </a>
            </div>
        </van-tab>
    </van-tabs>
     <van-toast id="van-toast" />
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
            ,active: 0
            ,user_info: {
                user_id: 0,
                nick_name: '',
                user_picture: '',
                real_name: '',
                status: 1,
                zhiye_nianxian: 7,
                extend: {
                    ruzhu_time: '',
                    haopinglv: 100,
                    zhuanyedu: 100,
                    xinyongdu: 100,
                    shanchanglingyu: []
                },
                my_focus: 0,
                focus_me: 0
            }
            ,MixinsList: []
            ,repairList: []
            ,articleList: []
            ,ansList: []
            ,type: 'all' //默认all,consult,repair,article
            ,page: 1
            ,mPage: 1
            ,repairPage:1
            ,ansPage: 1
            ,artPage: 1
        }
    }
    ,methods: {
        onChange(e) {
            this.active = e.mp.detail.index
            
        }
        ,getPerson() {
           fly.post('/?v=V1&g=Doctor&c=User&a=getUserIndex'+Fun.getParam(),{
               user_id:this.id
           }).then((res) =>{
               
               if(res.code == 0) {
                   let data = res.data.user_info
                   data.brand = Fun.getBrand(data.user_types)
                   data.xinyongdu = Fun.getStar(data.extend.xinyongdu)
                   data.zhuanyedu = Fun.getStar(data.extend.zhuanyedu)
                   this.user_info = data
                   console.log(this.user_info)
               }
            })     
        }
        ,getList() {
            fly.post('/?v=V1&g=Doctor&c=User&a=getUserIndexDongtai'+Fun.getParam(),{
               user_id:this.id
               ,type: this.type //默认all,consult,repair,article
               ,page: this.page
           }).then((res) =>{
              // console.log(res)
               Toast.clear()
               if(res.code == 0) {
                   switch(this.active) {
                        case 0:
                        this.MixinsList = this.MixinsList.concat(res.data.list)
                        break
                        case 1:
                        this.ansList = this.ansList.concat(res.data.list)
                        break
                        case 2:
                        this.repairList = this.repairList.concat(res.data.list)
                        break
                        case 3:
                        this.articleList = this.articleList.concat(res.data.list)
                        break
                    }
                   
               }
            })
        }
        ,getAnsList() {
            fly.post('/?v=V1&g=Doctor&c=User&a=getUserIndexDongtai'+Fun.getParam(),{
               user_id:this.id
               ,type: 'consult' //默认all,consult,repair,article
               ,page: 1
           }).then((res) =>{
               if(res.code == 0) {
                    this.ansList = this.ansList.concat(res.data.list)
                }
            })
        }
        ,getRepairList() {
            fly.post('/?v=V1&g=Doctor&c=User&a=getUserIndexDongtai'+Fun.getParam(),{
               user_id:this.id
               ,type: 'repair' //默认all,consult,repair,article
               ,page: 1
           }).then((res) =>{
               if(res.code == 0) {
                    this.repairList = this.repairList.concat(res.data.list)
                }
            })
        }
        ,getArtList() {
            fly.post('/?v=V1&g=Doctor&c=User&a=getUserIndexDongtai'+Fun.getParam(),{
               user_id:this.id
               ,type: 'article' //默认all,consult,repair,article
               ,page: 1
           }).then((res) =>{
               if(res.code == 0) {
                    this.articleList = this.articleList.concat(res.data.list)
                }
            })
        }
    }
    ,mounted() {
        this.id = this.$mp.query.id
        Toast.loading({
        mask: true,
        message: '加载中...'
        })
        this.getPerson()
        this.getList()
        this.getAnsList()
        this.getRepairList()
        this.getArtList()
    }
    ,onReachBottom(){ // 底部添加更多
      
        switch(this.active) {
            case 0:
            this.type = 'all'
            this.page = this.mPage++
            break
            case 1:
            this.type = 'consult'
            this.page = this.ansPage++
            break
            case 2:
            this.type = 'repair'
            this.page = this.repairPage++
            break
            case 3:
            this.type = 'article'
             this.page = this.artPage++
            break
        }
        Toast.loading({
        mask: true,
        message: '加载中...'
        })
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.person {
    .header {
        position: relative;
        background: #5887F9;
        color: #ffffff;
        height: 100px;
        .ruzhu {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            font-size: 12px;
        }
        .info {
            position: absolute;
            display: flex;
            left: 20px;
            top: 50px;
            .avatar {width:70px;height: 70px;border-radius: 5px;}
            .person {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-left: 10px;
                .name {color:#ffffff;font-size: 16px;}
                .barnd {
                    display: flex;
                    .barnds {
                        display: flex;
                    }
                    .b-img {
                        width: 22px;
                        height: 22px;
                        margin-right: 5px;
                    }
                }
                .jie {font-size: 12px;color:#8B8B8B;}
            }
        }
    }
    .cont {
        margin-top: 40px;
        .option {
            display: flex;
            justify-content: space-around;
            .opt-btn {
                font-size: 14px;
                color:#ffffff;
                padding: 5px 10px;
                border-radius: 5px;
                background: #4C5264;
            }
            .c1 {
                background: #5887F9;
            }
        }
        .star {
            display: flex;
            padding: 5px 20px;
            justify-content: space-around;
            align-items: center;
            .star-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-size: 14px;
                color:#4C5264;
                width:33%;
                text-align: center;
                .star-img {
                    display: flex;
                    justify-content: center;
                    .img {width:12px;height: 11px;}
                }
                .cride {font-size: 18px;color:#F6B503;text-align:center;}
            }
        }
        .goodfor {
            display: flex;
            justify-content: space-around;
            color:#5887F9;
            font-size: 12px;
            padding-bottom: 10px;
            margin: 0 20px;
            &-item {
                background: #D4E0FF;
                padding: 0 5px;
                border-radius: 4px;
            }
        }
        .guangzu {
            display: flex;
            margin: 10px 0;
            .guangzu-item {
                width: 50%;
                color: #4C5264;
                font-size: 14px;
                text-align: center;
                .b {font-weight: bold;}
            }
        }
    }
}
.dongtai {
    background: #f9f9f9;
}
.repair-item {
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #FFFFFF;
    .repair-header {
      display: flex;
      padding: 5px 0;
      .actor {width: 27px;height: 27px;margin-right: 10px;border-radius: 50%;}
      .self{
        flex: 1;
        display: flex;
        flex-direction: column;
        .name {font-size:12px;color:#4C5264; border-radius: 50%;}
        .info{
          font-size: 8px;
          display: flex;

          .addr {color: #A7A7A7;}
          .online {color:#2ECB8B;}
          .unline {color: #A7A7A7;}
        }
      }
    }
    .repair-imgs {
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
    .repair-title {
      font-size: 12px;
      color:#4C5264;
      padding-bottom: 5px;
    }
    .repair-price {
      display:flex;
      align-items: center;
      justify-content: flex-start;

      color: #FC5F6B;
      font-size: 12px;
      .yy {
        font-size: 8px;
      }
    }
  }
  .xuqiu-item {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #FFFFFF;
    .title {color:#4C5264;font-size: 12px;}
    .cont {color:#8D8D8D;font-size: 10px;}
    .name {font-size:10px;color: #A7A7A7;display: flex;justify-content: space-between;align-items: center;}
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
    }
  }
.consult-item {
    background: #FFFFFF;
    padding:10px 20px;
    margin-bottom: 10px;
   
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
            padding: 5px 0;
        }
    }  
}
.article-item {
    background: #FFFFFF;
    padding:10px 20px;
    margin-bottom: 10px;
    .ans {color:#4C5264;font-size: 14px;}
    .con {
        display: flex;
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
                padding: 5px 0;
            }
        } 
    }
   
    
}
.new-consult-item{
    background: #ffffff;
    padding: 10px 20px;
    margin-bottom: 10px;
     .commit {color:#4C5264;font-size: 14px;}
     .cont {
         background: #F9F9F9;
         margin: 10px 0;
         display: flex;
         .or_cont {
             flex: 1;
             display: flex;
             flex-direction: column;
             justify-content: space-around;
             padding-left: 10px;
             .title {
                 color:#4C5264;
                 font-size: 14px;
             }
             .mini-title {
                 color:#A2A2A2;
                 font-size: 10px;
             }
         }
     }

}
.tade {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color:#8B8B8B;
}

</style>

