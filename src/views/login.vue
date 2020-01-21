<template>
    <div class="login">
        <!-- logo -->
        <h1 class="title"><img src="../assets/image/logo2.png" alt=""><span>政企行销工具</span></h1>

        <!-- 表单 -->
        <van-cell-group style="margin-bottom:0.5rem;">
            <van-field type="number" clearable v-model="phone" placeholder="请输入11位手机号码" />

            <van-field
                v-model="code"
                type="number"
                center
                clearable
                placeholder="请输入短信验证码">
                <van-button slot="button" size="small" type="primary" @click="getCode" :disabled="textDis">{{text}}</van-button>
            </van-field>
        </van-cell-group>

        <!-- 登录 -->
        <van-button type="primary" size="large" @click="login">登录</van-button>
    </div>
</template>

<script>
// axios
import commonAxios from '@/api/commonAxios'
// 正则
import regulars from '@/assets/js/regulars'
// 轻提示
import { Notify , Toast } from 'vant';
export default {
    name: 'home',
    components: {},
    data(){
        return {
            phone:'',
            code:'',
            text:'发送验证码',
            textDis:false,
            time:60,
            Interval:null
        }
    },
    methods:{
        login(){
            if(!regulars.phone.test(this.phone)){
                Notify('请输入正确格式的手机号码');
                return false;
            }

            if(!this.code){
                Notify('请输入验证码');
                return false;
            }

            Toast.loading({
                duration: 0,
                message: '登录中...',
                forbidClick: true,
                loadingType: 'spinner'
            });

            // login请求
            commonAxios.post(commonAxios.getUrl('basePhoneLogin'),{
                phone:this.phone,
                code:this.code
            },res => {
                Toast.clear();
                // console.log(res);
                if(res.status == 'success'){
                    Notify({ type: 'success', message: res.message });

                    // 存储vuex中
                    this.$store.commit('getUserId',res.user);

                    setTimeout(e => {
                        this.$router.push('/home/history');
                    },2000)
                }else{
                    Notify(res.message);
                }
            })
        },
        // 获取验证码
        getCode(){
            if(!regulars.phone.test(this.phone)){
                Notify('请输入正确格式的手机号码');
                return false;
            }

            commonAxios.get(commonAxios.getUrl('baseCode'),{
                phone:this.phone
            },res => {
                if(res.status == 'success'){
                    Notify({ type: 'success', message: res.message });

                    this.Interval = setInterval(e => {
                        this.getSecond();
                    },1000)
                }else{
                    Notify(res.message);
                }
            })
        },
        // 读秒
        getSecond(){
            if(this.time > 0){
                this.text = (this.time--) + ' s';
                this.textDis = true;
            }else {
                clearInterval(this.Interval);
                this.text = '发送验证码';
                this.textDis = false;
                this.time = 60;
            }
        }
    },
    created(){}
}
</script>

<style lang="scss" >
.login{
    padding: 0 0.1rem;
    font-size: 0.1rem;
    box-sizing: border-box;
    padding-top: 1rem;

    .title{
        margin:0.2rem 0 0.4rem 0;
        font-size: 0.25rem;
        font-weight: 500;
        text-align: center;
        position: relative;
        
        img{
            width: 0.45rem;
            margin-right: 0.1rem;
            vertical-align: middle;
        }
        span{
            position: relative;
            top: 2px;
        }
    }
}
</style>
