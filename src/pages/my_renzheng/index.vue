<template>
    <div class="renzheng">
        <van-toast id="van-toast" />
        <div class="title">请填写您的个人信息</div>
        <van-cell-group>
            <van-field
                v-model="userInfo.real_name"
                placeholder="请输入真实姓名"
                :border="true"
                label="真实姓名："
                @change="onChangeName"
            />
            <van-field
                v-model="userInfo.self_num"
                placeholder="请输入身份证"
                :border="true"
                label="身份证号："
                @change="onChangeIdCards"
            />
            <van-field
                v-model="userInfo.bank_name"
                placeholder="请输入银行名称"
                :border="true"
                label="银行名称："
                @change="onChangeIbankName"
            />
            <van-field
                v-model="userInfo.bank_card"
                placeholder="请输入银行卡号"
                :border="true"
                label="银行卡号："
                 :error-message="ibanknum_error"
                @change="onChangeIbanknum"
            />
            <van-field
               v-model="userInfo.bank_mobile"
                placeholder="请输入手机号"
                :border="true"
                label="手机号："
                :error-message="mobile_phone_error"
                @change="onChangePhone"
            />
            <van-field
                :value="mobile_code"
                placeholder="请输入验证码"
                :border="true"
                label="验证码："
                use-button-slot
                @change="onChangeCode"
            >
            <van-button slot="button" size="small" type="primary" @click="getSms">{{sms_name}}</van-button>
            </van-field>
        </van-cell-group>
        <div class="title">请拍摄身份证正反面照片</div>
        <div class="idcard">
            <img :src="userInfo.front_of_id_card" alt="" class="idcard-item" @click="getImage(1)">
            <img :src="userInfo.reverse_of_id_card" alt="" class="idcard-item" @click="getImage(2)">
        </div>
        <div class="tips">
            <div class="tips-item">1.身份证信息仅供传动先生平台提供诚信保证使用。</div>
            <div class="tips-item">2.传动先生承诺不向其他第三方透露您的个人信息。</div>
        </div>
        <div class="btn">
            <van-button @click="onSubmit" size="normal" custom-class="bc" block>提交申请</van-button>
        </div>
        
    </div>
