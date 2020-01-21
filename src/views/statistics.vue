<template>
    <div class="statistics">
        <van-nav-bar title="统计" fixed />

        <Row class="dataDisplay">
            <Col span="6">
                <div class="item">
                    <div>100</div>
                    <div>总金额</div>
                    <div>(元)</div>
                </div>
            </Col>
            <Col span="6">
                <div class="item">
                    <div>20</div>
                    <div>物联网产品簇</div>
                    <div>(元)</div>
                </div>
            </Col>
            <Col span="6">
                <div class="item">
                    <div>30</div>
                    <div>专线产品簇</div>
                    <div>(元)</div>
                </div>
            </Col>
            <Col span="6">
                <div class="item">
                    <div>50</div>
                    <div>IDC产品簇</div>
                    <div>(元)</div>
                </div>
            </Col>
        </Row>


        <!-- 关键字 -->
        <van-cell-group style="margin-bottom:10px;">
            <!-- 关键字 -->
            <van-field
                clearable
                v-model="Keyword"
                label="关键字"
                placeholder="请输入报价单名称或客户名称"
            />

            <!-- 业务类型 -->
            <van-field
                readonly
                clickable
                label="业务类型"
                :value="BusinessTypeVal.text"
                placeholder="业务类型"
                @click="BusinessTypeModal = true"
            />

            <!-- 开始时间 -->
            <van-field
                readonly
                clickable
                label="开始时间"
                :value="StartTime"
                placeholder="请选择开始时间"
                @click="StartTimeModal = true"
            />

            <!-- 结束时间 -->
            <van-field
                readonly
                clickable
                label="结束时间"
                :value="EndTime"
                placeholder="请选择结束时间"
                @click="EndTimeModal = true"
            />
        </van-cell-group>

        <!-- 查询 -->
        <div style="margin-bottom:10px;padding:0 0.1rem;">
			<van-button type="info" size="large">查询</van-button>
		</div>

        <!-- table -->
        <div class="table">
            <Table :columns="columns" :data="data"></Table>
        </div>
        
        <!-- pages -->
        <van-row class="pages">
            <van-col span="8">
                <van-button type="info" size="small" style="width:100%;">上一页</van-button>
            </van-col>
            <van-col span="8">
                <span>{{page}} / {{total}}</span>
            </van-col>
            <van-col span="8">
                <van-button type="info" size="small" style="width:100%;">下一页</van-button>
            </van-col>
        </van-row>

		<!-- 开始时间 -->
        <van-popup v-model="StartTimeModal" position="bottom">
            <van-datetime-picker
                type="date"
				v-model="time"
                @cancel="StartTimeModal = false"
                @confirm="onStartTimeConfirm"
            />
        </van-popup>

		<!-- 结束时间 -->
		<van-popup v-model="EndTimeModal" position="bottom">
            <van-datetime-picker
                type="date"
				v-model="time"
                @cancel="EndTimeModal = false"
                @confirm="onEndTimeConfirm"
            />
        </van-popup>

        <!-- 业务类型 -->
        <van-popup v-model="BusinessTypeModal" position="bottom">
            <van-picker
                show-toolbar
                :columns="BusinessTypeList"
                @cancel="BusinessTypeModal = false"
                @confirm="onBusinessTypeConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
// axios
import commonAxios from "@/api/commonAxios";
// 正则
import regulars from "@/assets/js/regulars";
// 轻提示
import { Notify , Toast } from 'vant';
export default {
    name: "statistics",
    components: {},
    data() {
        return {
			time:new Date(),
            Keyword:'',
            StartTime:'',
            EndTime:'',
			StartTimeModal:false,
            EndTimeModal:false,
            BusinessTypeList:[
                { text: "物联网产品簇", value: 0 },
                { text: "专线产品簇", value: 1 },
                { text: "IDC产品簇", value: 2 }
            ],
            BusinessTypeModal:false,
            BusinessTypeVal:{ text: "", value: "" },
            columns: [
                {
                    title: "报价单名称",
                    width: 100,
                    key: "name",
                    align: "center"
                },
                {
                    title: "业务",
                    width: 100,
                    key: "age",
                    align: "center"
                },
                {
                    title: "客户名称",
                    width: 100,
                    key: "address",
                    align: "center"
                },
                {
                    title: "报价单金额",
                    width: 100,
                    key: "address",
                    align: "center"
                },
                {
                    title: "客户经理",
                    width: 100,
                    key: "address",
                    align: "center"
                }
            ],
            data: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "123",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "354",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "345",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "34543",
                    date: "2016-10-04"
                }
            ],
            page:1,
            pages:10,
            total:1
        };
    },
    methods: {
        onStartTimeConfirm(date){
			this.StartTime = this.getYMD(date.getTime());
			this.StartTimeModal = false;
		},
		onEndTimeConfirm(date){
			this.EndTime = this.getYMD(date.getTime());
			this.EndTimeModal = false;
        },
        onBusinessTypeConfirm(data){
            this.BusinessTypeVal = { text: data.text, value: data.value };
            this.BusinessTypeModal = false;
        },
    },
    created() {}
};
</script>

<style lang="scss">
.statistics {
    padding: 45px 0 50px 0;
    font-size: 0.13rem;
    box-sizing: border-box;

    h3 {
        font-size: 0.2rem;
        margin-bottom: 0.1rem;
    }
    .dataDisplay {
        text-align: center;
        margin-bottom: 10px;

        .item {
            padding: 0.1rem;
            // height: 0.8rem;
            font-size: 0.1rem;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;

            :nth-child(1) {
                font-size: 0.22rem;
            }

            div {
                white-space: nowrap;
            }
        }

        .item:nth-child(4){
            border: none;
        }
    }

    .table{
        padding:0 0.1rem;
    }

    .pages{
        padding: 0.1rem;
        box-sizing: border-box;
        text-align: center;
        line-height: 34px;
    }
}
</style>
