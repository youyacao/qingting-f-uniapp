import Vue from "vue"
import Vuex from "vuex"
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
	getters,
	state: {
		tempVideo:null
	},
	mutations: {
		setTempVideo(state,data){
			state.tempVideo = data
		}
	},
	actions: {
		video(context, data){
			context.commit("setTempVideo", data)
		}
	}
})

export default store
