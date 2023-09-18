<template>
	<view class="container">
		<u-skeleton rows="50" :title="false" :loading="skeleton_loading"></u-skeleton>
		<u-row customStyle="margin-bottom: 10px;flex-wrap: wrap;">
			<u-col span="6" v-for="(item,index) in plate_list" :key="item.id">
				<view class="application-list" @click="gotoPages(item)">
					<u--image :showLoading="true" :src="item.plateicon" width="80px" height="80px" shape="circle"></u--image>
					<view class="application-name">{{ item.platename }}</view>
					<view class="application-jieshao">板块介绍：{{ item.plateontent }}<span v-if='!item.plateontent'>暂无介绍</span></view>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
export default {
	data() {
		return {
			plate_list: [],
			skeleton_loading: true
		}
	},
	onPullDownRefresh() {
		this.get_section_list()
		uni.stopPullDownRefresh();
	},
	methods: {
		async get_section_list() {
			const response = await this.$api.get_section_list({
				limit: 1000,
				page: 1
			})
			if (response.code === 200) {
				this.plate_list = response.data;
				this.skeleton_loading = false
			}
		},
		gotoPages(e) {
			uni.navigateTo({
				url: '/pages/forum/post_list?plate_id=' + e.id + '&plate_name=' + e.platename
			})
		},
	},
	onLoad() {
		this.get_section_list()
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 20upx;
	background-color: #fff;
}

.application-list {
	display: flex;
	align-items: center;
	margin-bottom: 20upx;
	padding: 10px 0;
	border-radius: 15px;
	background-color: #fafafa;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	flex-direction: column;
	float: right;
	margin: 10px;

	.application-name {
		margin-top: 10px;
	}
	.application-jieshao {
		font-size: 14px;
	}
}
</style>