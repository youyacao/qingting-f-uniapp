<template>
	<view class="content">
		<view class="top-box" v-if="videoInfo">
			<image class="top-bg-image" src="@/static/images/no_image.jpg"></image>
			<view class="info-box">
				<text>测试</text>
			</view>

			<view class="play-btn">
				<text class="play-btn-text">播放</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {getVideo} from "@/js_sdk/video.js"
	export default {
		data() {
			return {
				vid:null,
				videoInfo:null
			}
		},
		computed:{
			...mapGetters(["video"])
		},
		onLoad(options) {
			this.vid = options.id
			this.loadViedoInfo()
		},
		onShow() {
			if(this.video){
				this.videoInfo = this.video
				uni.setNavigationBarTitle({
					title:this.video.title
				})
				this.$store.dispatch("video",null)
			}
		},
		methods: {
			loadViedoInfo(){
				getVideo(this.vid).then(res=>{
					this.videoInfo = res.data
				}).catch(error=>{
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.top-bg-image{
	filter:blur
}
.play-btn{
	display: flex;
	flex-direction: row;
	background-color:#f42c2c;
	padding: 20rpx;
	border-radius: 10rpx;
	flex-direction: row;
	justify-content: center;
	margin: 20rpx;
}
.play-btn-text{
	font-size: $uni-font-size-base;
	color: #FFFFFF;
}
</style>
