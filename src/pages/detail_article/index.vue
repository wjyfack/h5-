<template>
<div class="consult">
    <div class="detail">
        <div class="head">
            {{info.title}}
        </div>
        <div class="info">
            <div class="person">
                <img :src="info.author_info.user_picture" alt="" class="img">
                <div class="infos">
                    <div class="name">{{info.author_info.nick_name}}</div>
                    <div class="eye">
                        <img src="../../../static/imgs/eye.png" alt="" class="eye-img">
                        {{info.read_count}}  /{{info.add_time}}
                    </div>
                </div>
            </div>
            <div class="guanzhu" @click="onFoucs" v-if="info.my_info.is_focus ==0">关注</div>   
            <div class="guanzhu" @click="onFoucs" v-if="info.my_info.is_focus ==1">已关注</div>   
        </div>
        <div class="cont">
            <p><wxParse :content="info.content"/></p>
            
        </div>
        <div class="btn-group">
            <div class="btn" @click="toColse('pin')"><img src="../../../static/imgs/con_hui.png" alt="" class="btn-img">评论</div>
            <div class="btn" @click="onShouc"><img src="../../../static/imgs/rp_star.png" alt="" class="btn-img"> <span v-if="info.my_info.is_coll == 0">收藏</span><span v-if="info.my_info.is_coll == 1">已收藏</span> </div>
            <!-- <div class="btn" @click="toColse('ju')"><img src="../../../static/imgs/con_ju.png" alt="" class="btn-img">举报</div> -->
            <!-- <div class="btn fr"><img src="../../../static/imgs/con_zhui.png" alt="" class="btn-img">追加悬赏</div> -->
        </div>
    </div>
    <div class="pinglun">
        <div class="hd">评论</div>
        <div class="pinglun-item" v-for="(item,index) in commentList" :key="key">
            <div class="header">
                <div class="infod">
                    <img :src="item.user_picture" alt="" class="avatar">
                    <div class="cont">
                        <span class="name">{{item.nick_name}}</span>
                        <span class="barnd">{{item.user_label}}</span>
                    </div>
                </div>
                <div class="jub" @click="toColse('ju',item.id,item.user_id)"><img src="../../../static/imgs/con_ju.png" alt="" class="img">举报</div>
            </div>
            <div class="content">
               {{item.content}} 
            </div>
            <div class="opt">
                <div class="time">{{item.add_time}}</div>
                <div class="option">
                    <!-- <div class="option-item"><img src="../../../static/imgs/p_use.png" alt="" class="opt-img">点赞</div> -->
                    <div class="option-item" @click="toColse('hui',item.id,item.user_id)"><img src="../../../static/imgs/con_hui.png" alt="" class="opt-img">回复</div>
                    <!-- <div class="option-item"><img src="../../../static/imgs/rp_star.png" alt="" class="opt-img">收藏</div>
                    <div class="option-item"><img src="../../../static/imgs/rp_share.png" alt="" class="opt-img">分享</div> -->
                </div>
            </div>
            <div class="footer">
                <div class="f-item" v-for="(items,indexs) in item.reply_list" :key="kes">
                    <span class="name">{{items.a_nick_name}}：</span>回复<span class="name">{{items.b_nick_name}}：</span>{{items.content}}<span class="recall"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="gix-tab van-hairline--top">
        <div class="tab-bottom">
            <div class="ans" @click="toColse('pin')">发表评论...</div>
            <!-- <div class="tab-item"><img src="../../../static/imgs/con_hui.png" alt="" class="img"></div> -->
            <div class="tab-item" @click="onShouc"><img src="../../../static/imgs/rp_star.png" alt="" class="img"></div>
            <div class="tab-item"><img src="../../../static/imgs/rp_share.png" alt="" class="img"></div> 
        </div>
    </div>
    <van-popup :show="show" @close="toColses" position="bottom">
        <div class="commit">
            <div class="commit-header"><div @click="toColses">取消</div>　<div @click="onSubmit">确定</div></div>
           
            <van-cell-group>
            <van-field
                :value="cont"
                placeholder="请输入内容"
                type="textarea"
                :border="false"
                autosize
                @change="onChangeCont"
            />
            </van-cell-group>

        </div>
    </van-popup>
