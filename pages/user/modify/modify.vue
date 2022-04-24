<template>
	<view class="modify">
		<view class="change" @tap="change">修改用户信息</view>
		<view class="item">
			<view class="left">头像</view>
			<image class="infoPic" v-if="isshow" :src="userInfo.icon" mode=""></image>
			<view v-else class="upload" @tap="upload">上传头像</view>
		</view>
		<view class="item">
			<view class="left">用户名</view>
			<view class="right">{{userInfo.username}}</view>
		</view>
		<view class="item">
			<view class="left">昵称</view>
			<view class="right" v-if="isshow">{{userInfo.nickname}}</view>
			<input type="text" class="ipt" v-else v-model="userInfo.nickname" />
		</view>
		<view class="item">
			<view class="left">手机号</view>
			<view class="right" v-if="isshow">{{userInfo.phone}}</view>
			<input type="text" class="ipt" v-else v-model="userInfo.phone" />
		</view>
		<view class="footer" v-if="isshow" @tap="signOut">退出登录</view>
		<view class="footer" v-else>更新</view>
	</view>
</template>

<script>
	import {
		getMemberInfo
	} from "../../../api/user/index.js"
	export default {
		name: "modify",
		data() {
			return {
				userInfo: {},
				isshow:true
			};
		},
		methods: {
			getInfo() {
				getMemberInfo().then(res => {
					console.log(res)
					this.userInfo = res.data.userInfo
				})
			},
			// 点击修改
			change(){
				this.isshow = false;
			},
			// 修改头像
			upload(){
				
			},
			// 退出登录
			signOut(){
				uni.removeStorageSync("token");
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options) {
			this.getInfo()
		}
	}
</script>

<style lang="scss" scepod>
	.change {
		margin: 20rpx;
		float: right;
		width: 224rpx;
		height: 60rpx;
		text-align: center;
		box-sizing: border-box;
		border-radius: 10rpx;
		color: #353535;
		border: 1px solid #353535;
		line-height: 60rpx;
		font-size: 26rpx;
	}

	.item {
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		border-bottom: 1px solid #e5e5e5;
		line-height: 94rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.right {
			color: #a1a1a1;
		}

		.ipt {
			text-align: right;
		}
		.infoPic {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		.upload {
			width: 176rpx;
			height: 60rpx;
			box-sizing: border-box;
			color: #353535;
			border: 1px solid #353535;
			text-align: center;
			line-height: 60rpx;
			font-size: 26rpx;
			border-radius: 10rpx;
		}

	}
	.footer {
		width: 50%;
		height: 88rpx;
		margin: 200rpx auto;
		background-color: #1c4b47;
		border-radius: 10rpx;
		text-align: center;
		color: #fff;
		line-height: 88rpx;
		font-size: 32rpx;
	}
</style>
