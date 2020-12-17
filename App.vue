<script>
	import {getUser} from "@/js_sdk/user.js"
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 保持屏幕常亮
			uni.setKeepScreenOn({
			    keepScreenOn: true
			})
			//获取用户信息
			getUser().then(res=>{
				this.$store.dispatch("userInfo",res.data)
			}).catch(error=>{
				console.log(error)
			})
			//强制竖屏，禁止横屏
			plus.screen.lockOrientation('portrait-primary')
			const info = uni.getSystemInfoSync()
			//添加状态栏高度
			this.$store.dispatch("statusBarHeight",info.statusBarHeight)
			//添加窗口宽高
			this.$store.dispatch("pageInfo",{
				width:info.windowWidth,
				height:info.windowHeight
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.blank-height{
		height: 20rpx;
		background-color: #000000;
	}
</style>
