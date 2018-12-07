<template>
    <div class="sure">
        <div class="tips">
            您选择了<div class="name">{{name}}</div>为您服务
        </div>
        <div class="title">
            <div class="lebal">您想要做</div>
            <div class="van-ellipsis">{{select.title}}</div>
        </div>
        <div class="shuliang">
            <div class="shu">
                <div class="lebal">服务单价</div>
                <div>{{allPrice}} 元</div>
            </div>
            <div><van-stepper :value="ci" @change="onChangeCiShu" :integer="true"/></div>
        </div>
       <div class="textarea-hi">
            <van-cell-group class="textarea-hi">
                <van-field
                    placeholder="在此输入更加详细的信息~"
                    type="textarea"
                    :border="false"
                    autosize
                    @change="onChangeDetail" 
                />

            </van-cell-group> 
        </div>
        <div class="addr" @click="onClose">
            <van-icon name="location"></van-icon>
            <div class="addr_detail"> <span v-if="area.detail == ''">请选择地址</span> <span v-else>{{area.detail.province}} {{area.detail.city}} {{area.detail.county}}</span></div>
        </div>
        <van-cell-group>
            <van-field
                placeholder="请输入详细地址"
                :border="true"
                @change="onChangeDatilAddr"
            />
            <van-field
                placeholder="请输入手机号"
                :border="true"
                @change="onChangePhone"
            />
            <van-field
                placeholder="请输入验证码"
                :border="true"
                @change="onChangeCode"
                use-button-slot
            >
            <van-button slot="button" size="small" type="primary" @click="getSms">{{sms_name}}</van-button>
            </van-field>
        </van-cell-group>

        <div class="btnss btn-s">
            <van-button @click="onSubmit" size="normal" custom-class="bc" block >提交</van-button>
        </div>
        <van-toast id="van-toast"/>
        <van-popup :show="show" @close="onClose" position="bottom">
             <van-area :area-list="areaList"  @cancel="onClose" @confirm="selectArea"/>
        </van-popup>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import Toast from '../../../static/vant/toast/toast';
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
export default {
   data() {
        return {
            name: ''
           ,select: 0
           ,ci: 1
           ,detailAddr: ''
           ,show: false
           ,area : {detail:''}
           ,sms_name: '发送验证码'
           ,reg_phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/ // 验证手机号
           ,detail: ''
           ,mobile_phone: ''
           ,mobile_code: ''
           ,isCode: true
           ,isCheck: false
           ,areaList: {}
        }
    }
    ,computed: {
        userData() {
            var value = wx.getStorageSync('userData')
            return value
        }
        ,allPrice() {
            return this.ci*this.select.price
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
        ,daojishi(){
            let miao = 60
            this.isCode = false
            this.isCheck = true
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
        ,onSubmit() {
            // 购买维修服务（必须登录）
            // http://cdzj.demo.com/Apiapi/?v=V1&g=Doctor&c=Repair&a=buyRepair
            // 'good_id'			int
            // 'attr_ids'			string（多个就用逗号隔开）
            // 'address_sheng'		int
            // 'address_shi'		int
            // 'address_qu'		int
            // 'address_detail'	string // 详细地址
            // 'service_time'		int　／／　服务时间
            // 'remark'			string　／／　详细需求
            // 'buy_count'			int　服务次数
            // 'contact_tel'		string
            // 'vcode'				string
            if(!this.isCheck) {
                Toast('请获取验证码')
                return 
            }
            if(this.detailAddr == '') {
                Toast('请输入详细地址')
                return 
            }
            if(this.area.detail == '') {
                Toast('请选择地址')
                return
            }
            if(!this.reg_phone.test(this.mobile_phone)) {
                Toast('电话格式不正确')
                return
            }
            if(this.vcode == '') {
                Toast('请输入验证码')
                return
            }
            
            fly.post('/?v=V1&g=Doctor&c=Repair&a=buyRepair'+Fun.getParam(),{
                'good_id': this.select.doctor_goods_id	
                ,'attr_ids':this.select.id		
                ,'address_sheng': this.area.values[0].code
                ,'address_shi':this.area.values[1].code
                ,'address_qu': this.area.values[2].code	
                ,'address_detail': this.detailAddr	 // 详细地址
                ,'service_time':0	//　服务时间 0 随时
                ,'remark':this.detail			//　详细需求
                ,'buy_count': this.ci		//　服务次数
                ,'contact_tel': this.mobile_phone	
                ,'vcode': this.mobile_code
            }).then((res)=> {
                console.log(res)
                if(res.code == 0) {
                    Toast('操作成功')
                    setTimeout((res)=> {
                        wx.navigateTo({
                        url: '../index/main'
                        })
                    },1500)
                } else {
                    Toast(res.message)
                }
            })
        }
        ,onChangePhone(event){
            this.mobile_phone = event.mp.detail
        }
        ,onChangeDetail(event) {this.detail = event.mp.detail}
        ,onChangeCode(event){this.mobile_code = event.mp.detail}
        ,onChangeCiShu(event) {this.ci = event.mp.detail}
        ,onChangeDatilAddr(event) {this.detailAddr = event.mp.detail }
        ,getareaList() {
            try {
            if(!wx.getStorageSync('areaList')) {
                fly.post('/?v=V1&g=Common&c=Area&a=getDoctorAreaAll')
                    .then((res) => {
                        if(res.code == 0) {
                            this.areaList = res.data
                            wx.setStorageSync('areaList', this.areaList)
                        }
                    })
            } else {
                this.areaList = wx.getStorageSync('areaList')
            }
            } catch(e) {
                console.log(e)
            }
        }
        ,onClose() {
            this.show = !this.show
        }
        ,selectArea(event) {
            this.area = event.mp.detail
            this.onClose()
            console.log(event)
        }
    }
    ,mounted() {
        let query = this.$mp.query
        this.name = query.name
        this.select = JSON.parse(query.select)
        this.getareaList()
    },
}
</script>
<style lang="less" scoped>
.sure {
    font-size: 16px;
    color:#4C5264;
    .tips {
        padding: 10px 20px;
        color:#828282;
        display:flex;
        .name {
            margin: 0 5px;
            color:#5887F9
        }
    }
    .title {
        display: flex;
         padding: 10px 20px;
        color:#4C5264;
        .lebal {margin-right: 5px;}
    }
    .shuliang {
        display: flex;
        padding: 10px 20px;
        align-items: center;
        .shu {
            flex: 1;
            display: flex;
            align-items: center;
            .lebal {margin-right: 5px;}
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
    .btn-s {
        margin-top: 20px;
    }
}
</style>

