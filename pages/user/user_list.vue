<template>
	<view>
		<view v-if="user_list==''" style="margin-top: 300rpx;height: 100%;">
		    <u-empty mode="data" icon="/static/nodata/fans.png">
		    </u-empty>
		</view>
		<view class="userinfo" v-for="(item, index) in user_list" :key="item.id" @click="to_user_info(item.id)">
			<u-avatar :src="item.usertx" shape="circle"></u-avatar>
			<view class="userinfo-right">
				<view class="userinfo_name">{{ item.nickname }}</view>
				<view class="userinfo_tag">
					<text v-if="item.sex == '男'" class="userinfo_tag_list">男</text>
					<text v-else class="userinfo_tag_list">女</text>
					<text v-if="item.title" class="userinfo_tag_list">{{ item.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userid: '',
			user_list: [],
		}
	},
	onLoad(options) {
		this.userid = options.userid;
		//type == 1 关注列表 type == 2 粉丝列表
		if (options.type == 1) {
			uni.setNavigationBarTitle({
				title: '关注列表'
			});
			this.get_follow_list();
		} else if (options.type == 2) {
			uni.setNavigationBarTitle({
				title: '粉丝列表'
			});
			this.get_fan_list();
		}
	},
	methods: {
		//查询关注列表
		async get_follow_list() {
			const response = await this.$api.get_follow_list({
				"userid": this.userid,
			});
			if (response.code === 200) {
				this.user_list = response.data;
			} else {
				uni.showToast({
					title: response.msg,
					icon: "none"
				})
			}
		},
		//查询粉丝列表
		async get_fan_list() {
			const response = await this.$api.get_fan_list({
				"userid": this.userid,
			});
			if (response.code === 200) {
				this.user_list = response.data;
			} else {
				uni.showToast({
					title: response.msg,
					icon: "none"
				})
			}
		},
		to_user_info(userid) {
			uni.navigateTo({
				url: '/pages/user/userinfo?userid=' + userid
			});
		},
	}
}
</script>

<style lang="scss" scoped>
.userinfo {
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: #fff;
	border-bottom: 1px solid #e0e0e0;

	.userinfo-right {
		display: flex;
		align-items: flex-start;
		width: 100%;
		margin-left: 10px;
		flex-wrap: nowrap;
		flex-direction: column;

		.userinfo_name {
			font-size: 16px;
		}

		.userinfo_tag {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;

			.userinfo_tag_list {
				background-color: #5ac725;
				height: 15px;
				line-height: 15px;
				font-size: 13px;
				padding: 2px 5px;
				border-radius: 5px;
				color: #fff;
				margin-right: 3px;
			}
		}
	}
}
</style>
