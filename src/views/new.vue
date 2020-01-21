<template>
    <div id="newQuote">
        <van-nav-bar title="新建报价" fixed />

        <div id="capture">
            <van-cell-group>
                <!-- 集团级别 -->
                <van-field
                    readonly
                    clickable
                    label="集团级别"
                    :value="GroupLevelVal.text"
                    placeholder="请选择集团级别"
                    @click="GroupLevelModal = true"
                />

                <!-- 产品簇 -->
                <van-field
                    readonly
                    clickable
                    label="产品簇"
                    :value="ProductClusterVal.text"
                    placeholder="请选择产品簇"
                    @click="ProductClusterModal = true"
                />

                <!-- ------------------------------ 物联网产品簇 --------------------------------- -->
                <div v-show="ProductClusterVal.value == '0'">
                    <!-- 产品 -->
                    <van-field
                        readonly
                        clickable
                        label="产品"
                        :value="ProductVal.text"
                        placeholder="请选择产品"
                        @click="ProductModal = true"
                    />

                    <!-- 物联卡 - 卡类型 -->
                    <van-field
                        readonly
                        clickable
                        label="卡类型"
                        v-show="ProductVal.value == '0'"
                        :value="CardTypeVal.text"
                        placeholder="请选择卡类型"
                        @click="CardTypeModal = true"
                    />

                    <!-- 客户联系人 -->
                    <van-field
                        clearable
                        v-model="CustomerContact"
                        label="客户联系人"
                        placeholder="请输入客户联系人"
                    />

                    <!-- 集团客户名称 -->
                    <van-field
                        clearable
                        v-model="GroupCustomerName"
                        label="集团客户名称"
                        placeholder="请输入集团客户名称"
                    />

                    <!-- 客户联系电话 -->
                    <van-field
                        clearable
                        type="number"
                        v-model="CustomerContactPhone"
                        label="客户联系电话"
                        placeholder="请输入客户联系电话"
                    />

                    <!-- 客户联系邮件 -->
                    <van-field
                        clearable
                        v-model="CustomerContactMail"
                        label="客户联系邮件"
                        placeholder="请输入客户联系邮件"
                    />

                    <!-- 是否预存 -->
                    <van-field
                        readonly
                        clickable
                        label="是否预存"
                        :value="PreStoreVal.text"
                        placeholder="请选择是否预存"
                        @click="PreStoreClick"
                    />

                    <!-- 物联卡 - 资费类型 -->
                    <van-field
                        readonly
                        clickable
                        label="资费类型"
                        :value="TariffTypeVal.text"
                        v-show="ProductVal.value == '0' && PreStoreVal.value == '0'"
                        placeholder="请选择资费类型"
                        @click="TariffTypeModal = true"
                    />

                    <!-- 物联卡 - 标准资费 -->
                    <van-field
                        readonly
                        clickable
                        label="标准资费"
                        :value="StandardTariffVal.text"
                        v-show="ProductVal.value == '0' && PreStoreVal.value == '0'"
                        placeholder="请选择标准资费"
                        @click="StandardTariffModal = true"
                    />

                    <!-- 物联卡 - 是否使用预存折扣权限 -->
                    <van-field
                        readonly
                        clickable
                        label="是否使用预存折扣权限"
                        :value="StoredDiscountRightsVal.text"
                        v-show="ProductVal.value == '0'"
                        placeholder="是否使用预存折扣权限"
                        @click="StoredDiscountRightsModal = true"
                    />

                    <!-- 物联卡 - 是否机卡绑定 -->
                    <van-field
                        readonly
                        clickable
                        label="是否机卡绑定"
                        :value="CardBindingVal.text"
                        v-show="ProductVal.value == '0'"
                        placeholder="请选择是否机卡绑定"
                        @click="CardBindingModal = true"
                    />

                    <!-- 物联卡 - 是否使用机卡绑定折扣权限 -->
                    <van-field
                        readonly
                        clickable
                        label="是否使用机卡绑定折扣权限"
                        v-show="ProductVal.value == '0' && CardBindingVal.value == '0'"
                        :value="MachineCardBindingDiscountAuthorityVal.text"
                        placeholder="是否使用机卡绑定折扣权限"
                        @click="MachineCardBindingDiscountAuthorityModal = true"
                    />

                    <!-- 物联卡 - 承诺在网时间 -->
                    <van-field
                        readonly
                        clickable
                        label="承诺在网时间"
                        v-show="ProductVal.value == '0'"
                        :value="OnlineTimeVal.text"
                        placeholder="承诺在网时间"
                        @click="OnlineTimeModal = true"
                    />

                    <!-- 物联卡 - 承诺收入 -->
                    <van-field
                        readonly
                        clickable
                        label="承诺收入"
                        v-show="ProductVal.value == '0'"
                        :value="IincomeVal.text"
                        placeholder="承诺收入"
                        @click="IincomeModal = true"
                    />

                    <!-- 物联卡 - 使用行业 -->
                    <van-field
                        readonly
                        clickable
                        label="物联卡使用行业"
                        v-show="ProductVal.value == '0'"
                        :value="IoTCardUseIndustryVal"
                        placeholder="物联卡使用行业"
                        @click="IoTCardUseIndustryModal = true"
                    />

                    <van-field
                        clearable
                        v-model="IoTCardUseIndustryOther"
                        v-show="ProductVal.value == '0' && IoTCardUseIndustryVal == '其它'"
                        label="其他行业"
                        placeholder="请输入其他行业"
                    />

                    <!-- 物联卡 - 使用场景 -->
                    <van-field
                        readonly
                        clickable
                        label="物联卡使用场景"
                        :value="IoTCardUsageScenariosVal"
                        v-show="ProductVal.value == '0'"
                        placeholder="物联卡使用场景"
                        @click="IoTCardUsageScenariosModal = true"
                    />

                    <van-field
                        clearable
                        label="其他场景" 
                        v-model="IoTCardUsageScenariosOther"
                        v-show="ProductVal.value == '0' && IoTCardUsageScenariosVal == '其它'"
                        placeholder="请输入其他场景"
                    />

                    <!-- 物联卡 - 物联卡形态 -->
                    <van-field
                        readonly
                        clickable
                        label="物联卡形态"
                        v-show="ProductVal.value == '0'"
                        :value="IoTCardFormVal"
                        placeholder="物联卡形态"
                        @click="IoTCardFormModal = true"
                    />

                    <!-- 物联卡 - 是否开通流量共享 -->
                    <div v-show="ProductVal.value == '0'">
                        <van-field
                            readonly
                            clickable
                            label="是否开通流量共享"
                            v-show="(CardTypeVal.value == '0' && TariffTypeVal.value == '0') || (CardTypeVal.value == '1' && TariffTypeVal.value == '0') || (CardTypeVal.value == '2' && TariffTypeVal.value == '3')"
                            :value="TrafficSharingVal.text"
                            placeholder="是否开通流量共享"
                            @click="TrafficSharingModal = true"
                        />
                    </div>

                    <!-- 物联卡 - 是否开通Onelink平台API服务 -->
                    <van-field
                        readonly
                        clickable
                        label="是否开通Onelink平台API服务"
                        v-show="ProductVal.value == '0'"
                        :value="OnelinkApiVal.text"
                        placeholder="是否开通Onelink平台API服务"
                        @click="OnelinkApiModal = true"
                    />

                    <!-- 测试期(天) -->
                    <van-field
                        clearable
                        type="number"
                        v-show="ProductVal.value == '0'"
                        v-model="TestPeriod"
                        label="测试期(天)"
                        placeholder="测试期(天)"
                    />

                    <!-- 沉默期(月) -->
                    <van-field
                        clearable
                        type="number"
                        v-show="ProductVal.value == '0'"
                        v-model="SilentPeriod"
                        label="沉默期(月)"
                        placeholder="沉默期(月)"
                    />

                    <!-- 云短彩(云MAS) - 业务类型 -->
                    <van-field
                        readonly
                        clickable
                        label="业务类型"
                        :value="BusinessTypeVal.text"
                        v-show="ProductVal.value == '1'"
                        placeholder="业务类型"
                        @click="BusinessTypeModal = true"
                    />

                    <!-- 云短彩(云MAS) - 发送范围-->
                    <van-field
                        readonly
                        clickable
                        label="发送范围"
                        v-show="ProductVal.value == '1'"
                        :value="SendRangeVal.text"
                        placeholder="发送范围"
                        @click="SendRangeModal = true"
                    />

                    <!-- 云短彩(云MAS) - 异网需求 -->
                    <van-field
                        readonly
                        clickable
                        label="异网需求"
                        v-show="ProductVal.value == '1'"
                        :value="InterNetworkRequirementsVal.text"
                        placeholder="异网需求"
                        @click="InterNetworkRequirementsModal = true"
                    />

                    <!-- 云短彩(云MAS) - 资费 -->
                    <van-field
                        readonly
                        clickable
                        label="资费"
                        v-show="ProductVal.value == '1'"
                        :value="TariffVal.text"
                        placeholder="资费"
                        @click="TariffModal = true"
                    />

                    <!-- 云短信(云MAS) - 三网合一套餐 -->
                    <!-- <van-field
                        readonly
                        clickable
                        label="三网合一套餐"
                        v-show="ProductVal.value == '1' && InterNetworkRequirementsVal.value == '2'"
                        :value="TriplePlayVal.text"
                        placeholder="三网合一套餐"
                        @click="TriplePlayModal = true"
                    /> -->

                    <!-- 云短信(云MAS) - 全网短流程  -->
                    <!-- <van-field
                        readonly
                        clickable
                        label="全网短流程"
                        v-show="ProductVal.value == '1'"
                        :value="ShortProcessOfWholeNetworkVal.text"
                        placeholder="全网短流程"
                        @click="ShortProcessOfWholeNetworkModal = true"
                    /> -->

                    <!-- 云短彩(云MAS) - 黑名单管理方式  -->
                    <van-field
                        readonly
                        clickable
                        label="黑名单管理方式"
                        v-show="ProductVal.value == '1'"
                        :value="BlacklistManagementVal.text"
                        placeholder="黑名单管理方式"
                        @click="BlacklistManagementModal = true"
                    />

                    <!-- 云短彩(云MAS) - 速率  -->
                    <van-cell title="速率" value="50条/秒" v-show="ProductVal.value == '1'"/>

                    <!-- 云短彩(云MAS) - 企业签名  -->
                    <van-field
                        clearable
                        v-model="BusinessSignature"
                        label="企业签名"
                        v-show="ProductVal.value == '1'"
                        placeholder="请输入企业签名"
                        maxlength="8"
                        show-word-limit
                    />

                    <!-- 云短彩(云MAS) - 发送范围及内容说明  -->
                    <van-field
                        clearable
                        v-model="SendingRangeAndContent"
                        rows="2"
                        autosize
                        v-show="ProductVal.value == '1'"
                        label="发送范围及内容说明"
                        type="textarea"
                        maxlength="50"
                        placeholder="请输入发送范围及内容说明"
                        show-word-limit
                    />

                    <!-- 企业视频彩铃 - 是否需要制作 -->
                    <van-field
                        readonly
                        clickable
                        v-show="ProductVal.value == '2'"
                        label="是否需要制作"
                        :value="WhetherToMakeVal.text"
                        placeholder="是否需要制作"
                        @click="WhetherToMakeModal = true"
                    />

                    <!-- 企业视频彩铃 - 制作费 -->
                    <van-cell title="制作费" value="400元" v-show="ProductVal.value == '2' && WhetherToMakeVal.value == '400'"/>

                    <!-- 企业视频彩铃 - 客户视频彩铃发送邮箱 -->
                    <van-field
                        clearable
                        v-show="ProductVal.value == '2'"
                        v-model="CustomerVideoRingtoneMailbox"
                        label="客户视频彩铃发送邮箱"
                        placeholder="请输入客户视频彩铃发送邮箱"
                    />

                    <!-- 企业视频彩铃 - 客户经理视频彩铃发送邮箱 -->
                    <van-field
                        clearable
                        v-show="ProductVal.value == '2'"
                        v-model="ManagerVideoRingtoneMailbox"
                        label="客户经理视频彩铃发送邮箱"
                        placeholder="请输入客户经理视频彩铃发送邮箱"
                    />

                    <!-- 企业视频彩铃 - 功能费 -->
                    <van-field
                        readonly
                        clickable
                        v-show="ProductVal.value == '2'"
                        label="功能费"
                        :value="FunctionFeeVal.text"
                        placeholder="功能费"
                        @click="FunctionFeeModal = true"
                    />

                    <div id="topView">
                        <!-- 开通成员数 -->
                        <van-cell title="开通成员数" center>
                            <van-stepper v-model="CarNum" label="开通成员数" min="1" @change="CarNumChange" integer input-width="70px" button-size="32px" />
                        </van-cell>

                        <!-- 最终单价 --> 
                        <van-cell title="最终单价" :value="UnitPrice"></van-cell>

                        <!-- 最终报价 -->
                        <van-cell title="最终报价" :value="TotalPrice"></van-cell>
                    </div>
                </div>
            </van-cell-group>
        </div>

        <div style="margin:20px 0;padding:0 0.1rem;">
            <van-button type="primary" size="large" @click="toImage" style="margin-bottom:10px;">预览报价</van-button>
        </div>

        <!------------------------------------------------ 选择层 ------------------------------------------------>
        <!-- 集团级别 -->
        <van-popup v-model="GroupLevelModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="GroupLevelList"
                @cancel="GroupLevelModal = false"
                @confirm="onGroupLevelConfirmConfirm"
            />
        </van-popup>

        <!-- 产品簇 -->
        <van-popup v-model="ProductClusterModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="ProductClusterList"
                @cancel="ProductClusterModal = false"
                @confirm="onProductClusterConfirm"
            />
        </van-popup>

        <!-- 产品 -->
        <van-popup v-model="ProductModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="ProductList"
                @cancel="ProductModal = false"
                @confirm="onProductConfirm"
            />
        </van-popup>    

        <!-- 卡类型 -->
        <van-popup v-model="CardTypeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="CardTypeList"
                @cancel="CardTypeModal = false"
                @confirm="onCardTypeConfirm"
            />
        </van-popup>

        <!-- 是否预存 -->
        <van-popup v-model="PreStoreModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="PreStoreList"
                @cancel="PreStoreModal = false"
                @confirm="onPreStoreConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 是否机卡绑定 -->
        <van-popup v-model="CardBindingModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="CardBindingList"
                @cancel="CardBindingModal = false"
                @confirm="onCardBindingConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 资费类型 -->
        <van-popup v-model="TariffTypeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="TariffTypeList"
                @cancel="TariffTypeModal = false"
                @confirm="onTariffTypeConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 标准资费 -->
        <van-popup v-model="StandardTariffModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="StandardTariffList"
                @cancel="StandardTariffModal = false"
                @confirm="onStandardTariffConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 是否使用预存折扣权限 -->
        <van-popup v-model="StoredDiscountRightsModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="StoredDiscountRightsList"
                @cancel="StoredDiscountRightsModal = false"
                @confirm="onStoredDiscountRightsConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 是否使用机卡绑定折扣权限 -->
        <van-popup v-model="MachineCardBindingDiscountAuthorityModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="MachineCardBindingDiscountAuthorityList"
                @cancel="MachineCardBindingDiscountAuthorityModal = false"
                @confirm="onMachineCardBindingDiscountAuthorityConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 承诺在网时间 -->
        <van-popup v-model="OnlineTimeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="OnlineTimeList"
                @cancel="OnlineTimeModal = false"
                @confirm="onOnlineTimeConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 承诺收入 -->
        <van-popup v-model="IincomeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="IincomeList"
                @cancel="IincomeModal = false"
                @confirm="onIincomeConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 使用行业 -->
        <van-popup v-model="IoTCardUseIndustryModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="IoTCardUseIndustryList"
                @cancel="IoTCardUseIndustryModal = false"
                @confirm="onIoTCardUseIndustryConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 使用场景 -->
        <van-popup v-model="IoTCardUsageScenariosModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="IoTCardUsageScenariosList"
                @cancel="IoTCardUsageScenariosModal = false"
                @confirm="onIoTCardUsageScenariosConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 物联卡形态 -->
        <van-popup v-model="IoTCardFormModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="IoTCardFormList"
                @cancel="IoTCardFormModal = false"
                @confirm="onIoTCardFormConfirm"
            />
        </van-popup>
            
        <!-- 物联卡 - 是否开通流量共享 -->
        <van-popup v-model="TrafficSharingModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="TrafficSharingList"
                @cancel="TrafficSharingModal = false"
                @confirm="onTrafficSharingConfirm"
            />
        </van-popup>

        <!-- 物联卡 - 是否开通Onelink平台API服务 -->
        <van-popup v-model="OnelinkApiModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="OnelinkApiList"
                @cancel="OnelinkApiModal = false"
                @confirm="onOnelinkApiConfirm"
            />
        </van-popup>

        <!-- 云短彩(云MAS) - 业务类型 -->
        <van-popup v-model="BusinessTypeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="BusinessTypeList"
                @cancel="BusinessTypeModal = false"
                @confirm="onBusinessTypeConfirm"
            />
        </van-popup>

        <!-- 云短彩(云MAS) - 发送范围-->
        <van-popup v-model="SendRangeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="SendRangeList"
                @cancel="SendRangeModal = false"
                @confirm="onSendRangeConfirm"
            />
        </van-popup>

        <!-- 云短彩(云MAS) - 异网需求 -->
        <van-popup v-model="InterNetworkRequirementsModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="InterNetworkRequirementsList"
                @cancel="InterNetworkRequirementsModal = false"
                @confirm="onInterNetworkRequirementsConfirm"
            />
        </van-popup>

        <!-- 云短信(云MAS) - 资费 -->
        <van-popup v-model="TariffModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="TariffList"
                @cancel="TariffModal = false"
                @confirm="onTariffConfirm"
            />
        </van-popup>

        <!-- 云短信(云MAS) - 三网合一套餐 TriplePlay -->
        <!-- <van-popup v-model="TriplePlayModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="TriplePlayList"
                @cancel="TriplePlayModal = false"
                @confirm="onTriplePlayConfirm"
            />
        </van-popup> -->

        <!-- 云短信(云MAS) - 全网短流程   ShortProcessOfWholeNetwork -->
        <!-- <van-popup v-model="ShortProcessOfWholeNetworkModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="ShortProcessOfWholeNetworkList"
                @cancel="ShortProcessOfWholeNetworkModal = false"
                @confirm="onShortProcessOfWholeNetworkConfirm"
            />
        </van-popup> -->

        <!-- 云短彩(云MAS) - 黑名单管理方式  -->
        <van-popup v-model="BlacklistManagementModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="BlacklistManagementList"
                @cancel="BlacklistManagementModal = false"
                @confirm="onBlacklistManagementConfirm"
            />
        </van-popup>

        <!-- 企业视频彩铃 - 是否需要制作 -->
        <van-popup v-model="WhetherToMakeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="WhetherToMakeList"
                @cancel="WhetherToMakeModal = false"
                @confirm="onWhetherToMakeConfirm"
            />
        </van-popup>

        <!-- 企业视频彩铃 - 功能费 -->
        <van-popup v-model="FunctionFeeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="FunctionFeeList"
                @cancel="FunctionFeeModal = false"
                @confirm="onFunctionFeeConfirm"
            />
        </van-popup>

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
    name: "new",
    components: {},
    data() {
        return {
            // proId
            proId:'',
            // 集团级别
            GroupLevelList: [
                { text: "A", value: 0 },
                { text: "B", value: 1 },
                { text: "C", value: 2 },
                { text: "D", value: 3 }
            ],
            GroupLevelModal: false,
            GroupLevelVal: { text: "A", value: 0 },
            // 产品簇
            ProductClusterList: [
                { text: "物联网产品簇", value: 0 },
                { text: "专线产品簇", value: 1 },
                { text: "IDC产品簇", value: 2 }
            ],
            ProductClusterModal: false,
            ProductClusterVal: { text: "物联网产品簇", value: 0 },
            // 产品
            ProductList:[
                { text: "物联卡", value: 0 },
                { text: "云短彩(云MAS)", value: 1 },
                { text: "企业视频彩铃", value: 2 }
            ],
            ProductModal: false,
            ProductVal: { text: "物联卡", value: 0 },
            // 卡类型
            CardTypeList: [
                { text: "通用流量卡", value: 0 },
                { text: "定向流量卡", value: 1 },
                { text: "NB物联卡", value: 2 }
            ],
            CardTypeModal: false,
            CardTypeVal: { text: "通用流量卡", value: 0 },
            // 是否预存
            PreStoreList: [
                { text: "是", value: 0 },
                { text: "否", value: 1 }
            ],
            PreStoreModal: false,
            PreStoreVal: { text: "是", value: 0 },
            // 客户联系人
            CustomerContact: "",
            // 客户联系电话
            CustomerContactPhone: "",
            // 客户联系邮件
            CustomerContactMail: "",
            // 集团客户名称
            GroupCustomerName:'',
            // 开通成员数
            CarNum: 1, 
            // 最终单价
            UnitPrice: 0,
            // 最终报价
            TotalPrice: 0,
            // 物联卡 - 是否机卡绑定
            CardBindingList: [
                { text: "是", value: 0 },
                { text: "否", value: 1 }
            ],
            CardBindingModal: false,
            CardBindingVal: { text: "是", value: 0 },
            // 物联卡 - 资费类型
            TariffTypeList:[
                { text: "月套餐包", value: 0 },
                { text: "季度套餐包", value: 1 },
                { text: "半年套餐包", value: 2 },
                { text: "年套餐包", value: 3 },
            ],
            TariffTypeModal: false,
            TariffTypeVal: { text: "月套餐包", value: 0 },
            // 物联卡 - 标准资费
            StandardTariffList:[
                { text: "5MB", value: 1 },
                { text: "10MB", value: 2 },
                { text: "30MB", value: 3 },
                { text: "100MB", value: 5 },
                { text: "300MB", value: 12 },
                { text: "500MB", value: 20 },
                { text: "1GB", value: 30 },
                { text: "3GB", value: 50 },
                { text: "6GB", value: 70 },
                { text: "12GB", value: 100 },
                { text: "20GB", value: 150 },
                { text: "40GB", value: 200 },
                { text: "60GB", value: 300 },
                { text: "100GB", value: 500 },
                { text: "200GB", value: 900 },
                { text: "500GB", value: 2000 },
            ],
            StandardTariffModal: false,
            StandardTariffVal: { text: "5MB", value: 1 }, 
            // 物联卡 - 是否使用预存折扣权限
            StoredDiscountRightsList:[
                { text: "不使用", value: 1 },
                { text: "9折", value: 0.9 },
                { text: "8折", value: 0.8 },
                { text: "7折", value: 0.7 },
            ],
            StoredDiscountRightsModal:false,
            StoredDiscountRightsVal:{ text: "不使用", value: 1 },
            //  物联卡 - 是否使用机卡绑定折扣权限
            MachineCardBindingDiscountAuthorityList:[
                { text: "不使用", value: 1 },
                { text: "9折", value: 0.9 },
                { text: "8折", value: 0.8 },
                { text: "7折", value: 0.7 },
            ], 
            MachineCardBindingDiscountAuthorityVal:{ text: "不使用", value: 1 },
            MachineCardBindingDiscountAuthorityModal:false,
            // 物联卡 - 承诺在网时间
            OnlineTimeList:[
                { text:'2(含)-3年', value:0.9 },
                { text:'3(含)-5年', value:0.8 },
                { text:'5(含)年以上', value:0.7 },
            ],
            OnlineTimeVal:{ text: "2(含)-3年", value: 0.9 },
            OnlineTimeModal:false,
            // 物联卡 - 承诺收入
            IincomeList:[
                { text:'50000元', value:0.9 },
                { text:'100000元', value:0.8 },
                { text:'200000元', value:0.7 },
            ],
            IincomeVal:{ text: "50000元", value: "0.9" },
            IincomeModal:false,
            // 物联卡 - 使用行业
            IoTCardUseIndustryList:['党政军','交通','教育','健康医疗','金融','能源','其它'],
            IoTCardUseIndustryModal:false,
            IoTCardUseIndustryVal:"",
            IoTCardUseIndustryOther:'', 
            // 物联卡 - 使用场景
            IoTCardUsageScenariosList:['执法','监控','可穿戴设备','水电气智能化','金融消费','车载应用','其它'],
            IoTCardUsageScenariosModal:false,
            IoTCardUsageScenariosVal:"",
            IoTCardUsageScenariosOther:'',
            // 物联卡 - 物联卡形态
            IoTCardFormList:['插拔式(U)SIM','贴片式(U)SIM'],
            IoTCardFormModal:false,
            IoTCardFormVal:"插拔式(U)SIM",
            // 物联卡 - 是否开通流量共享
            TrafficSharingList:[
                { text: "是", value: 0 },
                { text: "否", value: 1 }
            ],
            TrafficSharingModal:false,
            TrafficSharingVal:{ text: "是", value: 0 },
            // 是否开通测试期及沉默期
            TestPeriod:'',
            SilentPeriod:'',
            // 是否开通Onelink平台API服务
            OnelinkApiList:[ 
                { text: "是", value: 0 },
                { text: "否", value: 1 }
            ],
            OnelinkApiModal:false,
            OnelinkApiVal:{ text: "是", value: 0 },
            // 云短彩(云MAS) - 业务类型
            BusinessTypeList:[
                { text: "短信", value: 0 },
                { text: "彩信", value: 1 }
            ],
            BusinessTypeModal:false,
            BusinessTypeVal:{ text: "短信", value: 0 },
            // 云短彩(云MAS) - 发送范围
            SendRangeList:[
                { text: "全网", value: 0 },
                { text: "本地", value: 1 }
            ],
            SendRangeModal:false,
            SendRangeVal:{ text: "全网", value: 0 },
            // 云短彩(云MAS) - 异网需求 
            InterNetworkRequirementsList:[
                { text: "无", value: 0 },
                { text: "有", value: 1 },
                { text: "有且为三网合一", value: 2 },
            ],
            InterNetworkRequirementsModal:false,
            InterNetworkRequirementsVal:{ text: "无", value: 0 },
            // // 云短信(云MAS) - 三网合一套餐 
            // TriplePlayList:[
            //     { text: "300元/月", value: 300 },
            //     { text: "500元/月", value: 500 },
            //     { text: "1200元/月", value: 1200 },
            //     { text: "1800元/月", value: 1800 },
            //     { text: "2500元/月", value: 2500 },
            //     { text: "5000元/月", value: 5000 },
            //     { text: "10000元/月", value: 10000 },
            //     { text: "25000元/月", value: 25000 },
            //     { text: "50000元/月", value: 50000 },
            // ],
            // TriplePlayVal:{ text: "", value: "" },
            // TriplePlayModal:false,
            // // 云短信(云MAS) - 全网短流程
            // ShortProcessOfWholeNetworkList:[
            //     { text: "300元套餐", value: 300 },
            //     { text: "500元套餐", value: 500 },
            //     { text: "1000元套餐", value: 1000 },
            //     { text: "5000元套餐", value: 5000 },
            // ],
            // ShortProcessOfWholeNetworkVal:{ text: "", value: "" },
            // ShortProcessOfWholeNetworkModal:false,
            // 云短信(云MAS) - 资费
            TariffList:[
                { text: "300元包月，包4000条本网/异网短信,超出0.08元/条", value: 300 },
                { text: "500元包月，包10000条本网/异网短信,超出0.07元/条", value: 500 },
                { text: "1200元包月，包24000条本网/异网短信,超出0.06元/条", value: 1200 },
                { text: "1800元包月，包35000条本网/异网短信,超出0.05元/条", value: 1800 },
                { text: "2500元包月，包50000条本网/异网短信,超出0.05元/条", value: 2500 },
                { text: "5000元包月，包100000条本网/异网短信,超出0.05元/条", value: 5000 },
                { text: "10000元包月，包200000条本网/异网短信,超出0.05元/条", value: 10000 },
                { text: "25000元包月，包500000条本网/异网短信,超出0.05元/条", value: 25000 },
                { text: "50000元包月，包1000000条本网/异网短信,超出0.05元/条", value: 50000 },
            ],
            TariffVal:{ text: "300元包月，包4000条本网/异网短信,超出0.08元/条", value: 300 },
            TariffModal:false,
            // 云短彩(云MAS) - 黑名单管理方式 
            BlacklistManagementList:[
                { text: "黑名单", value: 0 },
                { text: "白名单", value: 1 },
                { text: "黑名单模板", value: 2 },
            ],
            BlacklistManagementModal:false,
            BlacklistManagementVal:{ text: "黑名单", value: 0 },
            // 云短彩(云MAS) - 企业签名
            BusinessSignature:'',
            // 云短彩(云MAS) - 发送范围及内容说明
            SendingRangeAndContent:'',
            // 企业视频彩铃 - 客户视频彩铃发送邮箱
            CustomerVideoRingtoneMailbox:'',
            // 企业视频彩铃 - 客户经理视频彩铃发送邮箱
            ManagerVideoRingtoneMailbox:'',
            // 企业视频彩铃 - 是否需要制作
            WhetherToMakeList:[
                { text: "是", value: 400 },
                { text: "否", value: 0 }
            ],
            WhetherToMakeModal:false,
            WhetherToMakeVal:{ text: "是", value: 400 },
            // 企业视频彩铃 - 功能费
            FunctionFeeList:[
                { text: "6元/月/户", value: 6 },
                { text: "10元/月/户", value: 10 }
            ],
            FunctionFeeModal:false,
            FunctionFeeVal:{ text: "6元/月/户", value: 6 },
            // 生成图片
            imgUrl: "",
            imgModal: false
        };
    },
    methods: {
        // 集团级别确定
        onGroupLevelConfirmConfirm(data) {
            this.GroupLevelVal = { text: data.text, value: data.value };
            this.GroupLevelModal = false;

            if(data.value == '2' || data.value == '3'){
                this.PreStoreVal = { text: "是", value: 0 };
            }
        },
        // 产品簇确定
        onProductClusterConfirm(data) {
            this.ProductClusterVal = { text: data.text, value: data.value };
            this.ProductClusterModal = false;

            let newQuote = document.getElementById('newQuote');
            if(data.text === '物联网产品簇'){
                newQuote.style.padding = '185px 0 50px 0';
            }else if(data.text === '专线产品簇'){
                newQuote.style.padding = '45px 0 50px 0';
            }else if(data.text === 'IDC产品簇'){
                newQuote.style.padding = '45px 0 50px 0';
            }
        },
        // 产品确定
        onProductConfirm(data) {
            this.ProductVal = { text: data.text, value: data.value };
            this.ProductModal = false;

            // 执行计算函数
            this.computeChange();
        },
        // 卡类型确定
        onCardTypeConfirm(data) {
            // console.log(data);
            this.CardTypeVal = { text: data.text, value: data.value };
            this.CardTypeModal = false;

            // 根据卡类型切换 - 资费类型 - 和资费标准
            if(data.text === '通用流量卡'){
                // 改变资费类型
                this.TariffTypeList = [
                    { text: "月套餐包", value: 0 },
                    { text: "季度套餐包", value: 1 },
                    { text: "半年套餐包", value: 2 },
                    { text: "年套餐包", value: 3 },
                ];
                this.TariffTypeVal = { text: "月套餐包", value: 0 };

                // 改变标准资费
                this.StandardTariffList = [
                    { text: "5MB", value: 1 },
                    { text: "10MB", value: 2 },
                    { text: "30MB", value: 3 },
                    { text: "100MB", value: 5 },
                    { text: "300MB", value: 12 },
                    { text: "500MB", value: 20 },
                    { text: "1GB", value: 30 },
                    { text: "3GB", value: 50 },
                    { text: "6GB", value: 70 },
                    { text: "12GB", value: 100 },
                    { text: "20GB", value: 150 },
                    { text: "40GB", value: 200 },
                    { text: "60GB", value: 300 },
                    { text: "100GB", value: 500 },
                    { text: "200GB", value: 900 },
                    { text: "500GB", value: 2000 },
                ];
                this.StandardTariffVal = { text: "5MB", value: 1 };
            }else if(data.text === '定向流量卡'){
                // 改变资费类型
                this.TariffTypeList = [
                    { text: "月套餐包", value: 0 },
                    { text: "季度套餐包", value: 1 },
                    { text: "半年套餐包", value: 2 },
                    { text: "年套餐包", value: 3 },
                ];
                this.TariffTypeVal = { text: "月套餐包", value: 0 };
                
                // 改变标准资费
                this.StandardTariffList = [
                    { text: "5MB", value: 0.6 },
                    { text: "10MB", value: 1.2 },
                    { text: "30MB", value: 2 },
                    { text: "100MB", value: 3 },
                    { text: "300MB", value: 8 },
                    { text: "500MB", value: 12 },
                    { text: "1GB", value: 18 },
                    { text: "3GB", value: 30 },
                    { text: "6GB", value: 42 },
                    { text: "12GB", value: 60 },
                    { text: "20GB", value: 90 },
                    { text: "40GB", value: 120 },
                    { text: "60GB", value: 180 },
                    { text: "100GB", value: 300 },
                    { text: "200GB", value: 540 },
                    { text: "500GB", value: 1200 },
                ];
                this.StandardTariffVal = { text: "5MB", value:  0.6 };
            }else if(data.text === 'NB物联卡'){
                // 改变资费类型
                this.TariffTypeList = [
                    { text: "年套餐包", value: 3 },
                ];
                this.TariffTypeVal = { text: "年套餐包", value: 3 };
                
                // 改变标准资费
                this.StandardTariffList = [
                    { text: "50MB", value: 20 },
                    { text: "300MB", value: 40 }
                ];
                this.StandardTariffVal = { text: "50MB", value:  20 };
            }

            // 执行计算函数
            this.computeChange();
        },
        // 是否预存确定
        onPreStoreConfirm(data) {
            this.PreStoreVal = { text: data.text, value: data.value };
            this.PreStoreModal = false;
        },
        // 是否预存
        PreStoreClick() {
            if(this.GroupLevelVal.value == '0' || this.GroupLevelVal.value  == '1' ){
                this.PreStoreModal = true;
            }
        },
        // 物联卡 - 是否机卡绑定
        onCardBindingConfirm(data) {
            this.CardBindingVal = { text: data.text, value: data.value };
            this.CardBindingModal = false;
        },
        // 物联卡 - 资费类型
        onTariffTypeConfirm(data){
            this.TariffTypeVal = { text: data.text, value: data.value };
            this.TariffTypeModal = false;

            // 先判断卡类型，再判断资费类型,得出标准资费
            if(this.CardTypeVal.text === '通用流量卡'){
                // 月套餐包、季度套餐包、半年套餐包、年套餐包
                if(data.text === '月套餐包'){
                    this.StandardTariffList = [
                        { text: "5MB", value: 1 },
                        { text: "10MB", value: 2 },
                        { text: "30MB", value: 3 },
                        { text: "100MB", value: 5 },
                        { text: "300MB", value: 12 },
                        { text: "500MB", value: 20 },
                        { text: "1GB", value: 30 },
                        { text: "3GB", value: 50 },
                        { text: "6GB", value: 70 },
                        { text: "12GB", value: 100 },
                        { text: "20GB", value: 150 },
                        { text: "40GB", value: 200 },
                        { text: "60GB", value: 300 },
                        { text: "100GB", value: 500 },
                        { text: "200GB", value: 900 },
                        { text: "500GB", value: 2000 },
                    ];
                    this.StandardTariffVal = { text: "5MB", value: 1 };
                }else if(data.text === '季度套餐包'){
                    this.StandardTariffList = [
                        { text: "20MB", value: 4 },
                        { text: "50MB", value: 7 },
                        { text: "100MB", value: 9 },
                        { text: "300MB", value: 15 },
                        { text: "500MB", value: 22 },
                        { text: "1GB", value: 40 },
                        { text: "2GB", value: 70 },
                        { text: "3GB", value: 90 },
                        { text: "6GB", value: 120 },
                        { text: "12GB", value: 170 },
                        { text: "24GB", value: 240 },
                        { text: "36GB", value: 300 },
                        { text: "48GB", value: 375 },
                        { text: "60GB", value: 450 },
                        { text: "120GB", value: 600 }
                    ];
                    this.StandardTariffVal = { text: "20MB", value: 4 };
                }
                else if(data.text === '半年套餐包'){
                    this.StandardTariffList = [
                        { text: "20MB", value: 5 },
                        { text: "50MB", value: 9 },
                        { text: "100MB", value: 15 },
                        { text: "300MB", value: 20 },
                        { text: "500MB", value: 27 },
                        { text: "1GB", value: 45 },
                        { text: "2GB", value: 82 },
                        { text: "3GB", value: 120 },
                        { text: "6GB", value: 180 },
                        { text: "12GB", value: 240 },
                        { text: "24GB", value: 340 },
                        { text: "36GB", value: 420 },
                        { text: "48GB", value: 480 },
                        { text: "60GB", value: 540 },
                        { text: "120GB", value: 900 }
                    ];
                    this.StandardTariffVal = { text: "20MB", value: 5 };
                }else if(data.text === '年套餐包'){
                    this.StandardTariffList = [
                        { text: "20MB", value: 6 },
                        { text: "50MB", value: 10 },
                        { text: "100MB", value: 20 },
                        { text: "300MB", value: 33 },
                        { text: "500MB", value: 40 },
                        { text: "1GB", value: 55 },
                        { text: "2GB", value: 90 },
                        { text: "3GB", value: 150 },
                        { text: "6GB", value: 245 },
                        { text: "12GB", value: 360 },
                        { text: "24GB", value: 480 },
                        { text: "36GB", value: 600 },
                        { text: "48GB", value: 680 },
                        { text: "60GB", value: 760 },
                        { text: "120GB", value: 1080 }
                    ];
                    this.StandardTariffVal = { text: "20MB", value: 6 };
                }
            }else if(this.CardTypeVal.text === '定向流量卡'){
                // 月套餐包、季度套餐包、半年套餐包、年套餐包
                if(data.text === '月套餐包'){
                    this.StandardTariffList = [
                        { text: "5MB", value: 0.6 },
                        { text: "10MB", value: 1.2 },
                        { text: "30MB", value: 2 },
                        { text: "100MB", value: 3 },
                        { text: "300MB", value: 8 },
                        { text: "500MB", value: 12 },
                        { text: "1GB", value: 18 },
                        { text: "3GB", value: 30 },
                        { text: "6GB", value: 42 },
                        { text: "12GB", value: 60 },
                        { text: "20GB", value: 90 },
                        { text: "40GB", value: 120 },
                        { text: "60GB", value: 180 },
                        { text: "100GB", value: 300 },
                        { text: "200GB", value: 540 },
                        { text: "500GB", value: 1200 },
                    ];
                    this.StandardTariffVal = { text: "5MB", value: 0.6 };
                }else if(data.text === '季度套餐包'){
                    this.StandardTariffList = [
                        { text: "20MB", value: 2 },
                        { text: "50MB", value: 4 },
                        { text: "100MB", value: 6 },
                        { text: "300MB", value: 9 },
                        { text: "500MB", value: 15 },
                        { text: "1GB", value: 26 },
                        { text: "2GB", value: 42 },
                        { text: "3GB", value: 55 },
                        { text: "6GB", value: 72 },
                        { text: "12GB", value: 102 },
                        { text: "24GB", value: 145 },
                        { text: "36GB", value: 180 },
                        { text: "48GB", value: 225 },
                        { text: "60GB", value: 270 },
                        { text: "120GB", value: 360 }
                    ];
                    this.StandardTariffVal = { text: "20MB", value: 2 };
                }
                else if(data.text === '半年套餐包'){
                    this.StandardTariffList = [
                        { text: "20MB", value: 3 },
                        { text: "50MB", value: 5 },
                        { text: "100MB", value: 9 },
                        { text: "300MB", value: 15 },
                        { text: "500MB", value: 17 },
                        { text: "1GB", value: 30 },
                        { text: "2GB", value: 53 },
                        { text: "3GB", value: 72 },
                        { text: "6GB", value: 108 },
                        { text: "12GB", value: 145 },
                        { text: "24GB", value: 205 },
                        { text: "36GB", value: 252 },
                        { text: "48GB", value: 288 },
                        { text: "60GB", value: 325 },
                        { text: "120GB", value: 540 }
                    ];
                    this.StandardTariffVal = { text: "20MB", value: 3 };
                }else if(data.text === '年套餐包'){
                    this.StandardTariffList = [
                        { text: "20MB", value: 4 },
                        { text: "50MB", value: 6 },
                        { text: "100MB", value: 12 },
                        { text: "300MB", value: 22 },
                        { text: "500MB", value: 26 },
                        { text: "1GB", value: 33 },
                        { text: "2GB", value: 57 },
                        { text: "3GB", value: 90 },
                        { text: "6GB", value: 146 },
                        { text: "12GB", value: 216 },
                        { text: "24GB", value: 288 },
                        { text: "36GB", value: 360 },
                        { text: "48GB", value: 408 },
                        { text: "60GB", value: 456 },
                        { text: "120GB", value: 648 }
                    ];
                    this.StandardTariffVal = { text: "20MB", value: 4 };
                }
            }else if(this.CardTypeVal.text === 'NB物联卡'){
                if(data.text === '年套餐包'){
                    this.StandardTariffList = [
                        { text: "50MB", value: 20 },
                        { text: "300MB", value: 40 },
                    ];
                    this.StandardTariffVal = { text: "50MB", value: 20 };
                }
            }

            // 执行计算函数
            this.computeChange();
        },
        // 物联卡 - 标准资费
        onStandardTariffConfirm(data){
            this.StandardTariffVal = { text: data.text, value: data.value };
            this.StandardTariffModal = false;

            // 执行计算函数
            this.computeChange();
        },
        // 物联卡 - 是否使用预存折扣权限
        onStoredDiscountRightsConfirm(data){
            this.StoredDiscountRightsVal = { text: data.text, value: data.value };
            this.StoredDiscountRightsModal = false;

            // 执行计算函数
            this.computeChange();
        },
        // 物联卡 - 是否使用机卡绑定折扣权限
        onMachineCardBindingDiscountAuthorityConfirm(data){
            this.MachineCardBindingDiscountAuthorityVal = { text: data.text, value: data.value };
            this.MachineCardBindingDiscountAuthorityModal = false;

            // 执行计算函数
            this.computeChange();
        },
        // 物联卡 - 承诺在网时间
        onOnlineTimeConfirm(data){
            this.OnlineTimeVal = { text: data.text, value: data.value };
            this.OnlineTimeModal = false;

            // 执行计算函数
            this.computeChange();
        },
        // 物联卡 - 承诺收入
        onIincomeConfirm(data){
            this.IincomeVal = { text: data.text, value: data.value };
            this.IincomeModal = false;

            // 执行计算函数
            this.computeChange();
        },
        // 物联卡 - 使用行业
        onIoTCardUseIndustryConfirm(data){
            this.IoTCardUseIndustryVal = data;
            this.IoTCardUseIndustryModal = false;
        },               
        // 物联卡 - 使用场景
        onIoTCardUsageScenariosConfirm(data){
            this.IoTCardUsageScenariosVal = data;
            this.IoTCardUsageScenariosModal = false;
        },
        // 物联卡 - 形态
        onIoTCardFormConfirm(data){
            this.IoTCardFormVal = data;
            this.IoTCardFormModal = false;
        },
        // 物联卡 - 是否开通流量共享功能
        onTrafficSharingConfirm(data){
            this.TrafficSharingVal = { text: data.text, value: data.value };
            this.TrafficSharingModal = false;
        },
        // 物联卡 - 是否开通Onelink平台API服务
        onOnelinkApiConfirm(data){
            this.OnelinkApiVal = { text: data.text, value: data.value };
            this.OnelinkApiModal = false;
        },
        // 云短彩(云MAS) - 业务类型
        onBusinessTypeConfirm(data){
            // 短信
            if(data.value == '0'){
                this.InterNetworkRequirementsList = [
                    { text: "无", value: 0 },
                    { text: "有", value: 1 },
                    { text: "有且为三网合一", value: 2 },
                ];

                this.TariffList = [
                    { text: "300元包月，包4000条本网/异网短信,超出0.08元/条", value: 300 },
                    { text: "500元包月，包10000条本网/异网短信,超出0.07元/条", value: 500 },
                    { text: "1200元包月，包24000条本网/异网短信,超出0.06元/条", value: 1200 },
                    { text: "1800元包月，包35000条本网/异网短信,超出0.05元/条", value: 1800 },
                    { text: "2500元包月，包50000条本网/异网短信,超出0.05元/条", value: 2500 },
                    { text: "5000元包月，包100000条本网/异网短信,超出0.05元/条", value: 5000 },
                    { text: "10000元包月，包200000条本网/异网短信,超出0.05元/条", value: 10000 },
                    { text: "25000元包月，包500000条本网/异网短信,超出0.05元/条", value: 25000 },
                    { text: "50000元包月，包1000000条本网/异网短信,超出0.05元/条", value: 50000 },
                ];

                this.TariffVal = { text: "300元包月，包4000条本网/异网短信,超出0.08元/条", value: 300 };
            }
            // 彩信
            else if(data.value == '1'){
                this.InterNetworkRequirementsList = [
                    { text: "无", value: 0 },
                    { text: "有", value: 1 },
                ];

                this.TariffList = [
                    { text: "20条视频短信，超出每条0.5元/条", value: 10 },
                    { text: "1200条视频短信，超出每条0.25元/条", value: 300 },
                    { text: "2500条视频短信，超出每条0.2元/条", value: 500 },
                    { text: "10000条视频短信，超出每条0.15元/条", value: 1500 },
                    { text: "20000条视频短信，超出每条0.15元/条", value: 3000 },
                ];

                this.TariffVal = { text: "20条视频短信，超出每条0.5元/条", value: 10 };
            }
            this.InterNetworkRequirementsVal = { text: "无", value: 0 };

            this.BusinessTypeVal = { text: data.text, value: data.value };
            this.BusinessTypeModal = false;

            // 执行计算函数
            this.computeChange();
        },
        // 云短彩(云MAS) - 发送范围
        onSendRangeConfirm(data){
            this.SendRangeVal = { text: data.text, value: data.value };
            this.SendRangeModal = false;
        },
        // 云短彩(云MAS) - 异网需求 
        onInterNetworkRequirementsConfirm(data){
            // 首先判断是短信的还是彩信的
            // 短信
            if(this.BusinessTypeVal.value == '0'){
                // 有且三网合一
                if(data.value == '2'){
                    this.TariffList = [
                        { text: "包5000条本网/异网短信,超出0.065元/条", value: 300 },
                        { text: "包9000条本网/异网短信,超出0.06元/条", value: 500 },
                        { text: "包20000条本网/异网短信,超出0.055元/条", value: 1000 },
                        { text: "包100000条本网/异网短信,超出0.05元/条", value: 5000 },
                    ];
                    this.TariffVal = { text: "包5000条本网/异网短信,超出0.065元/条", value: 300 };
                }
                // 有/无
                else{
                    this.TariffList = [
                        { text: "300元包月，包4000条本网/异网短信,超出0.08元/条", value: 300 },
                        { text: "500元包月，包10000条本网/异网短信,超出0.07元/条", value: 500 },
                        { text: "1200元包月，包24000条本网/异网短信,超出0.06元/条", value: 1200 },
                        { text: "1800元包月，包35000条本网/异网短信,超出0.05元/条", value: 1800 },
                        { text: "2500元包月，包50000条本网/异网短信,超出0.05元/条", value: 2500 },
                        { text: "5000元包月，包100000条本网/异网短信,超出0.05元/条", value: 5000 },
                        { text: "10000元包月，包200000条本网/异网短信,超出0.05元/条", value: 10000 },
                        { text: "25000元包月，包500000条本网/异网短信,超出0.05元/条", value: 25000 },
                        { text: "50000元包月，包1000000条本网/异网短信,超出0.05元/条", value: 50000 },
                    ];

                    this.TariffVal = { text: "300元包月，包4000条本网/异网短信,超出0.08元/条", value: 300 };
                }
            }
            // 彩信
            else if(this.BusinessTypeVal.value == '1'){
                this.TariffList = [
                    { text: "20条视频短信，超出每条0.5元/条", value: 10 },
                    { text: "1200条视频短信，超出每条0.25元/条", value: 300 },
                    { text: "2500条视频短信，超出每条0.2元/条", value: 500 },
                    { text: "10000条视频短信，超出每条0.15元/条", value: 1500 },
                    { text: "20000条视频短信，超出每条0.15元/条", value: 3000 },
                ];

                this.TariffVal = { text: "20条视频短信，超出每条0.5元/条", value: 10 };
            }

            this.InterNetworkRequirementsVal = { text: data.text, value: data.value };
            this.InterNetworkRequirementsModal = false;

            // 执行计算函数
            this.computeChange();
        },  
        // 云短彩(云MAS) - 黑名单管理方式 
        onBlacklistManagementConfirm(data){
            this.BlacklistManagementVal = { text: data.text, value: data.value };
            this.BlacklistManagementModal = false;
        },     
        // 云短信(云MAS) - 资费  
        onTariffConfirm(data){
            this.TariffVal = { text: data.text, value: data.value };
            this.TariffModal = false;

            // 执行计算函数
            this.computeChange();
        },      
        // 云短信(云MAS) - 三网合一套餐 
        // onTriplePlayConfirm(data){
        //     this.TriplePlayVal = { text: data.text, value: data.value };
        //     this.TriplePlayModal = false;
        // }, 
        // 云短信(云MAS) - 全网短流程   
        // onShortProcessOfWholeNetworkConfirm(data){
        //     this.ShortProcessOfWholeNetworkVal = { text: data.text, value: data.value };
        //     this.ShortProcessOfWholeNetworkModal = false;
        // }, 
        // 企业视频彩铃 - 是否需要制作
        onWhetherToMakeConfirm(data){
            this.WhetherToMakeVal = { text: data.text, value: data.value };
            this.WhetherToMakeModal = false;

            // 执行计算函数
            this.computeChange();
        },     
        // 企业视频彩铃 - 功能费
        onFunctionFeeConfirm(data){
            this.FunctionFeeVal = { text: data.text, value: data.value };
            this.FunctionFeeModal = false;

            // 执行计算函数
            this.computeChange();
        }, 
        // 开通成员数计算
        CarNumChange(){
            // 执行计算函数
            this.computeChange();
        },
        // 计算单价 单价 总价
        computeChange(){
            // 最终单价 最终报价 产品
            let UnitPrice,
                TotalPrice,
                ProductVal = this.ProductVal.value;
            
            // 物联卡
            if(ProductVal == '0'){
                //最终单价 =  标准资费 * 是否使用预存折扣权限 * 是否使用机卡绑定折扣权限 * 承诺在网时间 * 承诺收入
                let arr = [this.StandardTariffVal.value,this.StoredDiscountRightsVal.value,this.MachineCardBindingDiscountAuthorityVal.value,this.OnlineTimeVal.value,this.IincomeVal.value];
                let arr2 = [this.StandardTariffVal.value,this.StoredDiscountRightsVal.value,this.MachineCardBindingDiscountAuthorityVal.value,this.OnlineTimeVal.value,this.IincomeVal.value,this.CarNum];

                this.UnitPrice = arr.reduce((x, y) => {
                    return this.floatMul(x,y);
                });

                //最终总价 =  标准资费 * 是否使用预存折扣权限 * 是否使用机卡绑定折扣权限 * 开通成员数
                this.TotalPrice = arr2.reduce((x, y) => {
                    return this.floatMul(x,y);
                });
                
            }
            // 云短信
            else if (ProductVal == '1'){
                //最终单价 = 资费
                this.UnitPrice = this.TariffVal.value;
                //最终总价 = 资费 *  开通成员数
                this.TotalPrice = this.TariffVal.value * this.CarNum;
            }
            // 企业视频彩铃
            else if (ProductVal == '2'){
                //最终单价 =  功能费 + 制作费
                this.UnitPrice = this.FunctionFeeVal.value + this.WhetherToMakeVal.value;
                //最终总价 =  （功能费 + 制作费） * 开通成员数
                this.TotalPrice = (this.FunctionFeeVal.value + this.WhetherToMakeVal.value) * this.CarNum;
            }

            // 最终单价
            // console.log(this.UnitPrice);
            // 最终总价
            // console.log(this.TotalPrice);
        },
        // 提交请求展示截屏
        toImage() {
            // console.log(this.ProductVal.text);
            if(this.ProductVal.text === '物联卡'){
                this.IoTCardAxios();
            }else if(this.ProductVal.text === '云短彩(云MAS)'){
                this.YunCaicaiAxios();
            }else if(this.ProductVal.text === '企业视频彩铃'){
                this.CRBTAxios();
            }
        },
        // 物联卡提交请求
        IoTCardAxios(){
            commonAxios.post(commonAxios.getUrl('prcAdd'),{
                // userId
                userId:this.$store.state.userId,
	            // 产品簇
                firstLevel:this.ProductClusterVal.text,
                // 产品
                secondLevel:this.ProductVal.text,
                // 卡类型
                thirdLevel:this.CardTypeVal.text,
                // 集团级别
                value1:this.GroupLevelVal.text,
                // 是否预存
                value2:this.PreStoreVal.text,
                // 资费类型
                value3:this.TariffTypeVal.text,
                // 标准资费
                value4:this.StandardTariffVal.text,
                // 是否使用预存折扣权限
                value5:this.StoredDiscountRightsVal.text,
                // 是否机卡绑定
                value6:this.CardBindingVal.text,
                // 是否使用机卡绑定折扣权限
                value7:this.MachineCardBindingDiscountAuthorityVal.text,
                // 承诺在网时长
                value8:this.OnlineTimeVal.text,
                // 承诺年收入
                value9:this.IincomeVal.text,
                // 开通成员数
                value10:this.CarNum,
                // 最终单价
                value11:this.UnitPrice,
                // 最终报价
                value12:this.TotalPrice,
                // 集团客户名称（与BOSS开户名称一致）
                value13:this.GroupCustomerName,
                // 客户联系人
                value14:this.CustomerContact,
                // 客户联系电话
                value15:this.CustomerContactPhone,
                // 客户联系邮件
                value16:this.CustomerContactMail,
                // 物联卡使用行业
                value17:this.IoTCardUseIndustryVal === '其它' ? this.IoTCardUseIndustryOther : this.IoTCardUseIndustryVal,
                // 物联卡使用场景
                value18:this.IoTCardUsageScenariosVal === '其它' ? this.IoTCardUsageScenariosOther: this.IoTCardUsageScenariosVal,
                // 物联卡形态
                value19:this.IoTCardFormVal,
                // 是否开通流量共享功能
                value20:this.TrafficSharingVal.text,
                // 是否开通测试期及沉默期
                value21:this.TestPeriod + ',' + this.SilentPeriod,
                // 是否开通Onelink平台API服务
                value22:this.OnelinkApiVal.text
            },res => {
                if(res.status == 'success'){
                    Notify({ type: 'success', message: res.message });

                    this.proId = res.productId;

                    let newQuote = document.getElementById('newQuote');
                    let topView = document.getElementById('topView');
                    // 先切换到下面的状态
                    newQuote.style.padding = '45px 0 50px 0';
                    topView.style.position = 'inherit';

                    // 截屏弹窗
                    html2canvas(document.querySelector("#capture")).then(canvas => {
                        var dataUrl = canvas.toDataURL();
                        this.imgUrl = dataUrl;
                        this.imgModal = true;

                        // 切换回来
                        newQuote.style.padding = '185px 0 50px 0';
                        topView.style.position = 'fixed';
                    });
                }else{
                    Notify(res.message);
                }
            })
        },
        // 云短信提交请求
        YunCaicaiAxios(){
            commonAxios.post(commonAxios.getUrl('prcAdd'),{
                // userId
                userId:this.$store.state.userId,
	            // 产品簇
                firstLevel:this.ProductClusterVal.text,
                // 产品
                secondLevel:this.ProductVal.text,
                // 卡类型
                // thirdLevel:this.CardTypeVal.text,
                // 集团级别
                value1:this.GroupLevelVal.text,
                // 是否预存
                value2:this.PreStoreVal.text,
                // 资费类型
                value3:this.TariffTypeVal.text,
                // 资费
                value4:this.TariffVal.text,
                // 开通成员数
                value10:this.CarNum,
                // 最终单价
                value11:this.UnitPrice,
                // 最终报价
                value12:this.TotalPrice,
                // 集团客户名称（与BOSS开户名称一致）
                value13:this.GroupCustomerName,
                // 客户联系人
                value14:this.CustomerContact,
                // 客户联系电话
                value15:this.CustomerContactPhone,
                // 客户联系邮件
                value16:this.CustomerContactMail,
	            // 发送范围
                value23:this.SendRangeVal.text,
                // 异网需求
                value24:this.InterNetworkRequirementsVal.text,
                // 黑名单管理方式
                value25:this.BlacklistManagementVal.text,
                // 速率
                value26:'50条/秒',
                // 企业签名
                value27:this.BusinessSignature,
                // 发送范围及其内容
                value28:this.SendingRangeAndContent,
            },res => {
                if(res.status == 'success'){
                    Notify({ type: 'success', message: res.message });

                    this.proId = res.productId;

                    let newQuote = document.getElementById('newQuote');
                    let topView = document.getElementById('topView');
                    // 先切换到下面的状态
                    newQuote.style.padding = '45px 0 50px 0';
                    topView.style.position = 'inherit';

                    // 截屏弹窗
                    html2canvas(document.querySelector("#capture")).then(canvas => {
                        var dataUrl = canvas.toDataURL();
                        this.imgUrl = dataUrl;
                        this.imgModal = true;

                        // 切换回来
                        newQuote.style.padding = '185px 0 50px 0';
                        topView.style.position = 'fixed';
                    });
                }else{
                    Notify(res.message);
                }
            })
        },
        // 企业视频彩铃请求提交
        CRBTAxios(){
            commonAxios.post(commonAxios.getUrl('prcAdd'),{
                // userId
                userId:this.$store.state.userId,
	            // 产品簇
                firstLevel:this.ProductClusterVal.text,
                // 产品
                secondLevel:this.ProductVal.text,
                // 卡类型
                // thirdLevel:this.CardTypeVal.text,
                // 集团级别
                value1:this.GroupLevelVal.text,
                // 是否预存
                value2:this.PreStoreVal.text,
                // 功能费
                value4:this.FunctionFeeVal.value,
                // 开通成员数
                value10:this.CarNum,
                // 最终单价
                value11:this.UnitPrice,
                // 最终报价
                value12:this.TotalPrice,
                // 集团客户名称（与BOSS开户名称一致）
                value13:this.GroupCustomerName,
                // 客户联系人
                value14:this.CustomerContact,
                // 客户联系电话
                value15:this.CustomerContactPhone,
                // 客户联系邮件
                value16:this.CustomerContactMail,
                // 是否需要制作
                value29:this.WhetherToMakeVal.text,
                // 客户视频彩铃发送邮箱
                value30:this.CustomerVideoRingtoneMailbox,
                // 客户经理视频彩铃发送邮箱
                value31:this.ManagerVideoRingtoneMailbox,
                /// 制作费
                value32:this.WhetherToMakeVal.value, 
            },res => {
                if(res.status == 'success'){
                    Notify({ type: 'success', message: res.message });

                    this.proId = res.productId;

                    let newQuote = document.getElementById('newQuote');
                    let topView = document.getElementById('topView');
                    // 先切换到下面的状态
                    newQuote.style.padding = '45px 0 50px 0';
                    topView.style.position = 'inherit';

                    // 截屏弹窗
                    html2canvas(document.querySelector("#capture")).then(canvas => {
                        var dataUrl = canvas.toDataURL();
                        this.imgUrl = dataUrl;
                        this.imgModal = true;

                        // 切换回来
                        newQuote.style.padding = '185px 0 50px 0';
                        topView.style.position = 'fixed';
                    });
                }else{
                    Notify(res.message);
                }
            })
        },
        // 下载文件
        getFile(){
            window.open(commonAxios.getUrl('prcPhoneDoc') + '?proId=' + this.proId);
        }
    },
    created() {
        this.computeChange();
    }
};
</script>

<style lang="scss">
#newQuote{
    padding:185px 0 50px 0;

    #topView{
        position: fixed;
        width: 100%;
        top:46px;
        left: 0;
        -moz-box-shadow: 0px 1px 5px #888888; /* 老的 Firefox */
        box-shadow: 0px 1px 5px #888888;
        // border-bottom: 1px solid #ccc;
    }
}
</style>
