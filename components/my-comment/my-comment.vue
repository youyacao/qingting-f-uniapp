<template>
	<view style="flex: 1;">
		<list style="flex: 1;" @loadmore="onLoadMore" :loadmoreoffset="100" ref="list">
			<cell>
				<view class="comment-list">
					<text class="nodata-box" v-if="!commentData || commentData.list.length == 0">{{loaded ? '暂无内容' : '正在加载...'}}</text>
					<view v-else class="comment-item" v-for="(comment,index) in commentData.list" :key="'list_'+comment.id">
						<view class="info-box">
							<view class="avatar-box">
								<image class="avatar-image" :src="comment.avatar"></image>
								<view class="user-info">
									<text class="username">{{comment.nickname ? comment.nickname : comment.username}}</text>
									<text class="comment-date">{{comment.mtime}}</text>
								</view>
							</view>
							<text class="follow-btn" @click="onFollow(comment)" v-if="comment.is_follow == 0">关注</text>
							<text class="cancel-follow-btn" @click="cancelFollowUser(comment)" v-else>取消关注</text>
						</view>
						
						<text class="comment-content">{{comment.content}}</text>
						<view class="comment-image-list" v-if="comment.images">
							<image :src="image" 
								class="comment-image" 
								v-for="(image,_index) in comment.images" 
								@click="onPreimages(comment.images,_index)" 
								:key="'image_'+_index"></image>
						</view>
						<my-card style="margin-top: 20rpx;" :info="comment.movie" v-if="comment.movie"></my-card>
						
					</view>
				</view>
			</cell>
		</list>
	</view>
</template>

<script>
	import {
		getComment
	} from "@/js_sdk/video.js"
	import {
		followUser,
		cancelFollowUser
	} from "@/js_sdk/user.js"
	
	export default {
		data() {
			return {
				commentData:null,
				loaded:false,
				test:{movie:{title:'test'}}
			};
		},
		props:{
			type:{
				type:Number,
				default:0
			},
			user_id:{
				type:Number,
				default:0
			},
			followed:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			this.getCommentData()
		},
		methods:{
			getCommentData(replace){
				getComment({
					type:3,
					order:this.type,
					user_id:this.user_id,
					page:this.commentData ? this.commentData.current_page : 1
				},this.followed).then(res=>{console.log(res.data)
					this.loaded = true
					if(replace){
						this.commentData = res.data
					}else{
						if(!this.commentData){
							this.commentData = res.data
						}else{
							this.commentData.list = this.commentData.list.concat(res.data.list)
						}
					}
					 this.$refs["list"].resetLoadmore();
					
					//console.log(res)
				}).catch(error=>{
					this.loaded = true
					console.log(error)
				})
			},
			onPreimages(images,index){
				var list = []
				for(var i=0;i<images.length;i++){
					var item = images[i]
					if(!item) continue
					var length = item.indexOf("?")
					list.push(length == -1 ? item : item.substr(0,length))
				}
				
				uni.previewImage({
					current:index,
					urls:list
				})
			},
			onLoadMore(){
				if(this.commentData.current_page>=this.commentData.total_page) return
				this.commentData.current_page++
				
				this.getCommentData()
			},
			onFollow(item){
				uni.showLoading({
					title:"正在提交"
				})
				followUser({
					follow_id:item.user_id
				}).then(res=>{
					uni.showToast({
						title:res.msg
					})
					item.is_follow = 1
				}).catch(error=>{
					console.log(error)
				})
			},
			cancelFollowUser(item){
				uni.showLoading({
					title:"正在提交"
				})
				cancelFollowUser({
					follow_id:item.user_id
				}).then(res=>{
					uni.showToast({
						title:res.msg
					})
					item.is_follow = 0
				}).catch(error=>{
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.nodata-box{
	padding: 20rpx;
	text-align: center;
	font-size: $uni-font-size-base;
	color: #F1F1F1;
}
.comment-list{
	padding: 20rpx;
}
.comment-item{
	border-bottom-color: #353535;
	border-bottom-width: 1px;
	padding: 20rpx 0;
}
.info-box{
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.avatar-box{
	flex-direction: row;
	align-items: center;
}
.avatar-image{
	width: 80rpx;
	height: 80rpx;
	border-radius: 80rpx;
	border-width: 2px;
	border-color: #ff7ddd;
}
.user-info{
	flex-direction: column;
	margin-left: 20rpx;
}
.username{
	font-size: 32rpx;
	font-weight: bold;
	color: #F1F1F1;
}
.comment-date{
	font-size: 28rpx;
	color: #C8C7CC;
}
.comment-content{
	padding: 20rpx 0;
	font-size: $uni-font-size-base;
	color: #F1F1F1;
}
.comment-image-list{
	flex-direction: row;
	flex-wrap: wrap;
}
.comment-image{
	width: 215rpx;
	height: 215rpx;
	margin: 10rpx;
}
.follow-btn{
	background-color: #DD524D;
	color: #F1F1F1;
	font-size: $uni-font-size-base;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
}
.cancel-follow-btn{
	background-color: #3F536E;
	color: #F1F1F1;
	font-size: $uni-font-size-base;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
}
</style>
