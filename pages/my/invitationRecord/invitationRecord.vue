<template>
	<view class="invitation-record">
		<view class="no-more" v-if="!init">正在加载...</view>
		<view class="invitation-record_item" v-for="(item, index) in list">
			<image class="invitation-record_avatar" :src="item.avatar" mode="" v-if="item.avatar"></image>
			<image class="invitation-record_avatar" src="@/static/default_avatar.jpg" mode="" v-else></image>
			<view class="invitation-record_content">
				<view class="invitation-record_username">{{ item.username }}</view>
				<view class="invitation-record_time">{{ item.created_at }}</view>
			</view>
		</view>
		<view class="no-more" v-if="init && total <= 5">没有更多了</view>
		<view class="no-more" v-if="init && loading">正在加载更多...</view>
	</view>
</template>

<script>
	import { agentList } from '@/js_sdk/user.js'
	
	export default {
		data() {
			return {
				list: [],
				init: false,
				last_page: false,
				total: 0,
				loading: false,
			}
		},
		onLoad() {
			this._agentList()
		},
		onReachBottom() {
			if (!this.last_page) {
				this.loading = true
				this.page++
				this._agentList()
			}
		},
		methods: {
			_agentList() {
				agentList({
					page: this.page,
					limit: 10
				}).then(({ code, data }) => {
					console.log(data)
					this.init = true
					if (code === 200) {
						const { total, total_page, current_page, list } = data
						this.total = total
						if (current_page >= total_page) {
							this.last_page = true
						}
						if (current_page === 1) {
							this.list = list
						} else {
							this.list = this.list.concat(list)
						}
						this.loading = false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.no-more {
		text-align: center;
		font-size: 24rpx;
		color: #909399;
	}
	.invitation-record_username {
		color: #303133;
		font-size: 32rpx;
		margin-bottom: 10rpx;
	}
	.invitation-record_time {
		font-size: 24rpx;
		color: #909399;
	}
	.invitation-record_avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.invitation-record_item {
		display: flex;
		border-radius: 6px;
		background: #ffffff;
		box-shadow:  5px 5px 10px #d9d9d9,
		             -5px -5px 10px #ffffff;
		margin-bottom: 30rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
	}
	.invitation-record {
		padding: 30rpx;
	}
	page {
		background-color: #f3f4f6;
	}
</style>
