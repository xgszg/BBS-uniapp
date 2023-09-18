<template>
	<view style="background-color: #fff;">
		<view class="posts-list" v-for="(item, index) in posts_list" :key="index" @click="gotoPages(item)">
			<view class="posts-title">
				<text class="posts-tag" v-if="item.top == 1" style="background-color: #26DFC0;">置</text>
				<text class="posts-tag" v-if="item.featured == 1" style="background-color: #F2BE12;">精</text>
				<text class="posts-tag" v-if="item.popular == 1" style="background-color: #FB465F;">热</text>
				{{ item.title }}
			</view>
			<view class="posts-content">
				{{ item.content }}
			</view>
			<view class="posts-img-list" v-if="item.pic_url.length != 0">
				<u--image class="posts-img" :showLoading="true" v-for="(img_item, index) in item.pic_url.slice(0, 3)" :key="index" :src="img_item" width="100px" height="100px" radius="5"></u--image>
			</view>
			<view class="posts-footer">
				<view class="posts-footer-left">
					<u-avatar :src="item.usertx" size="20" shape="circle"></u-avatar>
					<text class="posts-username">{{ truncatedNickname(item.nickname) }}</text>
					<text class="posts-update-time">{{ formatTimeDifference(item) }}</text>
				</view>
				<view class="posts-footer-right">
					<u-icon name="eye" color="#909399" size="20"></u-icon><text>{{ item.view }}</text>
					<u-icon name="thumb-up" color="#909399" size="20"></u-icon><text>{{ item.thumbs }}</text>
					<u-icon name="chat" color="#909399" size="20"></u-icon><text>{{ item.comment }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "posts-list",
	props: {
		posts_list: {
			type: Array
		}
	},
	data() {
		return {

		};
	},
	methods: {
		gotoPages(e) {
			uni.navigateTo({
				url: '/pages/forum/article_details?post_id=' + e.id
			})
		},
		//截取用户名
		truncatedNickname(nickname) {
			if (nickname.length > 20) {
				return nickname.slice(0, 2);
			} else {
				return nickname;
			}
		},
		formatTimeDifference(e) {
			const now = new Date();
			const target = new Date(e.updatetime);
			const diffInMilliseconds = now - target;
			const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
			const diffInHours = Math.floor(diffInMinutes / 60);
			const diffInDays = Math.floor(diffInHours / 24);
			if(diffInMinutes < 1){
				return '刚刚';
			}
			else if (diffInMinutes <= 60) {
				return `${diffInMinutes}分钟前`;
			} else if (diffInHours <= 23) {
				return `${diffInHours}小时前`;
			} else if (diffInHours <= 47) {
				return '昨天';
			} else if (diffInHours <= 72) {
				return '前天';
			} else {
				return `${diffInDays}天前`;
			}
		},
	}
}
</script>


<style lang="scss">
.posts-list {
	margin: 0 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
	padding: 20rpx;
	border-bottom: 1px solid #e0e0e0;

	.posts-title {
		font-size: 16px;
		font-weight: bold;
		color: #303133;
		margin-bottom: 10rpx;
		line-height: 1.5;
	}

	.posts-tag {
		color: #fff;
		margin-right: 2px;
		padding: 1px 4px;
		font-weight: 400;
		border-radius: 5px;
	}

	.posts-content {
		font-size: 15px;
		color: #606266;
		line-height: 1.5;
	}

	.posts-img-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 15rpx;

		.posts-img {
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
	}

	.posts-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 15rpx;

		.posts-footer-left {
			display: flex;
			align-items: flex-start;

			.posts-username {
				font-size: 13px;
				color: #606266;
				margin-left: 10rpx;
			}

			.posts-update-time {
				font-size: 14px;
				color: #909399;
				margin-left: 15rpx;
			}
		}

		.posts-footer-right {
			display: flex;
			align-items: center;

			u-icon {
				margin-left: 10rpx;
			}

			text {
				font-size: 14px;
				color: #909399;
				margin: 0 8rpx;
			}
		}
	}
}
</style>