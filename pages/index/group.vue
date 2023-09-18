<template>
	<view>
		<view class="group-list" @click="joinwx()">
			<u--image :showLoading="true" shape="circle" src="../../static/image/wx.png" width="60px" height="60px"></u--image>
			<view class="group-info">
				<view class="group-name">微信公众号</view>
				<view class="group-detail">关注官方公众号，加入默然云大家庭！</view>
			</view>
		</view>
		<view class="group-list" @click="joinqq()">
			<u--image :showLoading="true" shape="circle" src="../../static/image/qq.png" width="60px" height="60px"></u--image>
			<view class="group-info">
				<view class="group-name">QQ群聊</view>
				<view class="group-detail">群里有好多小伙伴，快来吧！</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
		joinwx() {
			//消息提示框
			uni.showToast({
				title: '待开发...',
				icon: 'none',
				duration: 2000
			});
		},
		joinqq() {
			// let key = 'HagcXgFHUIwpXVyfCMeudwM01-z80Cku';
			// plus.runtime.openURL(
			// 	'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D' +
			// 	key);
			//消息提示框
			uni.showToast({
				title: '待开发...',
				icon: 'none',
				duration: 2000
			});
		}
	}
}
</script>

<style lang="scss">
.group-list {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20px;

	.group-info {
		margin-left: 20px;

		.group-name {
			font-size: 17px;
			color: #333;
			margin-bottom: 5px;
		}

		.group-detail {
			font-size: 14px;
			color: #666;
		}
	}
}
</style>