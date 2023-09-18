const http = {
	// 后端地址
	baseUrl: "http://49.232.162.157:88/",
	appid: 10000, //appid
	showLog: false, // 是否显示日志

	// 请求方法
	request(config) {
		uni.showLoading({
			title: "加载中",
			mask: true,
		});
		// 请求之前的操作
		config.url = this.baseUrl + config.url;
		config = this.beforeRequest(config);
		// 创建一个Promise对象，在里面发送请求
		return new Promise((resolve, reject) => {
			uni.request({
				url: config.url,
				data: config.data,
				method: config.method,
				success: (res) => {
					uni.hideLoading();
					// 请求成功的操作
					const response = this.beforeResponse(res);
					resolve(response);
				},
				fail: (err) => {
					uni.hideLoading();
					// 请求失败的操作
					this.errorHandle(err);
					reject(err);
				},
			});
		});
	},
	get(url, data) {
		data = Object.assign({}, data, {
			appid: this.appid,
		});
		return this.request({
			url: url,
			data: data,
			method: "GET",
		});
	},
	/**
	 *  post请求
	 * @param {*} url  请求地址
	 * @param {*} data  请求参数
	 * @param {*} token_status  是否需要token 0不需要 1有token则带上 2必须有token
	 */
	post(url, data, token_status = 0) {
		data = Object.assign({}, data, {
			appid: this.appid,
		});
		if (token_status == 1 && uni.getStorageSync("usertoken") !== "") {
			data = Object.assign({}, data, {
				usertoken: uni.getStorageSync("usertoken"),
			});
		}
		if (token_status == 2) {
			if (uni.getStorageSync("usertoken") === "") {
				//跳转到登录页面
				uni.navigateTo({
					url: "/pages/user/login",
				});
				return;
			}
			data = Object.assign({}, data, {
				usertoken: uni.getStorageSync("usertoken"),
			});

		}
		return this.request({
			url: url,
			data: data,
			method: "POST",
		});
	},
	// 请求拦截器
	beforeRequest(config) {
		// 请求之前的操作
		if (this.showLog) {
			console.log("请求拦截器：", config);
		}
		return config;
	},
	// 响应拦截器
	beforeResponse(response) {
		// 请求之前的操作
		if (this.showLog) {
			console.log("响应拦截器：", response);
		}
		if (response.data.code == 401 || response.data.code == 403) {
			uni.clearStorageSync();
			//跳转到登录页面
			uni.navigateTo({
				url: "/pages/user/login",
			});
		}
		return response.data;
	},
	// 错误处理
	errorHandle(err) {
		console.log("网络异常，请求失败！");
		uni.showToast({
			title: "网络异常，请稍后再试",
			icon: "none",
		});
	},
};

export default http;
