<template>
	<view class="body">
		<u-swiper :list="list" keyName="image" showTitle :autoplay="true" circular radius="10" height="160"></u-swiper>
		<view class="forum_cate">
			<view class="cate_list">
				<view class="cate_item1">
					<view class="cate_name">版块列表</view>
				</view>
				<view v-for="(sort, sortindex) in SortList" :key="sortindex" @click="GoSortList(sort)">
                <!-- <view v-for="(sort, sortindex) in SortList" :key="sortindex" @click="GoSortList()"> -->
					<view class="cate_info">
						<view class="cate_item">
							<view class="cate_icon">
								<image class="img" :src="sort.plateicon" />
							</view>
							<view class="cate_name1">{{sort.platename}}</view>
							<view class="cate_num">{{sort.plateontent}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
					image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东',
					poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}],
				SortList: []
			}
		},
		onLoad() {
			this.GetPlateList();
		},
        onPullDownRefresh() {
            this.GetPlateList();
            uni.stopPullDownRefresh()
        },
		methods: {
			async GetPlateList() {
				const response = await this.$api.get_section_list({
					limit: 1000,
					page: 1
				})
				if (response.code === 200) {
					this.SortList = response.data;
				}
			},
            GoSortList(e) {
                uni.navigateTo({
                    url: '/pages/forum/post_list?plate_id=' + e.id + '&plate_name=' + e.platename
                })
            }
		}
	}
</script>
<style>
	.body {
		margin: 20rpx;
	}

	.forum_cate {
		margin-top: 30rpx;
		/* border-bottom: 1px solid #efefef !important; */
		overflow: hidden;
	}

	.cate_list {
		padding: 20rpx;
		margin-bottom: 10px;
		overflow: hidden;
		background-color: #fff;
		border-radius: 12px;
	}

	.cate_item1 {
		border-bottom: 1px solid #efefef !important;
		height: 44px;
		line-height: 44px;
		overflow: hidden;
	}

	.cate_name {
		font-size: 16px;
		height: 18px;
		line-height: 18px;
		margin: 10px 0;
		color: #333333;
		font-weight: 400;
		padding: 0 10px;
	}

	.cate_info {
		float: left;
		width: 48%;
		padding: 10px 1%;
	}

	.cate_item {
		display: flex;
		height: 52px;
		line-height: 52px;
		/* font-size: 16px; */
		overflow: hidden;
		position: relative;
	}

	.cate_icon {
		width: 45px;
		height: 45px;
		margin-right: 8px;
	}

	.img {
		float: left;
		width: 45px;
		height: 45px;
		/* background-color: #f7f7fa; */
		border-radius: 12px;
	}

	.cate_name1 {
		display: block;
		font-size: 16px;
		height: 22px;
		line-height: 22px;
		padding-top: 4px;
		overflow: hidden;
		color: #333333;
	}

	.cate_num {
		position: absolute;
		top: 25px;
		left: 52px;
		display: block;
		height: 18px;
		line-height: 18px;
		font-size: 12px;
		padding-top: 2px;
		overflow: hidden;
		color: #bbbbbb !important;
	}
</style>
