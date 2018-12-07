<template>
    <div class="renzheng">
        <van-tabs :active="active" @change="onChange" color="#5887F9">
            <van-tab title="已有帐号">
                <van-cell-group>
                    <van-field
                        :value="username"
                        v-model.lazy="username"
                        clearable
                        placeholder="请输入用户名/手机号"
                        :border="true"
                        left-icon="contact"
                       　@change="changeUsername"
                    />
                    <van-field
                        :value="userpwd"
                        v-model.lazy="userpwd"
                        type="password"
                        placeholder="请输入登录密码"
                        clearable
                        :border="true"
                        left-icon="password-view"
                        @change="changeUserpwd"
                    >
                    </van-field>
                </van-cell-group>
                <div class="btn">
                    <van-button @click="bangding" size="normal" custom-class="bc" block>绑定</van-button>
                </div>
            </van-tab>
            <van-tab title="快速注册">
                <van-cell-group>
                    <van-field
                        :value="mobile_phone"
                        v-model.lazy="mobile_phone"
                        placeholder="请输入手机号"
                        :border="true"
                        :error-message="mobile_phone_error"
                        @change="onChangePhone"
                    />
                    <van-field
                        :value="mobile_code"
                        placeholder="请输入验证码"
                        :border="true"
                        @change="onChangeCode"
                        use-button-slot
                    >
                    <van-button slot="button" size="small" type="primary" @click="getSms">{{sms_name}}</van-button>
                    </van-field>
                    <van-field
                        :value="pwd"
                        v-model.lazy="pwd"
                        type= "password"
                        placeholder="请输入密码"
                        :border="true"
                        @change="onChangePwd"
                    />
                    <van-field
                        :value="apwd"
                        v-model.lazy="apwd"
                        type= "password"
                        placeholder="请输入确认密码"
                        :border="true"
                        @change="onChangeApwd"
                    />
                </van-cell-group>

                <div class="btn">
                    <van-button @click="register" size="normal" custom-class="bc" block >立即注册</van-button>
                </div>

            </van-tab>  
            
        </van-tabs> 
        <van-toast id="van-toast" />
    </div>
</template>
<script>
import fly from '@/utils/fly'
import Toast from '../../../static/vant/toast/toast';
export default {
    data() {
        return {
           isCode: true
           ,sms_name: '发送验证码'
           ,mobile_phone: '' // 手机号
           ,mobile_phone_error: ''
           ,mobile_code: '' // 验证码
           ,isSub: false // 数据能否提交
           ,reg_phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/ // 验证手机号
           ,username: ''
           ,userpwd: ''
           ,pwd: ''
           ,apwd: ''
           ,pwd_error: ''
           ,status: true // 验证码发送状态
        }
    }
    ,computed: {
        userData() {
            var value = wx.getStorageSync('userData')
            return value
        }
    }
    ,watch: {
        mobile_phone(val,oldVal) {
            this.mobile_phone_error = this.reg_phone.test(val)?  '':'手机号码格式错误'
        }
        
    }
    ,methods: {
        getSms(){
            if(!this.reg_phone.test(this.mobile_phone)) {
                Toast('手机号不正确')
                return ;
            }
            if(this.isCode) {
                
                this.daojishi()  
            }           
        }
        ,bangding(){
            // 绑定旧账号
            if(this.username == '') {
                Toast('请输入用户名或手机号')
                return;
            }
            if(this.userpwd == '') {
                Toast('请输入密码')
                return ;
            }
            fly.post('/?d=wx_minprogram&v=V1&g=Common&c=Login&a=bindingUser&s='+this.userData.session_id,{
                binding_type:"wx_minprogram"
                ,user_name: this.username
                ,password:this.userpwd
            }).then((res)=>{
               if(res.code == 0) {
                   this.userData.user_id = res.data.user_id
                   // console.log(this.userData)
                   wx.setStorage({
                    key:"userData",
                    data:this.userData
                    })
                    wx.redirectTo({
                    url: '../index/main'
                    })
                    // wx.navigateBack({//返回
                    // delta:1
                    // })
               }else {
                   Toast(res.message)
               }
            })
        }
        ,register() {
            // 注册
            if(!this.status) {
                Toast('请获取验证码')
                return '';
            }
            if(this.mobile_code == '') {
                Toast('请输入验证码')
                return '';
            }
            console.log(this.pwd,this.apwd)
            if('' == this.pwd || ''== this.apwd || this.pwd != this.apwd ) {
                Toast('请检查密码是否一致')
                return '';
            }
                //             注册账号
                // http://cdzj.demo.com/Apiapi/?v=V1&g=Common&c=Login&a=registerUserByMobile 
                // register_type=wx_minprogram
                // mobile
                // password
                // sms_code
            fly.post('/?d=wx_minprogram&v=V1&g=Common&c=Login&a=registerUserByMobile&s='+this.userData.session_id,{
                mobile: this.mobile_phone
                ,password: this.pwd
                ,sms_code: this.mobile_code
            }).then((res)=> {
                console.log(res,res.message)
                if(res.code == 0) {
                    Toast('注册成功')
                   this.userData.user_id = res.data.user_id
                   // console.log(this.userData)
                   wx.setStorage({
                    key:"userData",
                    data:this.userData
                    })
                    wx.redirectTo({
                    url: '../index/main'
                    })
                    // wx.navigateBack({//返回
                    // delta:1
                    // })
               }else {
                   Toast(res.message)
               }
            })
        }
        ,daojishi(){
            let miao = 60
            this.isCode = false
            let itime = setInterval(()=>{
                if(--miao == 1) {
                   this.sms_name = `重新获取` 
                   this.isCode = true
                    clearInterval(itime)

                } else {
                    this.sms_name = `重新获取(${miao}s)` 
                }
                
            },1000)
            fly.post('/?d=wx_minprogram&v=V1&g=Common&c=Sms&a=sendSms&s='+this.userData.session_id,{
                mobile: this.mobile_phone
            }).then((res)=> {
               if(res.code == 0) {
                   Toast('验证码发送成功')
                   this.status = true
               }
            })
            
        }
        ,onChangePhone(event){
            this.mobile_phone = event.mp.detail
        }
        ,changeUsername(event) {
            this.username = event.mp.detail
        }
        ,changeUserpwd(event) {
            this.userpwd = event.mp.detail
        }
        ,onChangeCode(event){this.mobile_code = event.mp.detail}
        ,onChangePwd(event){this.pwd = event.mp.detail}
        ,onChangeApwd(event){this.apwd = event.mp.detail}
    }
}
</script>
<style lang="less">
.renzheng {
    background: #F9F9F9;
    .btn {
        width:90%;
        margin: 0 auto;
        padding-bottom: 40px;
        .bc {
            background: #5887F9;
            color: #ffffff;
        }
    }
}
</style>

