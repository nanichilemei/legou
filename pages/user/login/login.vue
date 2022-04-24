<template>
	<view>
		<view class="top">
			<image src="../../../static/icons/leju-logo.png" mode=""></image>
		</view>
		<view class="center">
			<view class="item">
				<input placeholder="请输入用户名" v-model="username" />
			</view>
			<view class="item">
				<input placeholder="请输入密码" type="password" v-model="password" />
			</view>

		</view>
		<view class="dologin" @tap="login">登录</view>
		<view class="footer">
			<navigator url="../modify/modify">找回密码</navigator>
			<text class="line"> | </text>
			<navigator url="../register/register">注册账号</navigator>
		</view>
	</view>
</template>

<script>
	import {
		doLogin
	} from '../../../api/user/index.js'
	export default {
		name: 'Login',
		data() {
			return {
				from: "",
				username: '',
				password: '123456'
			};
		},
		methods: {
			login() {
				console.log("123")
				var that = this
				doLogin({
						"password": this.password,
						"username": this.username
					})
					.then(res => {
						// console.log(res);
						if (res.success) {
							uni.setStorageSync("token", res.data.token)
							uni.showToast({
								title: "登录成功"
							})
							console.log(that.from)
							if (that.from == "register123") {
								uni.switchTab({
									url: "../user"
								})
							} else {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 800)
							}
						}

					})
			}
		},
		onLoad(options) {
			console.log(options)
			this.from = options.from
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 160rpx;
		height: 160rpx;
		margin: 128rpx auto 72rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.center {
		padding: 0 70rpx;
		display: flex;
		flex-direction: column;

		.item {
			padding: 32rpx;
			margin: 24rpx 0;
			box-shadow: 0 0 60rpx rgba(43, 86, 112, .1);
			border-radius: 80rpx;
			// 0 0 30px 0 rgb(43 86 112 / 10%)
		}
	}

	.dologin {
		width: 600rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		font-size: 30rpx;
		border-radius: 60rpx;
		background-color: #354e44;
		margin: 96rpx auto 0;
	}

	.footer {
		display: flex;
		justify-content: center;
		margin-top: 64rpx;
		color: rgba(0, 0, 0, .7);
		font-size: 28rpx;
		text-align: center;
		line-height: 40rpx;

		.line {
			margin: 0 14rpx;
		}
	}
</style>
