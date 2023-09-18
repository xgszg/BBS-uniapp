<!-- 蓝色简洁登录页面 -->
<template>
    <view class="t-login">
        <!-- 页面装饰图片 -->
        <image class="img-a" src="@/static/image/2.png"></image>
        <!-- 标题 -->
        <view class="t-b">{{ title }}</view>
        <form class="cl">
            <view class="t-a">
                <image src="@/static/image/user.png"></image>
                <input type="text" name="username" placeholder="请输入用户名" v-model="username" />
            </view>
            <view class="t-a">
                <image src="@/static/image/password.png"></image>
                <input type="text" name="password" placeholder="请输入密码" v-model="password" />
            </view>
			<view class="t-a">
			    <image src="@/static/image/password.png"></image>
			    <input type="text" name="email" placeholder="请输入邮箱" v-model="email" />
			</view>
			<view class="t-a" style="display: flex;">
			    <image src="@/static/image/password.png"></image>
			    <input class="t-c" type="text" name="code" placeholder="请输入验证码" v-model="code" />
				<button class="codecss" @tap="codejs()">发送验证码</button>
			</view>
            <button @tap="register()">注 册</button>
            <u-divider text="或者"></u-divider>
            <button style="background-color: aliceblue;color: rgb(95, 95, 95);" @tap="login()">已有帐号</button>
        </form>
    </view>
</template>
<script>
export default {
    data() {
        return {
            title: '欢迎加入我们！',
            username: '',
            password: '',
			email: '',
			code: '',
        };
    },
    onLoad() { },
    methods: {
        //当前登录按钮操作
        login() {
            uni.navigateTo({
                url: '/pages/user/login'
            });
        },
		codejs() {
			var that = this;
			if(!that.email){
				uni.showToast({
				    title: '请输入邮箱',
				    icon: 'none'
				});
				return;
			}
			this.$api.code({
				"useremail": this.email,
			}).then(response => {
			    if (response.code === 1) {
			        uni.showToast({
			            title: response.msg,
			            icon: 'none'
			        });
			    } else {
			        uni.showToast({
			            title: response.msg,
			            icon: 'none'
			        });
			    }
			}).catch(error => {
			    uni.showToast({
			        title: '系统错误',
			        icon: 'none'
			    });
			});
		},
        register() {
            var that = this;
            if (!that.username) {
                uni.showToast({
                    title: '请输入用户名',
                    icon: 'none'
                });
                return;
            }
            if (!that.password) {
                uni.showToast({
                    title: '请输入密码',
                    icon: 'none'
                });
                return;
            }
			if (!that.email) {
			    uni.showToast({
			        title: '请输入邮箱',
			        icon: 'none'
			    });
			    return;
			}
			if (!that.code) {
			    uni.showToast({
			        title: '请输入验证码',
			        icon: 'none'
			    });
			    return;
			}
            this.$api.register({
                "username": this.username,
                "password": this.password,
				"device": '10000',
				"useremail": this.email,
				"code": this.code,
            }).then(response => {
                if (response.code === 1) {
                    uni.showToast({
                        title: response.msg,
                        icon: 'none'
                    });
                    uni.navigateTo({
                        url: '/pages/user/login'
                    });
                } else {
                    uni.showToast({
                        title: response.msg,
                        icon: 'none'
                    });
                }
            }).catch(error => {
                uni.showToast({
                    title: '系统错误',
                    icon: 'none'
                });
            });
        }
    }
};
</script>
<style>
.img-a {
    position: absolute;
    width: 100%;
    top: -280rpx;
    right: -100rpx;
}

.t-login {
    width: 600rpx;
    margin: 0 auto;
    font-size: 28rpx;
    color: #000;
}

.t-login button {
    font-size: 28rpx;
    background: #5677fc;
    color: #fff;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 50rpx;
    box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
    padding: 0 20rpx 0 120rpx;
    height: 90rpx;
    line-height: 90rpx;
    margin-bottom: 25rpx;
    background: #f8f7fc;
    border: 1px solid #e9e9e9;
    font-size: 28rpx;
    border-radius: 50rpx;
}
.t-login .t-a .t-c{
    width: 120px;
}
.t-login .t-a .codecss{
    width: 120px;
}
.t-login .t-a {
    position: relative;
}

.t-login .t-a image {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    left: 40rpx;
    top: 28rpx;
    border-right: 2rpx solid #dedede;
    padding-right: 20rpx;
}

.t-login .t-b {
    text-align: left;
    font-size: 46rpx;
    color: #000;
    padding: 100rpx 0 120rpx 0;
    font-weight: bold;
}

.t-login .t-d {
    text-align: center;
    color: #999;
    margin: 80rpx 0;
}

.t-login .t-e {
    text-align: center;
    width: 250rpx;
    margin: 40rpx auto 0;
}

.t-login .t-g {
    float: left;
    width: 50%;
}

.t-login .t-e image {
    width: 50rpx;
    height: 50rpx;
}

.t-login .uni-input-placeholder {
    color: #000;
}

.cl {
    zoom: 1;
}

.cl:after {
    clear: both;
    display: block;
    visibility: hidden;
    height: 0;
    content: '\20';
}
</style>