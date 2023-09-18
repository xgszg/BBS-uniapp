<template>
	<view>
		<u-skeleton rows="50" :title="false" :loading="skeleton_loading"></u-skeleton>
		<!-- 标题栏 -->
		<view class="container-title">
			<view class="posts-title">
				<text class="posts-tag" v-if="post.top == 1" style="background-color: #26DFC0;">置</text>
				<text class="posts-tag" v-if="post.featured == 1" style="background-color: #F2BE12;">精</text>
				<text class="posts-tag" v-if="post.popular == 1" style="background-color: #FB465F;">热</text>
				{{ post.title }}
			</view>
			<view style="font-size: 10px;color: #666666;margin: 7px 0;">{{ post.createtime }}</view>
			<view class="posts-view">
				<view class="posts-number">
					<u-icon name="eye" color="#909399" size="20"></u-icon>
					<view>{{ post.view }}</view>
					<u-icon name="thumb-up" color="#909399" size="20"></u-icon>
					<view>{{ post.thumbs }}</view>
					<u-icon name="chat" color="#909399" size="20"></u-icon>
					<view>{{ post.comment }}</view>
				</view>
				<view class="posts-plate-info"  @click="to_section_info(post.plateid)">{{ post.platename }}<u-icon style="margin-left: 5px;" name="arrow-right" color="#909399" size="8"></u-icon></view>
			</view>
		</view>
		<!-- 个人信息 -->
		<view class="container-userinfo" @click="to_user_info(post.userid)">
			<u-avatar style="margin-right: 15rpx;" :src="post.usertx" size="50" shape="circle"></u-avatar>
			<view style="margin-left: 10px;">
				<view style="display: flex;">
					<view>{{ post.nickname }}</view>
					<u-tag style="margin-left: 5px;" v-if="address" size="mini" :text="address" type="info" />
				</view>
				<view style="display: flex;margin-top: 10px;">
					<!-- <u-tag style="margin-right: 5px;" size="mini" :text="post.sexName" type="primary" /> -->
					<u-tag v-if="post.usertitle" style="margin-right: 5px;" size="mini" :text="post.usertitle" type="primary" />
					<u-tag style="margin-right: 5px;" size="mini" v-for="(item, index) in post.badge" :key="'badge' + index" :text="item.name" type="primary" />
				</view>
			</view>
		</view>
		<!-- 文章内容 -->
		<view class="container-content">
			<text style="word-break:break-all;margin-bottom: 10px;">{{ post.content }}</text>
			<view style="display: flex;flex-direction: column;align-items: center;">
				<u--image style="margin-bottom: 10px;" v-for="(item, index) in post.pic_url" :key="index" radius="5" :src="item" @click="click(index)"></u--image>
			</view>
			<view class="page-body-end">
				<text>- The End -</text>
			</view>
		</view>
		<view class="container-comment">
			<text>评论 {{ post.comment }}</text>
		</view>
		<!-- 评论列表 -->
		<view style="padding-bottom: 10px;" v-if="commentData.length != 0">
			<view class="container-comment-list" v-for="item in commentData" :key="item.id">
				<view class="container-comment-info">
					<image class="comment_head" @click="to_user_info(item.userid)" :src="item.usertx"></image>
					<view class="comment_content" @click="showCommentInput(item.id)">
						<view class="comment-username">{{ item.nickname }}<text style="float: right;font-size: 14px;color: #26DFC0">{{item.id}}楼</text></view>
						<view class="comment-date">{{ formatTimeDifference(item.time) }}</view>
						<view class="apply-comment-content" v-if="item.parentid != 0">
							<view class="apply-comment-username">回复 {{ item.parentnickname }} </view>
							<view class="comment-username">{{ item.parentcontent }}</view>
						</view>
						<view class="comment-username">{{ item.content }}</view>
					</view>
				</view>
			</view>
			<!-- 显示加载更多按钮 -->
			<u-loadmore :status="status" />
		</view>
		<view style="padding-bottom: 30px;" v-else>
			<u-empty text="暂无评论" icon="../../static/data.png">
			</u-empty>
		</view>
		<!-- 评论输入框 -->
		<u-popup :show="commentInputVisible" mode="bottom">
			<view class="container-comment-input">
				<u--input :focus="true" :autoBlur="true" @blur="commentInputVisibleBlur" placeholder="请输入内容" border="surround" v-model="comment_content"></u--input>
				<u-button class="comment_button" type="primary" text="提交" @click="submit_comment()"></u-button>
			</view>
		</u-popup>
		<!-- 底部评论框 -->
		<u-tabbar v-if="footerTabberVisible" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<view class="footer-tabber">
				<u-icon name="thumb-up" @click="like_posts" v-if="is_thumbs == 0" size="40"></u-icon>
				<u-icon name="thumb-up-fill" @click="like_posts" v-else size="40"></u-icon>
				<view class="input-button" @click="showCommentInput(0)">请输入评论内容！</view>
			</view>
		</u-tabbar>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
