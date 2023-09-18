<template>
    <view class="content">
        <view v-if="Message==''" style="margin-top: 300rpx;height: 100%;">
            <u-empty mode="massage" icon="/static/nodata/massage.png">
            </u-empty>
        </view>
        <block v-for="(Msg, Messageindex) in Message" :key="Messageindex">
            <view v-if="Msg.type=='0'" class="crad">
                <view class="flex">
                    <u-avatar v-if="Msg.type=='0'" src="/static/my/cms.png" shape="square" size="42"></u-avatar>
                    <view style="margin-left: 20rpx;">
                        <u-text :text="Msg.content"></u-text>
                        <u-text :text="Msg.time"></u-text>
                    </view>
                </view>
            </view>
            <view v-else class="crad" @click="Godetail(Msg.postid)">
                <view class="flex">
                    <u-avatar v-if="Msg.type=='1'" src="/static/my/like.png" shape="square" size="42"></u-avatar>
                    <u-avatar v-else-if="Msg.type=='2'" src="/static/my/comment.png" shape="square" size="42"></u-avatar>
                    <view style="margin-left: 20rpx;">
                        <u-text :text="Msg.content"></u-text>
                        <u-text :text="Msg.time"></u-text>
                    </view>
                </view>                
            </view>
            <u-divider v-if="Messageindex<Message.length-1"></u-divider>
        </block>
		<u-loadmore :status="status" />
        <u-no-network image="/static/nodata/404.png"></u-no-network>
		<u-toast ref="uToast"></u-toast>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                Message: [],
				currentPage: 1,	//
				pageCount: 1,	//消息数量
				status: 'loadmore',
				limit: 10
            }
        },
        onLoad() {
            if (uni.getStorageSync('usertoken') == '') {
            	uni.navigateTo({
            		url: '/pages/user/login'
            	})
            } else {
            	//显示加载框 
            	uni.showLoading({
            		title: '加载中'
            	});
            	this.GetMessage();
				this.UpdateMsgState();
            }
        },
        onPullDownRefresh() {
            this.GetMessage(1, 1);
			this.UpdateMsgState();
            uni.stopPullDownRefresh();
        },
        //上拉刷新
        onReachBottom(e) {
        	if (this.pageCount > this.currentPage * 10) {
        		this.status = 'loading'
        		this.currentPage++
        		this.GetMessage(this.currentPage);
        	} else {
        		this.status = 'no-more'
        	}
        },
		onShow() {
			if (uni.getStorageSync('usertoken') == '') {
				uni.navigateTo({
					url: '/pages/user/login'
				})
			} else {
				let Noreadmessage = uni.getStorageSync('unreadmessage')
				if(Noreadmessage != null && Noreadmessage > 0){
					this.$refs.uToast.show({
					    type: 'info',
					    message: '您有' + Noreadmessage + '条新消息,请刷新查看',
					})
				}
			}
		},
        methods: {
            async GetMessage(currentPage = 1, type = 0) {
                const response = await this.$api.get_message_notifications({
                	page: currentPage,
                	userid: uni.getStorageSync('userid'),
                })
                if (response.code === 200) {
                	uni.hideLoading();
                	const newlist = response.data;
                	if (type == 0) {
                		this.Message = this.Message.concat(newlist);
                	} else {
                		this.Message = newlist;
                	}
                	this.pageCount = response.msg;
                }
            },
            async UpdateMsgState() {
                const response = await this.$api.updatemsgstate({
                	userid: uni.getStorageSync('userid'),
                })
                if (response.code === 200) {
                	uni.hideLoading();
					uni.removeTabBarBadge({
					    index: 3
					})
					uni.removeTabBarBadge({
					    index: 2
					})
                }
            },
            Godetail: function(e) {
                uni.navigateTo({
                    url: '/pages/forum/article_details?post_id=' + e
                })
            },
        }
    }
</script>

<style>
    .content {
        background-color: #fff;
        padding: 20rpx
    }

    .crad {
        /* border-radius: 20rpx; */
        /* margin: 20rpx 20rpx 0rpx 20rpx; */
        padding: 10rpx;
        background-color: #fff;
        /* box-shadow: 1rpx 2rpx 12rpx rgba(166, 166, 166, 0.3); */

    }

    .flex {
        display: flex;
    }
</style>
