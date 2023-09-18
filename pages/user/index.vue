<template>
    <view>
        <view style="height: 370upx; background: #2469f6;border-radius: 0 0 30% 30%;">
            <view :class="'menu_scroll_top_' + [topBar]">
                <view class="menu-scroll">
                    <view class="menu-scroll-leat">
                        <view>我的</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="card">
            <view class="head">
                <u-avatar :src="userinfo.usertx" shape="square" size="50" @click="UpHead()"></u-avatar>
                <view class="texts">
                    <u--text :text="userinfo.nickname" size="22" bold></u--text>
                    <u--text :text="userinfo.signature" color="info"></u--text>
                </view>

            </view>
            <view class="tabs">
                <u-grid col="5">
                    <u-grid-item bgColor="#2469f6" @click="GoPost(userinfo.username)">
                        <u-text color="#fff" :text="userinfo.postnum" align="center"></u-text>
                        <u-text color="#fff" text="帖子" align="center"></u-text>
                    </u-grid-item>
                    <u-grid-item bgColor="#2469f6" @click="GoFans(userinfo.id)">
                        <u-text color="#fff" :text="userinfo.fencount" align="center"></u-text>
                        <u-text color="#fff" text="粉丝" align="center"></u-text>
                    </u-grid-item>
                    <u-grid-item bgColor="#2469f6" @click="GoFollow(userinfo.id)">
                        <u-text color="#fff" :text="userinfo.followcount" align="center"></u-text>
                        <u-text color="#fff" text="关注" align="center"></u-text>
                    </u-grid-item>
                    <u-grid-item bgColor="#2469f6" @click="GoLike()">
                        <u-text color="#fff" :text="userinfo.likenum" align="center"></u-text>
                        <u-text color="#fff" text="点赞" align="center"></u-text>
                    </u-grid-item>
                    <u-grid-item bgColor="#2469f6" @click="GoCommen()">
                        <u-text color="#fff" :text="userinfo.commentsnum" align="center"></u-text>
                        <u-text color="#fff" text="评论" align="center"></u-text>
                    </u-grid-item>
                </u-grid>
            </view>
        </view>
        <view class="heads">
            <view class="cards shadow-1 round-12" @click="GoShop()">
                <view class="icons">
                    <u-avatar size="35" src="/static/my/rz.svg">
                    </u-avatar>
                </view>
                <view class="fonts">
                    <u-text size="13" text="积分商城" align="center" bold></u-text>
                </view>
                <view class="fonts">
                    <u-text size="12" text="积分兑换商城" align="center" color="#a7a7a7"></u-text>
                </view>
            </view>
            <view class="cards shadow-1 round-12" @click="UserSign()">
                <view class="icons">
                    <u-avatar size="35" src="/static/my/qiandao.svg"></u-avatar>
                </view>
                <view class="fonts">
                    <u-text size="13" text="打卡签到" align="center" bold></u-text>
                </view>
                <view class="fonts">
                    <u-text size="12" text="打卡获得经验" align="center" color="#a7a7a7"></u-text>
                </view>
            </view>
            <view class="cards shadow-1 round-12" @click="GoCard()">
                <view class="icons">
                    <u-avatar size="35" src="/static/my/vip.svg"></u-avatar>
                </view>
                <view class="fonts">
                    <u-text size="13" text="卡密兑换" align="center" bold></u-text>
                </view>
                <view class="fonts">
                    <u-text size="12" text="卡密兑换商品" align="center" color="#a7a7a7"></u-text>
                </view>
            </view>
        </view>
        <view class="cardcd round-12 shadow-1">
            <u-cell-group :border="false">
                <u-cell title="消息通知" isLink :border="false" icon="/static/my/sc.png" size="large" @click="GoMsg()">
                    <text v-if="msg>0" slot="value" class="u-slot-value">{{msg}}</text>
                </u-cell>
                <u-cell title="我的订单" isLink :border="false" icon="/static/my/pay.png" size="large"
                    @click="GoShopList()">
                </u-cell>

                <u-cell title="编辑资料" isLink :border="false" icon="/static/my/zl.png" size="large" @click="GoEdit()">
                </u-cell>
                <u-cell title="修改密码" isLink :border="false" icon="/static/my/change.png" size="large"
                    @click="GoChangeword()">
                </u-cell>
                <u-cell v-if="userinfo.admin" title="帖子审核" isLink :border="false" icon="/static/my/gg.png"
                    size="large" @click="Error()">
                </u-cell>
                <u-cell title="建议反馈" isLink :border="false" icon="/static/my/kf.png" size="large" @click="Error()">
                </u-cell>
                <u-cell title="系统设置" isLink :border="false" icon="/static/my/set.png" size="large" @click="Error()">
                </u-cell>
                <u-cell title="检测更新" isLink :border="false" icon="/static/my/up.png" size="large" @click="Error()">
                </u-cell>
                <u-cell title="退出登录" isLink :border="false" icon="/static/my/exit.png" size="large" @click="OutLogin()">
                </u-cell>
            </u-cell-group>
        </view>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                BarHeight: '',
                topBar: 'one',
                token: '',
				userinfo: {},
                msg: 0,
				userid: '',
            }
        },
        onLoad(item) {
            // 界面打开 加载自定义标题高度函数
            this.topMenu();
			if (uni.getStorageSync('usertoken') == '') {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				//显示加载框
				uni.showLoading({
					title: '加载中'
				});
				this.userid = uni.getStorageSync('userid');
				this.get_user_information(this.userid);
				uni.hideLoading();
			}
        },
        onBackPress() {
            this.get_user_information();
        },
        onShow() {
			if (uni.getStorageSync('usertoken') == '') {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				this.userid = uni.getStorageSync('userid');
				this.get_user_information();
				this.getUnreadMessageCount();
			}
        },
        onPullDownRefresh() {
            this.get_user_information();
            this.getUnreadMessageCount();
			uni.stopPullDownRefresh();
        },
        onPageScroll: function(e) {
            // 判断型号 显示不同标题栏高度
            var that = this;
            if (e.scrollTop > 120) {
                that.topBar = 'tow';
            } else {
                that.topBar = 'one';
            }
        },
        methods: {
			async get_user_information() {
				const response = await this.$api.get_user_information({
					"id": this.userid,
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
            UpHead() {
                let token = uni.getStorageSync('usertoken');
                let user = uni.getStorageSync('userid');
                uni.chooseImage({
                    count: 1,
                    success: (chooseImageRes) => {
                        const tempFilePaths = chooseImageRes.tempFilePaths;
                        uni.showLoading({
                            title: '上传中...'
                        })
                        uni.uploadFile({
                            url: 'http://49.232.162.157:88/api/UploadHead?appid=10000&userid=' + user + '&username=' + this.userinfo.username + '&usertoken=' + token, //上传后返回文件保存的路径即可
                            filePath: tempFilePaths[0],
                            name: 'file',
                            success: (res) => {
                                uni.hideLoading()
                                if (res.statusCode == 200) {
                                    this.$refs.uToast.show({
                                        type: 'success',
                                        message: '上传成功！',
                                    })
                                    this.get_user_information();
                                } else {
                                    this.$refs.uToast.show({
                                        type: 'error',
                                        message: '上传失败！',
                                    })
                                }
                            },
                            fail(res) {
                                uni.hideLoading()
                            }
                        });
                    }
                });
            },
            Error() {
                this.$refs.uToast.show({
                    type: 'error',
                    message: '暂未开发',
                })
            },
            // 自定义导航高度
            topMenu: function() {
                var that = this;
                uni.getSystemInfo({
                    success: function(res) {
                        that.BarHeight = 10;
                    }
                });
            },
            async getUnreadMessageCount(currentPage = 1, type = 0) {
				const response = await this.$api.getunreadMessage({
					userid: uni.getStorageSync('userid'),
				})
				if (response.code === 200) {
					var message = response.data.bycount + response.data.commentcount + response.data.kmcount + response.data.likecount + response.data.signcount + response.data.syscount
					uni.setStorageSync('unreadmessage', message);
					if (message > 0) {
					    this.msg = message
					    uni.showTabBarRedDot({ //显示红点
					        index: 3
					    })
					    uni.setTabBarBadge({
					        index: 3,
					        text: toString(message)
					    })
						uni.setTabBarBadge({
						    index: 2,
						    text: toString(message)
						})
					} else {
						//有点小问题
					    this.msg = message
					    uni.removeTabBarBadge({
					        index: 3
					    })
						uni.removeTabBarBadge({
						    index: 2
						})
					}
				}
            },
            OutLogin() {
                uni.removeStorageSync('usertoken');
                uni.showToast({
                    title: "已退出登录！"
                })
				let timer = setInterval(() => {
				    uni.switchTab({
				        url: '/pages/index/index'
				    })
					clearInterval(timer)
				}, 1000);
            },
            GoShop() {
                uni.navigateTo({
                    url: '/pages/commen/shop'
                })
            },
            GoMsg() {
                uni.switchTab({
                    url: '/pages/news/index'
                })
            },
            GoChangeword() {
                uni.navigateTo({
                    url: '/pages/commen/changeword'
                })
            },
            GoShopList() {
                let user = uni.getStorageSync('User');
                uni.navigateTo({
                    url: '/pages/commen/shoplist?username=' + user
                })
            },
            GoCard() {
                uni.navigateTo({
                    url: '/pages/commen/card'
                })
            },
            GoPost(e) {
                uni.navigateTo({
                    url: '/pages/commen/postlist?username=' + e
                })
            },
            GoFans(e) {
                uni.navigateTo({
                    url: '/pages/user/user_list?type=2&userid=' + e
                })
            },
            GoFollow(e) {
                uni.navigateTo({
                    url: '/pages/user/user_list?type=1&userid=' + e
                })
            },
            GoLike() {
                let user = uni.getStorageSync('User');
                uni.navigateTo({
                    url: '/pages/commen/likelist?username=' + user
                })
            },
            GoCommen() {
                let user = uni.getStorageSync('User');
                uni.navigateTo({
                    url: '/pages/commen/commenlist?username=' + user
                })
            },
            GoEdit() {
                uni.navigateTo({
                    url: '/pages/commen/edit'
                })
            }
        }
    }
</script>
<style>
    .u-slot-value {
        line-height: 17px;
        text-align: center;
        font-size: 10px;
        padding: 0 5px;
        height: 17px;
        color: #FFFFFF;
        border-radius: 100px;
        background-color: #f56c6c;
    }

    .round-12 {
        border-radius: 12px;
    }

    .shadow-1 {
        box-shadow: 2rpx 1rpx 18rpx rgba(200, 200, 200, 0.1);
    }

    .card {
        height: 220rpx;
        margin: 20rpx;
        padding: 30rpx;
        margin-top: -230rpx;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 5rpx 2rpx 10rpx rgba(200, 200, 200, 0.2);
    }

    .texts {
        /* margin-top: 5rpx; */
        margin-left: 25rpx;
    }

    .tabs {
        border-radius: 12px;
        padding: 10rpx;
        background-color: #2469f6;
        margin-top: 30rpx;
    }

    .heads {
        /* width: 690rpx; */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 20rpx;
    }

    .cardcd {
        background-color: #ffffff;
        padding: 10rpx;
        margin: 20rpx;
    }

    .cards {
        width: 25%;
        /* height: 120rpx; */
        padding: 25rpx;
        background-color: #ffffff;
        flex: 1;
        min-width: 25%;
        max-width: 25%;
    }

    .icons {
        width: 100%;
        height: auto;
        justify-content: center;
        display: flex;
        /* margin-top: 10rpx; */
    }

    .fonts {
        width: 100%;
        height: auto;
        justify-content: center;
        display: flex;
        margin-top: 15rpx;
        /* margin-bottom: 5rpx; */
    }

    .head {
        display: flex;
    }

    .menu-scroll-leat {
        align-items: flex-end;
        white-space: nowrap;
        color: #ffffff;
        border-radius: 20upx;
        padding: 5upx;
        width: 100%;
        text-align: left;
        font-size: 25px;
    }

    .menu-scroll {
        display: flex;
        justify-content: space-between;
        padding: 0upx 30upx 10upx 30upx;
        justify-content: flex-start;
    }

    .menu_scroll_top_one {
        position: fixed;
        top: -1upx;
        left: 0;
        width: 100%;
        z-index: 90;
        padding-top: 60upx;
    }

    .menu_scroll_top_tow {
        position: fixed;
        top: -1upx;
        left: 0;
        background-color: #2469f6;
        width: 100%;
        z-index: 90;
        padding-top: 60upx;
        border-radius: 0upx 0upx 30upx 30upx;
    }
</style>
