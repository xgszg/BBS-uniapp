<template>
	<view>
		<u-skeleton rows="50" :title="false" :loading="skeleton_loading"></u-skeleton>
		<!-- 排行榜菜单 -->
		<u-tabs :list="menu_list" :scrollable="false" :activeStyle="{
			color: '#fff',
			backgroundColor: '#2197EF',
			borderRadius: '20px',
			padding: '5px 10px'
		}" lineColor="#fff" @click="click"></u-tabs>
		<view>
			<!-- 排行榜列表 -->
			<view class="ranking_list" v-for="(item, index) in user_list" :key="index">
				<view class="ranking_one">{{ index + 1 }}</view>
				<u-avatar class="ranking_avatar" :src="item.usertx" :size="60" shape="circle"></u-avatar>
				<view class="ranking_info">
					<text class="ranking_username">{{ item.nickname }}</text>
					<text class="ranking_number" v-if="type==0">拥有 {{ item.money }} 金币</text>
					<text class="ranking_number" v-else-if="type==2">拥有 {{ item.exp }} 经验</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menu_list: [{
				name: '金币排行榜',
			}, {
				name: '经验排行榜'
			}],
			type: 0,
			user_list: [],
			skeleton_loading: true
		}
	},
	onLoad() {
		this.ranking_list('money')
	},
	methods: {
		click(item) {
			this.skeleton_loading = true;
			if (item.index == 0) {
				this.type = 0;	
				this.ranking_list('money');
			} else if (item.index == 1) {
				this.type = 2;
				this.ranking_list('exp');
			}
		},
		// 获取推荐帖子
		async ranking_list(sort = 'money', page = 1, limit = 30) {
			const response = await this.$api.ranking_list({
				sort: sort,
				page: page,
				limit: limit
			})
			if (response.code === 200) {
				const newlist = response.data;
				this.user_list = newlist;
				this.skeleton_loading = false;
			}
		},
	}
}
</script>

<style lang="scss">
.ranking_list {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 10px;

	.ranking_one {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 50%;
		background-color: #2197EF;
		color: #fff;
		margin-right: 10px;
	}

	.ranking_avatar {
		margin-right: 10px;
	}

	.ranking_info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	.ranking_username {
		font-size: 16px;
		margin-bottom: 10px;
		color: #333;
	}

	.ranking_number {
		font-size: 14px;
		color: #666;
	}
}
</style>
