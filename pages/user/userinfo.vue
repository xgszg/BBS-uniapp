<template>
	<view class="content">
		<!-- 背景图片 -->
		<u--image :showLoading="true" :src="userinfo.userbg" width="100%" height="200px" @click="click"></u--image>
		<!-- 个人信息的展示 -->
		<view class="userinfo-top">
			<view class="userinfo-head">
				<u--image :showLoading="true" :src="userinfo.usertx" width="80" height="80" @click="click"></u--image>
				<view class="userinfo-name">{{ userinfo.nickname }}</view>
			</view>
			<view class="userinfo-content">
				<u-tag :text="userinfo.hierarchy" size="mini" type="error"></u-tag>
				<u-tag v-if="userinfo.vip" text="vip" size="mini" type="error"></u-tag>
				<u-tag v-else bgColor="#D7D7D7" borderColor="#D7D7D7" color="#fff" text="vip" plain size="mini"></u-tag>
				<!-- <u-tag v-for="(item, index) in userinfo.title" :key="index" :text="item" plain size="mini" type="warning"></u-tag> -->
				<u-tag v-if="userinfo.title" :text=userinfo.title plain size="mini" type="warning"></u-tag>
			</view>
			<view style="margin-bottom: 5px;">
				<u--image v-for="(item, index) in userinfo.userbag" :key="item.id" :showLoading="true" :src="item.icon" width="40" height="40"></u--image>
			</view>
			<text>个性签名：{{ userinfo.signature }}</text>
			<view style="margin: 20px 0;">
				<u-grid :border="true">
					<u-grid-item>
						<text>{{ userinfo.invitationcount }}</text>
						<text class="grid-text">邀请总数</text>
					</u-grid-item>
					<u-grid-item @click="navClick(1,userinfo.id)">
						<text>{{ userinfo.followcount }}</text>
						<text class="grid-text">关注总数</text>
					</u-grid-item>
					<u-grid-item @click="navClick(2,userinfo.id)">
						<text>{{ userinfo.fencount }}</text>
						<text class="grid-text">粉丝总数</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view style="margin: 20px 0;">
				<u-grid :border="true">
					<u-grid-item>
						<text>{{ userinfo.postnum }}</text>
						<text class="grid-text">帖子数量</text>
					</u-grid-item>
					<u-grid-item>
						<text>{{ userinfo.likenum }}</text>
						<text class="grid-text">点赞数量</text>
					</u-grid-item>
					<u-grid-item>
						<text>{{ userinfo.commentsnum }}</text>
						<text class="grid-text">评论数量</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- 底部 -->
		<u-tabbar style="display: flex;" :fixed="false" :placeholder="false" :safeAreaInsetBottom="false">
			<u-button v-if="follow_status == 1 || follow_status == 3" style="margin: 10px 5px;" shape="circle" type="success" text="关注" @click="follow_users"></u-button>
			<u-button v-else-if="follow_status == 2" style="margin: 10px 5px;" shape="circle" iconColor="#D7D7D7" text="已关注" @click="follow_users"></u-button>
			<u-button v-else-if="follow_status == 0" style="margin: 10px 5px;" shape="circle" iconColor="#D7D7D7" text="互相关注" @click="follow_users"></u-button>
			<u-button style="margin: 10px 5px;" shape="circle" type="success" text="私聊"></u-button>
		</u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userid: '',
			userinfo: {},
			follow_status: 3,
		}
	},
	onLoad(item) {
		if (uni.getStorageSync('usertoken') == '') {
			uni.navigateTo({
				url: '/pages/user/login'
			})
		} else {
			//显示加载框
			// uni.showLoading({
			// 	title: '加载中'
			// });
			this.userid = item.userid;
			this.followState(item.userid);
			this.get_user_information(item.userid);
			// uni.hideLoading();
		}
	},
	onPullDownRefresh() {
		this.followState(this.userid);
		this.get_user_information(this.userid);
		uni.stopPullDownRefresh();
	},
	methods: {
		//获取用户信息
		async get_user_information(userid) {
			const response = await this.$api.get_user_information({
				"id": userid,
			})
			if (response.code === 200) {
				this.userinfo = response.data;
			} else {
				uni.showToast({
					title: response.msg,
					icon: "none"
				})
			}
		},
		//获取关注信息
		async followState(userid) {
			const response = await this.$api.followState({
				"userid": userid,
				"loginid": uni.getStorageSync('userid'),
			})
			if (response.code === 200) {
				this.follow_status = response.msg;
			} else {
				uni.showToast({
					title: response.msg,
					icon: "none"
				})
			}
		},
		//关注用户
		async follow_users() {
			const response = await this.$api.follow_users({
				"followedid": this.userid,
				"userid": uni.getStorageSync('userid'),
			})
			if (response.code === 200) {
				this.get_user_information(this.userid);
				this.followState(this.userid);
				uni.showToast({
					title: response.msg,
					icon: "none"
				})
			} else {
				uni.showToast({
					title: response.msg,
					icon: "none"
				})
			}
		},
		navClick(type, userid) {
			uni.navigateTo({
				url: '/pages/user/user_list?type='+type+'&userid='+userid
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.content {
	display: block;
	width: 100%;
	height: 100%;

	.userinfo-bg {
		display: block;
		width: 100%;
		height: 200px;
	}

	.userinfo-top {
		position: relative;
		background-color: #fff;
		margin-top: -20px;
		border-radius: 20px 20px 0 0;
		padding: 20px;

		.userinfo-head {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-bottom: 20px;

			.userinfo-name {
				font-size: 18px;
				font-weight: bold;
				margin-left: 10px;
			}
		}
	}

	.userinfo-content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;

		.u-transition {
			margin-right: 5px;
			margin-bottom: 10px;
		}
	}

}
</style>