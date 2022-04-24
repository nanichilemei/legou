<template>
	<view>
		<view class="top" @tap="upload">
			<image :src="pic" mode=""></image>
		</view>
		<!-- <uni-easyinput v-model="pswd" type="password"  placeholder="请输入登录密码"></uni-easyinput> -->
		<view class="list">
			<view class="item">
				<uni-easyinput v-model="phone" type="text" :inputBorder="false" placeholder="手机号"
					placeholderStyle="color:#808080;font-size: 28rpx;">
				</uni-easyinput>
			</view>
			<view class="item">
				<uni-easyinput v-model="pswd" type="password" :inputBorder="false" placeholder="请输入登录密码"
					placeholderStyle="color:#808080;font-size: 28rpx;"></uni-easyinput>
			</view>
			<view class="item">
				<uni-easyinput v-model="userId" type="text" :inputBorder="false" placeholder="请输入用户名 该用户名将用于账户登录"
					placeholderStyle="color:#808080;font-size: 28rpx;"></uni-easyinput>
			</view>
			<view class="item">
				<uni-easyinput v-model="username" type="text" :inputBorder="false" placeholder="请输入昵称"
					placeholderStyle="color:#808080;font-size: 28rpx;"></uni-easyinput>
			</view>
			<view class="item">
				<uni-easyinput v-model="okId" type="text" :inputBorder="false" placeholder="请输入验证码"
					placeholderStyle="color:#808080;font-size: 28rpx;"></uni-easyinput>
				<view class="huoqu">获取验证码</view>
			</view>
		</view>
		<view class="footer">
			<view class="center" @tap="register">注 册</view>
		</view>
	</view>
</template>

<script>
	import WxValidate from "../../../utils/WxValidate.js"
	import BASE_URL from "../../../api/baseurl.js"
	import {register}from "../../../api/user/index.js"
	export default {
		name: "register",
		data() {
			return {
				pic: "../../../static/icons/leju-logo.png",
				phone: "",
				pswd: "123456",
				userId:"",
				username:"even",
				okId:"123456789"
			};
		},
		methods: {
			
			// 上传图片
			upload() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original"],
					sourceType: ["album "],
					success(res) {
						console.log(res);
						uni.uploadFile({
							url: BASE_URL + "/lejuClient/login/uploadAvatar",
							filePath: res.tempFilePaths[0],
							name: "file",
							success(res1) {
								// console.log(res1)
								that.pic = JSON.parse(res1.data).data.fileUrl
							}
						})
					}
				})
			},
			// 注册
			register(){
				// 先封装一个对象
				 let params = {
					 phone:this.phone,
					 password:this.pswd,
					 userId:this.userId,
					 username:this.username,
					 okId:this.okId
				 };
				 if (!this.WxValidate.checkForm(params)) {
				  //表单元素验证不通过，此处给出相应提示
				    let error = this.WxValidate.errorList[0];
				    uni.showToast({
				    	title:error.msg,
							icon:'none'
				    })
				  }else {
						register({
							"icon": this.pic,
							"isDisabled": 0,
							"nickname": this.username,
							"password": this.pswd,
							"personalizedSignature": "even",
							"phone": this.phone,
							"realname": "zhangsan",
							"status": 1,
							"username": this.userId
						}).then(res => {
							console.log(res);
							if(res.success){
								let show = "register123";
								uni.navigateTo({
									url:`../login/login?from=${show}`
								})
							}
						})
					}
			},
			// 表单验证
			initValidate() {
				let rules = {
					phone: {
						required: true,
						tel:true
					},
					password: {
						required: true,
						minlength:6,
						maxlength:10
					},
					userId: {
						required: true,
					},
					username: {
						required: true,
					},
					okId: {
						required: true,
					}
				}

				let message = {
					phone: {
						required: '请输入手机号',
						tel:"手机号格式错误"
					},
					password: {
						required:'请输入密码',
						minlength:"请输入5-10位",
						maxlength:"请输入5-10位"
					},
					userId: {
						required:'请输入用户名',
					},
					username: {
						required:'请输入昵称',
					},
					okId: {
						required:'请输入验证码',
					},
				}
				//实例化当前的验证规则和提示消息
				this.WxValidate = new WxValidate(rules, message);
			}
		},
		onLoad(options) {
			this.initValidate();
		}
	}
</script>

<style lang="scss" scepod>
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

	.list {
		padding: 0 70rpx;

		.item {
			margin: 24rpx 0;
			padding: 32rpx;
			width: 546rpx;
			height: 36rpx;
			box-shadow: 0 0 60rpx rgba(43,86,112,.1);
			border-radius: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 38rpx;

			// box-shadow: 0 0 30px 0 rgb(43 86 112 / 10%);
			.huoqu {
				color: rgba(0, 0, 0, .7);
				font-size: 24rpx;
				line-height: 100rpx;
			}
		}
	}

	.footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 40rpx;
		left: 0;

		.center {
			width: 600rpx;
			height: 100%;
			background-color: #354e44;
			margin: 0 auto;
			border-radius: 50rpx;
			color: #fff;
			line-height: 100rpx;
			text-align: center;
			font-size: 32rpx;
		}
	}
</style>
