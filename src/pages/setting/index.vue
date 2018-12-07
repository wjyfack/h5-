<template>
    <div class="setting">
        <img :src="baseInfo.user_picture" alt="" class="avatar" @click="onImage">
        <div class="nicheng van-hairline--top">
            <van-field
                v-model="baseInfo.nick_name"
                required
                clearable
                label="昵称"
                placeholder="请输入昵称"
                @change="changeNmae"
            />
        </div>
        <div class="btn">
            <van-button @click="onSubmit" type="danger" size="large">提交</van-button>
        </div>
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
           avatar: ''
           ,baseInfo: {
               nick_name: ''
               ,user_picture: ''
           }
        }
    }
    ,methods :{
        onSubmit () {
        //    修改自己的用户信息（必须登录）
        //     http://cdzj.demo.com/Apiapi/?v=V1&g=Common&c=User&a=editMyInfo
        //     nick_name
        //     user_picture
            if(this.baseInfo.nick_name == '') {
                Toast('昵称不能为空')
                return ;
            }
           
            fly.post('/?v=V1&g=Common&c=User&a=editMyInfo'+Fun.getParam(),{
                nick_name: this.baseInfo.nick_name
                ,user_picture: this.avatar
            }).then((res)=> {
                    if(res.code == 0) {
                        Toast('修改成功,正在返回')
                        setTimeout(()=> {wx.navigateBack({ delta: 1})},1000)
                    }　else {
                        Toast(res.message)
                    }
                })
        }   
        ,changeNmae(e) {
            this.baseInfo.nick_name = e.mp.detail
        }
        ,onImage() {
            let _this = this
            wx.chooseImage({
                count: 1
                ,sizeType: ['original', 'compressed']
                ,sourceType: ['album', 'camera']
                ,success(res) {
                    // console.log(res)
                    _this.baseInfo.user_picture = res.tempFilePaths[0]
                   
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
                            if(data.code == 0) {
                                 _this.avatar= data.data.img_path
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
    }
    ,mounted() {
        const query = this.$mp.query
        if(query == null) {
             wx.navigateTo({url: '../my_login/main'})
        }
        this.baseInfo = query
        
    }
}
</script>
<style lang="less" scoped>
.setting {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin:30px 0;
    }
    .nicheng{
        width:100%;
        padding: 10px 0;
    }
    .btn {
        width:90%;
    }
}
</style>