<van-toast id="van-toast" />
</div>
</template>
<script>
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
import wxParse from 'mpvue-wxparse'
import Toast from '../../../static/vant/toast/toast';
export default {
    components: {
        wxParse
    },
    data() {
        return {
            id: 0
            ,show: false
            ,cont: ''
            ,info: {
                author_info: {}
                ,my_info: {}
            }
            ,option: 'pin'
            ,comment_id: 0
            ,to_user_id: 0
            ,commentList: []
            ,commentCount: 0 // 总评价数
        }
    }
    ,methods: {
        getData() {
            // 文章详情
            fly.post('/?v=V1&g=Doctor&c=Article&a=getArticleDetail'+Fun.getParam(),{
                article_id: this.id
            }).then((res)=> {
                
                if(res.code == 0) {
                    this.info = res.data
                 
                } else {
                    console.log(res.message)
                }
            })
        }
        ,getComment() {
            //获取咨询评论列表
            fly.post('/?v=V1&g=Doctor&c=Article&a=getArticleCommentList'+Fun.getParam(),{
                article_id: this.id
            }).then((res)=> {
                if(res.code == 0) {
                    this.commentCount = res.data.count
                    this.commentList = res.data.list
                } else {
                    console.log(res.message)
                }
            })
        }
        ,toColses() {
            this.show = !this.show
        }
        ,toColse(opt,comment_id,to_user_id) {
            this.show = !this.show
            this.option = opt
            this.comment_id = comment_id || 0
            this.to_user_id = to_user_id || 0
        }
        ,onChangeRadio(event) {
            this.radio = event.mp.detail
        }
        ,onChangeCont(event) {
            this.cont = event.mp.detail
        }
        ,onSubmit() {
            let url = '/?v=V1&g=Doctor&c=Article&a=postArticleComment'
            if(this.cont == '') {
                return ''
            }
            let data = {
                article_id: this.id
                ,content: this.cont
            }
            switch(this.option) {
                 case 'pin':

                break
                 case 'hui':
                    data.comment_id = this.comment_id
                    data.to_user_id = this.to_user_id
                break
                case 'ju': 
                 data = {
                     id: this.comment_id
                     ,type: 1
                     ,content: this.cont
                 }
                 url = '/?v=V1&g=Doctor&c=Common&a=jubao'
                break
            }
            // 评论/回复-文章(必须登录)
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=Article&a=postArticleComment
            // article_id 	
            // content
            // consult_id
            // comment_id		//回复时必填这个和to_user_id，评论时没有这两个参数
            // to_user_id
            fly.post(url+Fun.getParam(),data).then((res)=> {
                console.log(res)
                if(res.code == 0) {
                    if(this.option == 'ju') Toast('举报成功')
                    this.show = false
                    this.cont = ''
                    this.getComment()
                } else {
                    console.log(res.message)
                }
            })

        }
        ,onFoucs() {
            fly.post('/?v=V1&g=Doctor&c=Common&a=switchFocus'+Fun.getParam(),{
                to_user_id: this.info.author_info.user_id
            }).then((res)=> {
                
                if(res.code == 0) {
                    Toast('操作成功')
                    this.getData()
                } else {
                    console.log(res.message)
                }
            })  
        }
        ,onShouc() {
            fly.post('/?v=V1&g=Doctor&c=Common&a=switchColl'+Fun.getParam(),{
                id: this.info.id
                ,type:1
            }).then((res)=> {
                
                if(res.code == 0) {
                    Toast('操作成功')
                    this.getData()
                } else {
                    console.log(res.message)
                }
            })
        }
    }
    ,mounted() {
        this.id = this.$mp.query.id
        this.getData()
        this.getComment()
        // console.log(this.id)
    },
}
</script>
<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.consult {
    background: #F9F9F9;
    margin-top: 5px;
    padding-bottom: 40px;
    .detail {
        padding: 10px 20px;
        .head {
            font-size: 16px;
            color:#000;
        }
        .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .person {
                flex:1;
                display:flex;
                .img {
                    width: 31px;
                    height: 31px;
                    border-radius: 50%;
                }
                .infos {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-left: 5px;
                    .name {color:#000;font-size: 12px;}
                    .eye {
                        display: flex;
                        color:#8E8E8E;
                        font-size: 8px;
                        .eye-img {
                            width: 11px;
                            height: 7px;
                            display: flex;
                        }
                    }
                }
            }
            .guanzhu {
                background: #5887F9;
                border-radius: 11px;
                color:#ffffff;
                font-size: 12px;
                padding: 0 5px;
            }
        }
        .cont {
            color:#8E8E8E;
            font-size: 12px;
            image {
                width:100%;
                border-radius: 5px;
            }
        }
        .btn-group {
            display: flex;
            padding: 10px 0;
            .btn {
                border-radius: 3px;
                border: 1px solid #dddddd;
                color:#4C5264;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px 10px;
                font-size: 10px;
                margin-right: 5px;
                .btn-img {
                    width:11px;
                    height: 12px;
                    margin-right: 5px;
                }
            }
            .fr {
                float: right;
            }
        }
    }
    .pinglun {
        padding: 10px 20px;
        .hd {
            border-left: 4px solid #5887F9;
            color:#4C5264;
            font-size: 14px;
            padding-left: 5px;
            line-height: 1;
            margin-bottom: 10px;
        }
        .pinglun-item {
            padding-top: 5px;
           .header {
               display:flex;
               justify-content: space-between;
               .infod {
                   flex: 1;
                   display: flex;
                   .avatar {width:23px;height: 23px;margin-right: 5px;border-radius: 50%;}
                   .cont {
                       flex: 1;
                       display: flex;
                       justify-content: center;
                       flex-direction: column;
                       .name {font-size: 12px;color:#000;}
                       .barnd {color:#8E8E8E;font-size: 8px;}
                   }
               }
               .jub {
                   display: flex;
                   font-size: 8px;
                   color:#4C5264;
                   .img {width: 9px; height: 10px;margin-right: 5px;}
                   
               }
           } 
           .content {color:#8E8E8E;font-size: 12px;margin-top:5px;}
           .opt {
               display: flex;
               justify-content: space-between;
               align-items: center;
               .time {color:#8E8E8E;font-size: 8px;}
               .option {
                   color:#4C5264;
                   font-size: 8px;
                   display: flex;
                   padding: 5px 0;
                   .option-item {
                       display: flex;
                       margin-left: 10px;
                       .opt-img {width: 10px;height: 10px;margin-right:5px;}
                   }
               }
           }
           .footer {
               background: #F5F5F5;
               border-radius: 5px;
               padding: 5px 10px;
               .f-item {
                   font-size: 10px;
                   color:#4C5264;
                   .name {color:#5887F9;}
                   .recall {font-size: 8px;margin-left: 5px;}
               }
           }
        }
    }
    .gix-tab {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        .tab-bottom {
            display: flex;
            padding: 10px 20px;
            align-items: center;
            justify-content: space-between;
            .ans {flex: 1;color:#4C5264;font-size: 14px;}
            .tab-item {
                min-width: 50px;
                .img {width:26px;height: 25px;vertical-align: middle;}
            }
        }
    }
}
.commit {
    min-height: 150px;
   
    .commit-header {
        display:flex;
        padding: 10px 20px;
        justify-content: space-between;
        font-size: 14px;
        color:#5887F9;
    }
}
</style>

