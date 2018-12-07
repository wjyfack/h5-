<template>
<div class="baojia">
    <div class="tips">请填写您的报价信息</div>
    <div class="form">
        <van-cell-group>
            <van-field
                v-model="formData.baojia"
                placeholder="报价人："
                border="true"
                @change="onChangeRen"
            />
            <van-field
                placeholder="联系电话："
                border="true"
                @change="onChangePho"
            />
            <van-field
                placeholder="预报价钱："
                border="true"
                @change="onChangeYu"
            />
            <van-field
                placeholder="所需时间(天)："
                border="true"
                @change="onChangeT"
            />
        </van-cell-group>
    </div>
    <div class="baojia" @click="onSubmit">报价</div>
    <van-toast id="van-toast" />
</div>
</template>
<script>
import fly from '@/utils/fly'
import * as Params from '@/utils/params'
import Fun from '@/utils/index'
import Toast from '../../../static/vant/toast/toast'
export default {
    data() {
        return {
            demand_id: 0
            ,formData: {
                baojia: ''
                ,dianhua: ''
                ,yujia: ''
                ,tianshu: ''
            }
            ,reg_phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/ // 验证手机号
            ,reg_price: /(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/
            ,reg_tian: /^[1-9]\d*$/
        }
    }
    ,methods: {
        onSubmit() {
            console.log(this.formData)
            if(this.formData.baojia == '') {
                Toast('请输入报价人')
                return ;
            }
            if(!this.reg_phone.test(this.formData.dianhua)) {
                Toast('电话格式不正确')
                return ;
            }
            if(!this.reg_price.test(this.formData.yujia)) {
                Toast('报价有误')
                return ;
            }
            if(!this.reg_tian.test(this.formData.tianshu)) {
                Toast('输入天数有误')
                return ;
            }
            // 需求报价
           
            fly.post('/?v=V1&g=Doctor&c=Demand&a=quotedDemand'+Fun.getParam(),{
                demand_id: this.demand_id
                ,contact_name: this.formData.baojia
                ,contact_phone: this.formData.dianhua
                ,quoted_price: this.formData.yujia
                ,need_days: this.formData.tianshu
                ,remarks: ''
            }).then((res)=> {
                console.log(res)
                if(res.code == 0) {
                   
                } else {
                    Toast(res.message)
                }
            })
        }
        ,onChangeRen(event) {
            this.formData.baojia = event.mp.detail
        }
        ,onChangePho(event) {
            this.formData.dianhua = event.mp.detail
        }
        ,onChangeYu(event) {
            this.formData.yujia = event.mp.detail
        }
        ,onChangeT(event) {
            this.formData.tianshu = event.mp.detail
        }
    }
    ,mounted() {
        this.demand_id = this.$mp.query.demand_id
        
    },
}
</script>
<style lang="less" scoped>
.baojia {
    background: #F9F9F9;
    .tips {
        color:#828282;
        font-size: 12px;
        padding: 10px 20px;
    }
    .form {
        padding-bottom: 50px;
    }
    .baojia {
        margin: 10px 20px;
        padding: 10px 20px;
        text-align: center;
        border-radius: 3px;
        font-size: 14px;
        background: #5887F9;
        color:#ffffff;
    }
}
</style>