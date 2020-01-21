<template>
    <div class="historyDetails">
        <van-nav-bar
            title="历史协议详情"
            left-text="返回"
            left-arrow
            fixed
            @click-left="$router.go(-1)"
        />
        
        <div id="imgs">
            <van-cell-group>
                <!-- 公共 -->
                <van-cell title="集团级别" :value="data.value1"></van-cell>

                <van-cell title="产品簇" :value="data.firstLevel"></van-cell>

                <van-cell title="产品" :value="data.secondLevel"></van-cell>

                <van-cell title="卡类型" :value="data.thirdLevel" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="客户联系人" :value="data.value14"></van-cell>

                <van-cell title="集团客户名称" :value="data.value13"></van-cell>

                <van-cell title="客户联系电话" :value="data.value15"></van-cell>
                
                <van-cell title="客户联系邮件" :value="data.value16"></van-cell>

                <van-cell title="是否预存" :value="data.value2"></van-cell>

                <van-cell title="资费类型" :value="data.value3" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="标准资费" :value="data.value4" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="是否使用预存折扣权限" :value="data.value5" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="是否机卡绑定" :value="data.value6" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="是否使用机卡绑定折扣权限" :value="data.value7" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="承诺在网时长" :value="data.value8" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="承诺年收入" :value="data.value9" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="物联卡使用行业" :value="data.value17" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="物联卡使用场景" :value="data.value18" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="物联卡形态" :value="data.value19" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="是否开通流量共享功能" :value="data.value20" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="是否开通Onelink平台API服务" :value="data.value22" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="是否开通测试期及沉默期" :value="data.value21" v-if="data.secondLevel === '物联卡'"></van-cell>

                <van-cell title="业务类型" :value="data.value3" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="发送范围" :value="data.value23" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="异网需求" :value="data.value24" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="资费" :value="data.value4" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="黑名单管理方式" :value="data.value25" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="速率" :value="data.value26" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="企业签名" :value="data.value27" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="发送范围及内容说明" :value="data.value28" v-if="data.secondLevel === '云短彩(云MAS)'"></van-cell>

                <van-cell title="是否需要制作" :value="data.value29" v-if="data.secondLevel === '企业视频彩铃'"></van-cell>

                <van-cell title="制作费" :value="data.value32 + '元'" v-if="data.secondLevel === '企业视频彩铃' && data.value29 === '是'"></van-cell>

                <van-cell title="客户视频彩铃发送邮箱" :value="data.value30" v-if="data.secondLevel === '企业视频彩铃'"></van-cell>

                <van-cell title="客户经理视频彩铃发送邮箱" :value="data.value31" v-if="data.secondLevel === '企业视频彩铃'"></van-cell>

                <van-cell title="开通成员数" :value="data.value10"></van-cell>

                <van-cell title="最终单价" :value="data.value11"></van-cell>

                <van-cell title="最终报价" :value="data.value12"></van-cell>
            </van-cell-group>
        </div>


        <!-- 截屏部分 -->
        <!-- <div id="capture"></div> -->

        <div style="margin:20px 0;padding:0 0.1rem;">
            <van-button type="primary" size="large" @click="toImage">预览报价</van-button>
        </div>

        <!-- 生成报价单弹窗 -->
        <van-popup
            v-model="imgModal"
            closeable
            position="bottom"
            :style="{ height: '100%' }"
        >
			<h3 style="line-height:50px;padding-left:10px;">请长按保存报价单</h3>
            <img :src="imgUrl" alt="报价单" style="width:100%;" />
            <div style="margin:20px 0;padding:0 0.1rem;">
                <van-button type="primary" size="large" style="margin-top:10px;" @click="getFile">生成协议</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
// axios
import commonAxios from "@/api/commonAxios";
// 正则
import regulars from "@/assets/js/regulars";
// html2canvas
import html2canvas from "html2canvas";
// 轻提示
import { Notify , Toast } from 'vant';
export default {
    name: "historyDetails",
    components: {},
    data() {
        return {
            // 生成图片
            imgUrl: "",
            imgModal: false,
            data:{},
            proId:''
        };
    },
    methods: {
        // init
        init(id){
            // console.log(id);
            commonAxios.post(commonAxios.getUrl('prcPhoneDetail'),{
                userId:this.$store.state.userId,
                proId:id
            },res => {
                // if(res.status == 'success'){
                    // console.log(res);
                    this.data = res;
                // }else{
                    // Notify(res.message);
                // }
            })
        },
        // 截屏
        toImage() {
            html2canvas(document.querySelector("#imgs")).then(canvas => {
                var dataUrl = canvas.toDataURL();
                this.imgUrl = dataUrl;
                this.imgModal = true;
            });
        },
        // 下载文件
        getFile(){
            window.open(commonAxios.getUrl('prcPhoneDoc') + '?proId=' + this.proId);
        }
    },
    created() {
        if(this.$route.params.id) {
            this.proId = this.$route.params.id;
            this.init(this.$route.params.id); 
        }
    }
};
</script>

<style lang="scss">
.historyDetails {
    padding: 45px 0 50px 0;
}
</style>
