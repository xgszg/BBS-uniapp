<template>
	<view>
		<u-skeleton rows="50" :title="false" :loading="skeleton_loading"></u-skeleton>
		<view class="plate-info" @click="to_section_info()">
			<u--image :showLoading="true" :src="plate_info.plateicon" width="80px" height="80px"></u--image>
			<view class="plate-detail">
				<view class="plate-name">{{ plate_info.platename }}</view>
				<view class="plate-number">话题 {{ plate_info.postnum }}</view>
				<view class="plate-admin">
					<u-avatar style="margin-right: 5px;" v-for="(item, index) in plate_info.admininfo" :key="index" :src="item.usertx" shape="circle" size="25"></u-avatar>
				</view>
			</view>
		</view>
		<u-divider></u-divider>
		<posts-list v-if="posts_list" :posts_list="posts_list"></posts-list>
		<u-loadmore v-if="posts_list!=''" iconType="circle" :status="status" />
		<view v-if="posts_list==''" style="margin-top: 300rpx;height: 100%;">
		    <u-empty mode="data" icon="/static/nodata/fans.png">
		    </u-empty>
		</view>
	</view>
</template>

<script>
import postsList from '@/components/posts-list/posts-list.vue';
export default {
	components: {
		postsList
	},
	data() {
		return {
			skeleton_loading: true,
			posts_list: [],
			plate_info: '',
			plate_id: '',
			currentPage: 1,
			pageCount: 1,
			status: 'more',
			limit: 10
		}
	},
	onLoad(item) {
		this.plate_id = item.plate_id,
			uni.setNavigationBarTitle({
				title: item.plate_name
			});
		this.get_posts_list(item.plate_id);
		this.get_section_information(item.plate_id);
	},
	//下拉刷新
	onPullDownRefresh() {
		this.get_posts_list(this.plate_id, 1, 1);
		this.get_section_information(this.plate_id);
		uni.stopPullDownRefresh();
	},
	//上拉刷新
	onReachBottom(e) {
		if (this.pageCount > this.currentPage) {
			this.status = 'loading'
			this.currentPage++
			this.get_posts_list(this.plate_id, this.currentPage);
		} else {
			this.status = 'no-more'
		}
	},
	methods: {
		async get_posts_list(plate_id, currentPage = 1, type = 0) {
			//获取置顶帖子
			const response = await this.$api.get_posts_list({
				plateid: plate_id,
				page: currentPage,
				status: 1,
				top: 1,
			})
			//获取正常的帖子
			const response1 = await this.$api.get_posts_list({
				plateid: plate_id,
				page: currentPage,
				status: 1,
				top: 0,
			})
			if (response.code === 200 && response1.code === 200) {
				this.skeleton_loading = false;
				var newlist = response.data;
				newlist = newlist.concat(response1.data);
				if (type == 0) {
					this.posts_list = this.posts_list.concat(newlist);
				} else {
					this.posts_list = newlist;
				}
				this.pageCount = response.data.pagecount;
				// this.currentPage = response.data.current_number;
			}
		},
		async get_section_information(plate_id) {
			const response = await this.$api.get_section_information({
				id: plate_id,
			})
			if (response.code === 200) {
				const newlist = response.data;
				this.plate_info = newlist;
			}
		},
		to_section_info() {
			uni.navigateTo({
				url: '/pages/forum/section?plate_id=' + this.plate_id
			});
		},
	}
}
</script>

<style lang="scss">
.plate-info {
	display: flex;
	padding: 10px;
	background-color: #fff;
	margin-bottom: 10px;

	.plate-detail {
		margin-left: 10px;

		.plate-name {
			font-size: 16px;
			color: #333;
		}

		.plate-number {
			font-size: 12px;
			color: #999;
			margin-top: 5px;
		}

		.plate-admin {
			display: flex;
			margin-top: 10px;

			u-avatar {
				margin-right: 5px;
			}
		}
	}
}
</style>