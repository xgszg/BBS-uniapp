<template>
	<view>
		<u-skeleton rows="50" :title="false" :loading="skeleton_loading"></u-skeleton>
		<!-- 轮播图 -->
		<view style="margin: 30rpx 20rpx 0;">
			<u-swiper @click="gotoPages" :list="banner" height="200" indicator indicatorMode="line" keyName="image" radius="10" showTitle :circular="true"></u-swiper>
		</view>
		<!-- 宫格 按钮 -->
		<view>
			<u-grid :border="false" col="4">
				<u-grid-item @click="announcementshow = true">
					<u-icon customStyle="paddingTop:40rpx" name="../../static/announcement.png" size="30"></u-icon>
					<text class="grid-text">公告</text>
				</u-grid-item>
				<!-- <u-grid-item @click="navClick('/pages/index/activity')"> -->
					<u-grid-item @click="navClick('#')">
					<u-icon customStyle="paddingTop:40rpx" name="../../static/activity.png" size="30"></u-icon>
					<text class="grid-text">活动</text>
				</u-grid-item>
				<u-grid-item @click="navClick('/pages/index/rankingList')">
					<u-icon customStyle="paddingTop:40rpx" name="../../static/rankingList.png" size="30"></u-icon>
					<text class="grid-text">排行榜</text>
				</u-grid-item>
				<u-grid-item @click="navClick('/pages/index/group')">
					<u-icon customStyle="paddingTop:40rpx" name="../../static/group.png" size="30"></u-icon>
					<text class="grid-text">群组</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>
		<view style="margin: 20px;font-size: 20px;font-weight: bold;">
			推荐帖子
		</view>
		<posts-list :posts_list="posts_list"></posts-list>
		<!-- 公告模态框 -->
		<u-modal :show="announcementshow" :title="announcement_title" :content='announcement_content' @confirm="() => announcementshow = false"></u-modal>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
import postsList from '@/components/posts-list/posts-list.vue';
export default {
	comment: {
		postsList
	},
	data() {
		return {
			skeleton_loading: true, // 骨架屏
			banner: ['http://49.232.162.157:88/userbg.jpg'], // 轮播图
			announcementshow: false, // 公告模态框 
			announcement_title: '', // 公告标题
			announcement_content: '', // 公告内容
			posts_list: [], // 推荐帖子
			scrollTop: 0, // 返回顶部
		};
	},
	onLoad() {
		this.get_app_info();
		this.get_recommended_posts();
	},
	//监听原生标题栏搜索输入框点击事件
	onNavigationBarSearchInputClicked() {
		uni.showToast({
			title: '待开发...',
			icon: 'none',
			duration: 2000
		});
	},
	// 下拉刷新事件
	onPullDownRefresh() {
		this.currentPage = 1
		this.get_recommended_posts();
		uni.stopPullDownRefresh();
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			//判断是否登录
			if (uni.getStorageSync("usertoken") === "") {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				uni.switchTab({
					url: '/pages/user/index'
				});
			}
		}
		if (e.index == 1) {
			//判断是否登录
			if (uni.getStorageSync("usertoken") === "") {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				uni.switchTab({
					url: '/pages/news/index'
				});
			}
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		// 获取公告信息
		async get_app_info() {
			const response = await this.$api.get_app_info();
			if (response.code === 200) {
				// this.banner = response.data.app_exten_info.rotation_chart;
				this.announcement_title = response.data.title;
				this.announcement_content = response.data.content;
			}
		},
		// 获取推荐帖子
		async get_recommended_posts() {
			const response = await this.$api.get_recommended_posts()
			if (response.code === 200) {
				const newlist = response.data;
				this.posts_list = newlist;
				this.skeleton_loading = false;
			}
		},
		navClick(url) {
			uni.navigateTo({
				url
			})
		},
		gotoPages(index) {
			const linkUrl = this.banner[index].linkUrl;
			uni.navigateTo({
				url: '/pages/common/webview?url=' + linkUrl
			})
		},
	},
};
</script>

<style lang="scss">
.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
</style>