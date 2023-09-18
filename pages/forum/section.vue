<template>
	<view>
		<u-skeleton rows="50" :title="false" :loading="skeleton_loading"></u-skeleton>
		<view style="background-color: #666;height: 50px;"></view>
		<view style="background-color: #F8F8F8;height: max-content;padding: 10px;">
			<view class="plate_info-header">
				<view class="plate_info-title">
					<u--image class="plate_img" :showLoading="true" :src="plate_info.plateicon" width="60" height="60"></u--image>
					<view class="plate_info-name">{{ plate_info.platename }}</view>
				</view>
				<view class="plate_info-description">{{ plate_info.plateontent }}</view>
			</view>
			<!-- 版主 -->
			<view class="plate-info-section" v-if="plate_info.admininfo!=null && plate_info.admininfo.length != 0">
				<view class="section-title">版主</view>
				<view class="section-user-list">
					<view class="section-user-info" @click="to_user_info(item.id)" v-for="(item, index) in plate_info.admininfo" :key="item.id">
						<u-avatar :src="item.usertx" fontSize="22"></u-avatar>
						<view>{{ truncatedNickname(item.username) }}</view>
					</view>
				</view>
			</view>
			<view class="plate-info-section">
				<view class="section-title">板块公告</view>
				{{ plate_info.plategg }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			plate_id: '',
			plate_info: '',
			skeleton_loading: true, //骨架屏
		}
	},
	onLoad(item) {
		this.plate_id = item.plate_id;
		this.get_section_information(item.plate_id);
	},
	methods: {
		async get_section_information(plate_id) {
			const response = await this.$api.get_section_information({
				id: plate_id,
			})
			if (response.code === 200) {
				const newlist = response.data;
				this.plate_info = newlist;
				uni.setNavigationBarTitle({
					title: newlist.platename
				});
				this.skeleton_loading = false;
			}
		},
		//截取用户名
		truncatedNickname(nickname) {
			if (nickname.length > 2) {
				return nickname.slice(0, 2);
			} else {
				return nickname;
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
.plate_info-header {
	background-color: #fff;
	margin: -20px 10px 10px 10px;
	border-radius: 10px;


	.plate_info-title {
		display: flex;
		align-items: center;

		.plate_img {
			margin: -15px 10px 10px 10px;
			background-color: #fff;
			border-radius: 10px;
		}

		.plate_info-name {
			margin-left: 5px;
			margin-top: -8px;
		}
	}

	.plate_info-description {
		padding: 0 10px 10px;
		font-size: 13px;
		color: #666;
	}

}

.plate-info-section {
	background-color: #fff;
	margin: 10px 10px 10px 10px;
	padding: 10px;
	border-radius: 10px;

	.section-title {
		margin-bottom: 10px;
		margin-left: 5px;
	}

	.section-user-list {
		display: flex;
		flex-wrap: wrap;

		.section-user-info {
			display: flex;
			align-items: center;
			margin: 5px;
			flex-direction: column;

			view {
				color: #666;
				margin-top: 2px;
			}
		}
	}
}
</style>
