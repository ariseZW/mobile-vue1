<template>
    <div class="home">
		<!-- router -->
        <router-view></router-view>

		<!-- nav -->
        <van-tabbar v-model="active" route fixed>
            <van-tabbar-item to="/home/history">
				<span>历史协议</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon[1].active : icon[1].inactive"
                />
			</van-tabbar-item>
            <van-tabbar-item to="/home/new">
                <span>新建报价</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon[0].active : icon[0].inactive"
                />
            </van-tabbar-item>
            <!-- <van-tabbar-item to="/home/statistics">
				<span>统计</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon[2].active : icon[2].inactive"
                />
			</van-tabbar-item> -->
        </van-tabbar>
    </div>
</template>

<script>
// axios
import commonAxios from "@/api/commonAxios";
// 正则
import regulars from "@/assets/js/regulars";
export default {
    name: "home",
    provide(){
        return {
        }
    },
    components: {},
    data() {
        return {
			active: '/home/new',
			icon: [
				{ active: require('../assets/image/h1.png'), inactive: require('../assets/image/h.png') },
				{ active: require('../assets/image/x1.png'), inactive: require('../assets/image/x.png') },
				{ active: require('../assets/image/t1.png'), inactive: require('../assets/image/t.png') },
            ],
            isRouter:this.reload
		};
    },
    watch: {
        $route(){
            //跳转到该页面后需要进行的操作
            window.location.reload();
        }
    },
    methods: {
    },
    created() {}
};
</script>

<style lang="scss">
.home {
    .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed{
        z-index: 999!important;
    }
}
</style>
