import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userId:sessionStorage.getItem('userId') || ''
	},
	mutations: {
		getUserId (state,userId) {
			sessionStorage.setItem('userId',userId);
			state.userId = userId;
		}
	},
	actions: {
	},
	modules: {
	}
})
