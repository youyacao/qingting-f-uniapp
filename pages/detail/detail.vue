<template>
	<view class="content">
		<video id="myVideo" 
			style="width: 0px;height: 0px;"
			:autoplay="true"
			:title="videoTitle"
			:src="videoUrl"
			@error="videoErrorCallback" 
			:danmu-list="danmuList"
			@fullscreenchange="onFullscreen"
			@ended="onEnd"
			enable-danmu danmu-btn controls></video>
		<view class="top-box" v-if="videoInfo">
			<view class="bg-box">
				<image class="top-bg-image" :src="videoInfo.thumb" v-if="videoInfo.thumb"></image>
				<image class="top-bg-image" src="@/static/images/no_image.jpg" v-else></image>
			</view>
			<view class="top-conent-box">
				<view class="info-box">
					<view class="thumb-box">
						<image class="thumb-image" :src="videoInfo.thumb" v-if="videoInfo.thumb"></image>
						<image class="thumb-image" src="@/static/images/no_image.jpg" v-else></image>
						<text class="score-text">{{videoInfo.score}}</text>
					</view>
					<view class="info">
						<text class="year">{{videoInfo.year}}</text>
						<text class="country">{{videoInfo.region_str}}</text>
						<text class="duration">{{videoInfo.duration}}</text>
					</view>
					
				</view>
				
				<view class="play-btn" hover-class="btn-press" @click="playVideo(0)">
					<text class="icon-font play-btn-text" style="margin-right: 10rpx;">&#xe672;</text>
					<text class="play-btn-text">播放</text>
				</view>
				<view class="subtitle-box">
					<text class="subtitle-text">{{videoInfo.subtitle}}</text>
				</view>
				<view class="tool-box">
					<view class="tool-item">
						<text class="icon-font icon">&#xe651;</text>
						<text class="text">片单</text>
					</view>
					<view class="tool-item">
						<text class="icon-font icon">&#xe756;</text>
						<text class="text">评价</text>
					</view>
					<view class="tool-item">
						<text class="icon-font icon">&#xe600;</text>
						<text class="text">分享</text>
					</view>
					<view class="tool-item">
						<text class="icon-font icon">&#xe625;</text>
						<text class="text">下载</text>
					</view>
				</view>
			</view>
		</view>
		<view class="video-list-box">
			<view class="title">选择剧集</view>
			<view class="list-box">
				<text class="text" 
					:class="{'select':playIndex == index}" 
					v-for="(item,index) in videoList" 
					:key="item.id"
					@click="playVideo(index)">{{item.title}}</text>
			</view>
		</view>
		<view class="comment-box">
			<view class="title">影评</view>
			<view class="comment-list">暂无内容</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {getVideo,getVideoList} from "@/js_sdk/video.js"
	export default {
		data() {
			return {
				vid:null,
				videoInfo:null,
				videoList:[],
				playIndex:-1,
				videoUrl:null,
				danmuList:[],
				player:null,
				videoTitle:null
			}
		},
		computed:{
			...mapGetters(["video"])
		},
		onLoad(options) {
			this.vid = options.id
			this.loadViedoInfo()
			this.loadVideoList()
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
					this.videoTitle = this.videoInfo.title
					uni.setNavigationBarTitle({
						title:this.videoTitle
					})
				}).catch(error=>{
					console.log(error)
				})
			},
			loadVideoList(){
				getVideoList(this.vid).then(res=>{
					this.videoList = res.data.list
				}).catch(error=>{
					console.log(error)
				})
			},
			playVideo(index){
				if(this.videoList.length == 0){
					uni.showToast({
						icon:"none",
						title:"暂无可播放视频",
						duration:2500
					})
					return
				}
				if(index == this.playIndex && this.player){
					this.player.requestFullScreen()
					this.player.play()
					return 
				}
				this.playIndex = index
				if(!this.player){
					this.player = uni.createVideoContext('myVideo')
				}
				this.videoUrl = this.videoList[index].url
				this.player.requestFullScreen()
				this.player.play()
			},
			videoErrorCallback(e){
				console.log(e)
			},
			onFullscreen({detail}){
				if(!detail.fullScreen && this.player){
					this.player.pause()
				}
			},
			onEnd(){
				if(this.playIndex<this.videoList.length - 1){
					uni.showToast({
						icon:"none",
						title:"正在自动切换下一集"
					})
					this.playIndex++
					this.videoUrl = this.videoList[this.playIndex].url
					this.player.play()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "../../common/font.css";

.content{
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 100vh;
	background-color:#000000;
}
.top-box{
	display: flex;
	position: relative;
	flex-direction: column;
}
.bg-box{
	position: absolute;
	width: 100%;
	height: 100%;
}
.top-bg-image{
	filter:blur(8px);
	width: 100%;
	height: 100%;
}
.top-conent-box{
	z-index: 999;
	background-image: linear-gradient(rgba(28,28,28,0), rgba(28,28,28,1));
}
.thumb-box{
	width: 220rpx;
	height: 280rpx;
	background-color: #C8C7CC;
	margin: auto;
	margin-top: 60rpx;
	overflow:hidden;
	position: relative;
}
.thumb-image{
	width: 220rpx;
	height: 280rpx;
}
.score-text{
	position: absolute;
	font-size: $uni-font-size-base;
	color: #ce5e30;
	bottom: 5rpx;
	right: 10rpx;
}
.info{
	text-align: center;
	padding: 20rpx;
	color: #C0C0C0;
}
.info .year{
	margin-right: 20rpx;
}
.info .duration{
	margin-left: 20rpx;
}
.play-btn{
	display: flex;
	flex-direction: row;
	background-color:#f42c2c;
	padding: 20rpx;
	border-radius: 10rpx;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 20rpx;
}
.play-btn-text{
	font-size: $uni-font-size-base;
	color: #FFFFFF;
}
.subtitle-box{
	padding: 20rpx;
	font-size: $uni-font-size-base;
	color: #FFFFFF;
	font-weight: bold;
}
.tool-box{
	display: flex;
	flex-direction: row;
	padding: 30rpx 80rpx 80rpx;
	justify-content: space-between;
	align-items: center;
}
.tool-box .tool-item{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.tool-box .tool-item .icon{
	color: #FFFFFF;
	font-size: 48rpx;
	margin-bottom: 20rpx;
}
.tool-box .tool-item .text{
	color: #C8C7CC;
	font-size: 28rpx;
}	
.video-list-box{
	background-color: #1c1c1c;
	padding: 20rpx;
}
.video-list-box .title{
	color: #FFFFFF;
	font-size: $uni-font-size-lg;
	font-weight: bold;
}
.video-list-box .list-box{
	padding: 20rpx 0rpx;
}
.video-list-box .list-box .text{
	color: #F1F1F1;
	font-size: $uni-font-size-base;
	border: #F8F8F8 1px solid;
	padding: 10rpx 20rpx;
	margin: 10rpx;
}
.video-list-box .list-box .select{
	color:#F0AD4E;
	border: #F0AD4E 1px solid;
}
.btn-press{
	opacity: 0.7;
}
.comment-box{
	margin-top: 20rpx;
	background-color: #1c1c1c;
	padding: 20rpx;
}
.comment-box .title{
	color: #FFFFFF;
	font-size: $uni-font-size-lg;
	font-weight: bold;
}
.comment-box .comment-list{
	padding: 20rpx 0;
	color: #F8F8F8;
}
</style>
