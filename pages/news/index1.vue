<template>
	<view>
		<view class="news-list">
			<view class="news-item" v-for="(item,index) in message_list" :key="index">
				<view class="news-item-title">{{item.title}}</view>
				<view class="news-item-content">{{item.content}}</view>
				<view class="news-item-time">{{item.create_time}}</view>
			</view>
		</view>
		<view class="no-more" v-if="status == 'no-more'">没有更多了</view>
		<view class="loading" v-if="status == 'loading'">加载中...</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message_list: [],
				currentPage: 1,
				pageCount: 1,
				status: 'more',
				limit: 10
			}
		},
		onLoad() {
			if (uni.getStorageSync('usertoken') == '') {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				//显示加载框 
				uni.showLoading({
					title: '加载中'
				});
				this.get_message_notifications();
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.get_message_notifications(1, 1);
			uni.stopPullDownRefresh();
		},
		//上拉刷新
		onReachBottom(e) {
			if (this.pageCount > this.currentPage) {
				this.status = 'loading'
				this.currentPage++
				this.get_message_notifications(this.currentPage);
			} else {
				this.status = 'no-more'
			}
		},
		methods: {
			async get_message_notifications(currentPage = 1, type = 0) {
				const response = await this.$api.get_message_notifications({
					page: currentPage,
					userid: uni.getStorageSync('userid'),
				})
				if (response.code === 200) {
					uni.hideLoading();
					const newlist = response.data;
					if (type == 0) {
						this.message_list = this.message_list.concat(newlist);
					} else {
						this.message_list = newlist;
					}
					this.pageCount = response.msg;
					// this.currentPage = response.msg;
				}
			},
		}
	}
</script>

<style>
</style>