export default {
	data() {
		return {
			skeleton_loading: true, //骨架屏
			post_id: '',  //文章id
			post: '',  //文章信息
			imgs: [],  //图片列表
			commentData: [],  //评论列表
			is_thumbs: 0,  //是否点赞 0未点赞 1已点赞
			comment_content: '',  //评论内容
			currentPage: 1, //当前页
			pageCount: 1, //总页数
			status: 'loadmore', //加载更多状态
			limit: 10, //每页显示条数
			commentInputVisible: false, //评论输入框
			footerTabberVisible: true, //底部评论框
			comment_parentid: 0, //评论父id
			scrollTop: 0, //返回顶部
			address: '', //发帖地址
		}
	},
	onLoad(item) {
		this.post_id = item.post_id;
		this.get_post_information(item.post_id);
		this.get_list_comments(item.post_id);
	},
	//下拉刷新
	onPullDownRefresh() {
		this.get_post_information(this.post_id);
		this.get_list_comments(this.post_id);
	},
	//上拉刷新评论
	onReachBottom(e) {
		if (this.pageCount > this.currentPage) {
			this.status = 'loading'
			this.limit += 10;
			this.get_list_comments(this.post_id);
		} else {
			this.status = 'nomore'
		}
	},
	//页面显示
	mounted() {
		this.commentInputVisible = false;
		this.footerTabberVisible = true;
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		// 获取帖子信息
		async get_post_information(post_id) {
			const response = await this.$api.get_post_information({
				"id": post_id,
				"userid": uni.getStorageSync('userid'),
			})
			if (response.code === 200) {
				uni.setNavigationBarTitle({
					title: response.data.title
				});
				this.post = response.data;
				this.is_thumbs = response.data.is_thumbs;
				this.imgs = response.data.img_url;
				this.ipFormact(response.data.ip)
				uni.stopPullDownRefresh();
				this.skeleton_loading = false;
			}
		},
		//预览图片
		click(i) {
			uni.previewImage({
				urls: this.imgs,
				indicator: 'default',
				loop: true,
				current: i,
			})
		},
		//获取评论列表
		async get_list_comments(post_id) {
			const response = await this.$api.get_list_comments({
				"postid": post_id,
				"sort": "id",
				"sortOrder": "asc",
				"page": 1,
				"limit": this.limit
			})
			if (response.code === 200) {
				const newlist = response.data;
				this.commentData = newlist;
				this.pageCount = response.msg;
			}
		},
		//点赞帖子
		async like_posts() {
			if (uni.getStorageSync('usertoken') == '') {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			}
			const response = await this.$api.like_posts({
				"id": this.post_id,
				"userid": uni.getStorageSync('userid'),
			})
			if (response.code === 200) {
				if (this.is_thumbs == 1) {
					this.is_thumbs = 0;
				} else {
					this.is_thumbs = 1;
				}
				//重新获取帖子信息
				this.get_post_information(this.post_id);
				uni.showToast({
					title: response.msg, //显示的文字
					duration: 2000, //显示多少时间，默认1500毫秒
					icon: "success" //自定义显示的图标，默认成功success，错误error,加载loading，不显示图标是none
				});
			} else {
				uni.showToast({
					title: '点赞失败！',
					duration: 2000,
					icon: "error"
				});
			}
		},
		//评论输入框
		showCommentInput(comment_parentid) {
			this.commentInputVisible = true;
			this.footerTabberVisible = false;
			this.comment_parentid = comment_parentid;
		},
		//评论输入框失去焦点
		commentInputVisibleBlur() {
			this.commentInputVisible = false;
			this.footerTabberVisible = true;
		},
		//评论提交
		async submit_comment() {
			const response = await this.$api.post_comment({
				"postid": this.post_id,
				"content": this.comment_content,
				"parentid": this.comment_parentid,
				"userid": uni.getStorageSync('userid'),
			})
			if (response.code === 200) {
				this.get_post_information(this.post_id);
				this.get_list_comments(this.post_id);
				this.comment_content = ''
				this.commentInputVisible = false;
				this.footerTabberVisible = true;
				uni.showToast({
					title: response.msg,
					duration: 2000,
					icon: "success"
				});
			} else {
				this.commentInputVisible = false;
				this.footerTabberVisible = true;
				uni.showToast({
					title: '评论失败！',
					duration: 2000,
					icon: "error"
				});
			}
		},
		to_user_info(userid) {
			uni.navigateTo({
				url: '/pages/user/userinfo?userid=' + userid
			});
		},
		to_section_info(plate_id) {
			uni.navigateTo({
				url: '/pages/forum/section?plate_id=' + plate_id
			});
		},
		formatTimeDifference(k) {
			const now = new Date();
			const target = new Date(k);
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
		ipFormact(ip) {
			const apiUrl = `https://searchplugin.csdn.net/api/v1/ip/get?ip=${ip}`;// 发送GET请求
			uni.request({
				url: apiUrl,
				method: 'GET',
				success: (res) => {
					if (res.statusCode === 200) {
						this.address = res.data.data.address.split(' ').slice(1, 3).join(' ')
					}
				},
				fail: (error) => {
				},
			});
		},
	}
}
</script>

<style lang="scss" scoped>
.container-title {
	background-color: #fff;
	padding: 20rpx 30rpx 10rpx 30rpx;
	border-bottom: 1rpx solid #cecece;

	.posts-title {
		font-size: 16px;
		font-weight: bold;
		color: #303133;
		margin-bottom: 10rpx;
		line-height: 1.5;

		.posts-tag {
			color: #fff;
			margin-right: 2px;
			padding: 1px 4px;
			font-weight: 400;
			border-radius: 5px;
		}
	}

	.posts-view {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;

		.posts-number {
			display: flex;
			align-items: center;
			color: #666666;
			font-size: 10px;

			view {
				margin-right: 7px;
			}
		}

		.posts-plate-info {
			display: flex;
			align-items: center;
			color: #666666;
			font-size: 10px;
		}
	}
}

.container-userinfo {
	background-color: #fff;
	display: flex;
	padding: 15px 30rpx 15px 30rpx;
	border-bottom: 1rpx solid #cecece;
	align-items: center;
	justify-content: flex-start;

	.u-tag-wrapper {
		margin-left: 10rpx;
	}
}

.container-content {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	padding: 15px 15px 15px 15px;

	.page-body-end {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #CCC;
		text-align: center
	}
}

.container-comment {
	background-color: #fff;
	margin-top: 25rpx;
	padding: 15px 30rpx 10px 30rpx;
	border-bottom: 1rpx solid #cecece;
}

.container-comment-list {
	background-color: #fff;
	padding: 15px 30rpx 10px 30rpx;
	border-bottom: 1rpx solid #cecece;

	.container-comment-info {
		display: flex;
	}

	.comment_head {
		width: 53px;
		height: 45px;
		border-radius: 25px;
	}

	.comment_content {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		width: 100%;

		.comment-username {
			font-size: 15px;
		}

		.comment-date {
			font-size: 15rpx;
			color: #666666;
			margin-bottom: 5rpx;
		}

		.apply-comment-content {
			display: flex;
			flex-direction: column;
			background-color: #cacaca;
			border-radius: 10rpx;
			padding: 15rpx;
			margin-bottom: 10rpx;

			.apply-comment-username {
				font-size: 25rpx;
				color: #9f9f9f;
				margin-bottom: 10rpx;
			}

			.comment-username {
				font-size: 30rpx;
				color: #666666;
			}
		}
	}
}

.footer-tabber {
	display: flex;
	align-items: center;
	width: 100%;
	margin: 0 10px;

	.input-button {
		border: none;
		background-color: #E1E1E1;
		text-align: center;
		padding: 10px 20px;
		border-radius: 15px;
		font-size: 15px;
		color: #787878;
		width: 100%;
		margin: 0 5px;
	}
}

.container-comment-input {
	display: flex;
	align-items: center;
	width: 100%;
	height: 50px;
	background-color: #fff;
	padding: 0 30rpx 0 30rpx;
	box-sizing: border-box;

	.comment_button {
		width: 50px;
		height: 37px;
		margin-left: 5px;
	}
}
</style>