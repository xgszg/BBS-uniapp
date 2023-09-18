<template>
	<view style="padding-bottom: 10px;">
		<u-skeleton rows="50" :title="false" :loading="skeleton_loading"></u-skeleton>
		<view class="activity-list" v-for="(item,index) in activity_list" :key="index" @click="gotoPages(index)">
			<image class="activity-image" :src="item.image" />
			<view class="activity-title">{{ item.title }}</view>
			<view class="activity-detail">{{ item.detail }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skeleton_loading: true,
				activity_list: []
			}
		},
		onLoad() {
			this.get_app_info();
		},
		methods: {
			// 获取APP信息 
			async get_app_info() {
				const response = await this.$api.get_app_info();
				if (response.code === 1) {
					this.activity_list = response.data.app_exten_info.activity;
					this.skeleton_loading = false;
				}
			},
			gotoPages(index) {
				const linkUrl = this.activity_list[index].linkUrl;
				uni.navigateTo({
					url: '/pages/common/webview?url=' + linkUrl
				})
			},
		}
	}
</script>

<style lang="scss">
	.activity-list {
		height: 220px;
		background-color: #fff;
		margin: 10px 20px 20px 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

		.activity-image {
			width: 100%;
			height: 150px;
			border-radius: 10px 10px 0 0;
		}

		.activity-title {
			font-size: 15px;
			font-weight: bold;
			color: #303133;
			margin-bottom: 10rpx;
			line-height: 1.5;
			margin: 5px 10px 0 10px;
		}

		.activity-detail {
			font-size: 13px;
			color: #606266;
			line-height: 1.5;
			margin: 5px 10px 0 10px;
		}
	}
</style>