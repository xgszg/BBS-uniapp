<template>
    <view class="content">
        <view v-if="FansList==''" style="margin-top: 300rpx;height: 100%;">
            <u-empty mode="data" icon="/static/nodata/fans.png">
            </u-empty>
        </view>
        <block v-for="(Fans, Fansindex) in FansList" :key="Fansindex">
            <view class="crad" @click="GoUser(Fans.username)">
                <view class="flex">
                    <u-avatar :src="Fans.usertx" shape="square" size="42"></u-avatar>
                    <view style="margin-left: 20rpx;">
                        <u-text :text="Fans.nickname"></u-text> 
                        <u-text :text="Fans.signature"></u-text>
                    </view>
                </view>
                <u-divider v-if="Fansindex<FansList.length-1"></u-divider>
            </view>            
        </block>
        <u-no-network image="/static/nodata/404.png"></u-no-network>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                id: '',
                FansList: [],
                page:2
            }
        },
        onLoad(e) {
            this.id = e.id;
            this.GetFans()
        },
        onPullDownRefresh() {
            this.GetFans()
        },
        onReachBottom() {
            this.GetFans()
        },
        methods: {
            async GetFans(){
				const response = await this.$api.get_fan_list({
					"userid": this.id,
				});
				if (response.code === 200) {
					this.FansList = response.data;
				} else {
					uni.showToast({
						title: response.msg,
						icon: "none"
					})
				}
            },
            NextFans:function(){
                uni.showToast({
                	icon: 'loading',
                	title: '加载中...'
                })
                uni.request({
                	url: API.Fans()+this.id,
                	data: {
                		page: this.page
                	},
                	success: res => {
                		this.page++;
                		// console.log(res.data)
                		this.FansList = this.FansList.concat(res.data.data);
                		uni.hideLoading();
                		setTimeout(function() {
                			uni.stopPullDownRefresh();
                			uni.showToast({
                				icon: 'success',
                				title: '加载成功'
                			});
                		}, 100);
                	}
                })
            },
            GoUser:function(e){
                uni.navigateTo({
                    url:'/pages/commen/user?username='+e
                })
            }
        }
    }
</script>

<style>
    .content{
        background-color: #fff;
        padding:20rpx
    }
    .crad{
        /* border-radius: 20rpx; */
        /* margin: 20rpx 20rpx 0rpx 20rpx; */
        /* padding: 20rpx 20rpx 0 20rpx; */
        background-color: #fff;
        /* box-shadow: 1rpx 2rpx 12rpx rgba(166, 166, 166, 0.3); */
        
    }
    .flex{
        display: flex;
    }
</style>