</template>
<script>
import Toast from '../../../static/vant/toast/toast';
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
export default {
    data() {
        return {
           isCode: true
           ,sms_name: '发送验证码'
           ,realName: '' // 真实姓名
           ,idcard: ''  // 身份证号
           ,idcard_error: ''  // 错误提示身份证号
           ,ibankcard: '' //银行名称
           ,ibanknum: '' //银行卡号
           ,ibanknum_error: '' //错误提示银行卡号
           ,mobile_phone: '' // 手机号
           ,mobile_phone_error: ''
           ,mobile_code: '' // 验证码
           ,img_z: ''
           ,img_f: ''
           ,proson_z: '/static/imgs/ren_p.png' // 身份证正面
           ,proson_f: '/static/imgs/ren_b.png' // 身份证反面
           ,isSub: false // 数据能否提交
           ,reg_phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/ // 验证手机号
           ,reg_idcard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/ // 验证身份证
           ,reg_ibankcard: /^([1-9]{1})(\d{14}|\d{18})$/ // 验证银行卡号
           ,status: false
           ,userInfo: {
               bank_name: ''//银行名称
               ,bank_card: ''//银行卡号
               ,bank_mobile: '' // 手机号
               ,front_of_id_card: ''// 身份证正面
               ,reverse_of_id_card: ''// 身份证反面
               ,real_name: ''// 真实姓名
               ,self_num: '' // 身份证号
           }
        }
    }
    ,methods: {
        onSubmit() {
            console.log(this.userInfo)
            if(!this.status) {
                Toast('请获取验证码')
                return;
            }
            if(this.userInfo.real_name == '') {
                Toast('请输入真实姓名')
                return ;
            }
            if(this.reg_idcard.test(this.userInfo.self_num)) {
                Toast('身份证号格式有误')
                return ;
            }
            if(this.userInfo.bank_name == '') {
                Toast('请输入银行名称')
                return ;
            }
            if(this.reg_ibankcard.test(this.userInfo.bank_card)) {
                Toast('银行卡号格式有误')
                return ;
            }
            if(this.reg_phone.test(this.userInfo.bank_mobile)) {
                Toast('手机号格式有误')
                return ;
            }
            if(this.mobile_code == '') {
                Toast('请输入验证码')
                return ;
            }
            if(this.img_z == '' || this.img_f) {
                Toast('请上传身份证')
                return ;
            }
            // 提交我的实名信息（必须登录）
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=User&a=editMyRealInfo
            // 'real_name'			//真实姓名
            // 'bank_mobile'		//银行手机号
            // 'bank_name'			//银行名
            // 'bank_card'			//银行卡号
            // 'self_num'			//身份证号
            // 'front_of_id_card'	//身份证正面
            // 'reverse_of_id_card'//身份证反面
            // 'sms_code'			//短信验证码
            fly.post('/?v=V1&g=Doctor&c=User&a=editMyRealInfo'+Fun.getParam(),{
                real_name: this.userInfo.real_name
                ,bank_mobile: this.userInfo.bank_mobile
                ,bank_name: this.userInfo.bank_name
                ,bank_card: this.userInfo.bank_card
                ,self_num: this.userInfo.self_num
                ,front_of_id_card: this.img_z
                ,reverse_of_id_card: this.img_f
                ,sms_code: this.mobile_code
            }).then((res)=>{
                console.log(res)
                if(res.code == 0) {
                    Toast('修改成功，等待审核')
                }
            })
        }
        ,getSms(){
            if(!this.reg_phone.test(this.userInfo.bank_mobile)) {
                Toast('手机号格式不正确')
                return;
            }   
            if(this.isCode) {
                this.daojishi()
            }           
        }
        ,getImage(index) {
            let _this = this
            wx.chooseImage({
                count: 1
                ,sizeType: ['original', 'compressed']
                ,sourceType: ['album', 'camera']
                ,success(res) {
                    // console.log(res)
                    _this.avatar = res.tempFilePaths[0]
                   
                    //console.log(res)
                    wx.uploadFile({
                        url: Params.default.host+'/?v=V1&g=Common&c=Upload&a=uploadImage'+Fun.getParam(),
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        formData: {
                            'img_classify': 'doctor'
                        },
                        success (datas){
                           let data = JSON.parse(datas.data)
                          
                            if(data.code == 0) {
                                if(index ==1) {
                                    _this.userInfo.front_of_id_card = res.tempFilePaths[0]
                                    _this.img_z = data.data.img_path

                                } else {
                                    _this.userInfo.reverse_of_id_card = res.tempFilePaths[0]
                                    _this.img_f = data.data.img_path
                                }
                                
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
            fly.post('/?v=V1&g=Common&c=Sms&a=sendSms&s='+Fun.getParam(),{
                mobile: this.userInfo.bank_mobile
            }).then((res)=> {
               if(res.code == 0) {
                   Toast('验证码发送成功')
                   this.status = true
               }
            })
        }
        ,onChangePhone(event){
             this.userInfo.bank_mobile = event.mp.detail
        }
        ,onChangeName(event){
             this.userInfo.real_name = event.mp.detail
        }
        ,onChangeIdcards(event) {
             this.userInfo.self_num = event.mp.detail
             console.log(this.userInfo.self_num)
        }
        ,onChangeIbanknum(event){
            this.userInfo.bank_card = event.mp.detail
        }
        ,onChangeIbankName(event){
            this.userInfo.bank_name = event.mp.detail
        }
        ,onChangeCode(event){
            this.mobile_code = event.mp.detail
        }
        ,getUserInfo(){
            fly.post('/?v=V1&g=Common&c=User&a=getMyRealInfo'+Fun.getParam())
            .then((res)=> {
                console.log(res)
                let data = res.data.user_real_info
                if(data.front_of_id_card == ''){
                   data.front_of_id_card = this.proson_z 
                }  else {
                    this.img_f =  data.reverse_of_id_card
                    data.front_of_id_card = Params.oHost+data.reverse_of_id_card
                }
                if(data.reverse_of_id_card == '' ){ 
                     data.reverse_of_id_card = this.proson_f
                }else {
                    this.img_z =  data.front_of_id_card
                    data.reverse_of_id_card =  Params.oHost+data.reverse_of_id_card
                } 
                this.userInfo = data
                console.log(this.userInfo)
                console.log(this.img_z,this.img_f)
            })
        }
    }
    ,mounted() {
        this.getUserInfo()
    },
}
</script>
<style lang="less" >
.renzheng {
    background: #F9F9F9;
    .title {
        font-size: 12px;
        color:#828282;
        padding: 10px 20px;
    }
    .idcard {
        background: #ffffff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding:20px 0;
        &-item {
            width: 127px;
            height: 87px;
        }
    }
    .tips {
        padding-top: 20px;
        padding-bottom: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        &-item {
            font-size: 12px;
            color:#828282;
        }
    }
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

