<template>
    <div class="history">
        <van-nav-bar title="历史协议" fixed />

        <!-- 关键字 -->
        <van-cell-group style="margin-bottom:10px;">
            <!-- 关键字 -->
            <van-field
                clearable
                v-model="Keyword"
                label="客户名称"
                placeholder="请输入客户名称"
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
			<van-button type="info" size="large" @click="init()">查询</van-button>
		</div>

        <!-- table -->
        <div class="table">
            <Table :columns="columns" :data="data" :loading="loading">
                <!-- <template slot-scope="{ row, index }" slot="time">
                    {{row.time ? getYMD(new Date(row.time).getTime()) :''}}
                </template> -->
                <template slot-scope="{ row, index }" slot="action">
                    <Button
                        type="default"
                        size="small"
                        @click="view(row.id)">
                        查看 
                    </Button>
                </template>
            </Table>
        </div>

        <!-- pages -->
        <van-row class="pages">
            <van-col span="8">
                <van-button type="info" size="small" style="width:100%;" :disabled="page == 1" @click="SwitchPage('prev')">上一页</van-button>
            </van-col>
            <van-col span="8">
                <span>{{page}} / {{pages}}</span>
            </van-col>
            <van-col span="8">
                <van-button type="info" size="small" style="width:100%;" :disabled="page == pages" @click="SwitchPage('next')">下一页</van-button>
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
    name: "history",
    components: {},
    data() {
        return {
			time:new Date(),
            Keyword:'',
            StartTime:'',
            EndTime:'',
			StartTimeModal:false,
			EndTimeModal:false,
            columns: [
				// {
				// 	title: '产品簇',
				// 	width:120,
				// 	key: 'firstLevel',
				// 	align:'center'
                // },
				{
					title: '客户名称',
					width:140,
					key: 'value13',
					align:'center'
                },
                {
					title: '产品',
					width:120,
					key: 'secondLevel',
					align:'center'
                },
                {
					title: '卡类型',
					width:100,
					key: 'thirdLevel',
					align:'center'
                },
                {
					title: '日期',
					width:120,
					key: 'time',
                    align:'center'
                },
                // {
				// 	title: '开通成员数',
				// 	width:100,
				// 	key: 'value10',
				// 	align:'center'
				// },
				// {
				// 	title: '最终单价',
				// 	width:100,
				// 	key: 'value11',
				// 	align:'center'
                // },
                // {
				// 	title: '最终报价',
				// 	width:100,
				// 	key: 'value12',
				// 	align:'center'
				// },
				{
					title: '操作',
					width:80,
					slot: 'action',
					fixed: 'right',
					align:'center'
				}
			],
			data: [],
            page:1,
            pageSize:10,
            total:1,
            pages:1,
            loading:false
        };
    },
    methods: {
        init(){
            this.loading = true;
            // login请求
            commonAxios.post(commonAxios.getUrl('prcPhoneList'),{
                userId:this.$store.state.userId,
                customerName:this.Keyword,
                startTime:this.StartTime,
                endTime:this.EndTime,
                pageNum:this.page,
                pageSize:10
            },res => {
                this.loading = false;
                if(res.status == 'success'){
                    // Notify({ type: 'success', message: res.message });
                    this.total = res.count;
                    this.pages = Math.ceil((res.count == 0 ? 1 : res.count) / this.pageSize);
                    res.data.forEach(e => {
                        e.time = e.time ? this.getYMD(new Date(e.time).getTime()) :''
                    })
                    this.data = res.data;
                }else{
                    Notify(res.message);
                }
            })
        },
        // 查看
        view(id){
            this.$router.push('/home/historyDetails/' + id);
        },
        onStartTimeConfirm(date){
			this.StartTime = this.getYMD(date.getTime());
			this.StartTimeModal = false;
		},
		onEndTimeConfirm(date){
			this.EndTime = this.getYMD(date.getTime());
			this.EndTimeModal = false;
        },
        SwitchPage(type){
            if(type === 'prev')  this.page--;
            else if(type === 'next')  this.page++;
            this.init();
        }
    },
    created() {
        this.init();
    }
};
</script>
<style lang="scss">
.history {
    padding: 45px 0 50px 0;
    font-size: 0.13rem;
    box-sizing: border-box;

    h3 {
        font-size: 0.2rem;
        margin-bottom: 0.1rem;
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