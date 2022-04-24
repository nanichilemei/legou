<template>
	<view class="user" :style="'padding-top:'+statusBarHeight+'px'">
		<view class="box">
			<view class="top">
				<image class="topImg" :src="userInfo.icon" mode="" @tap="goModify"></image>
				<view class="username">
					<view class="name">{{userInfo.nickname}}</view>
					<view class="phoneId">用户名:{{userInfo.phone}}</view>
				</view>
			</view>
			<view class="isuser" v-if="isshow">
				<view class="register" @tap="register">注册</view>
				<view class="gologin" @tap="gologin">登录</view>
			</view>
			<view class="center">
				<view class="title">我的订单</view>
				<view class="navs">
					<view class="items" v-for="(item,index) in orderList" :key="item.name" @tap="gomyOrder(index)">
						<image class="iconord" :src="item.pic" mode=""></image>
						<view class="ordname">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<uni-grid class="list" :column="3" :showBorder="false">
					<uni-grid-item>
						<view class="item">
							<image src="../../static/icons/save.png" mode=""></image>
							<view class="text">商品收藏</view>
						</view>
					</uni-grid-item>
					<uni-grid-item>
					<view class="item">
							<image src="../../static/icons/brand.png" mode=""></image>
							<view class="text">品牌</view>
						</view>
					</uni-grid-item>
					<uni-grid-item>
					<view class="item">
							<image src="../../static/icons/article.png" mode=""></image>
							<view class="text">文章收藏</view>
						</view>
					</uni-grid-item>
					<uni-grid-item>
					<view class="item" @tap="goaddress">
							<image src="../../static/icons/address.png" mode=""></image>
							<view class="text">地址</view>
						</view>
					</uni-grid-item>
					<uni-grid-item>
					<view class="item">
							<image src="../../static/icons/card.png" mode=""></image>
							<view class="text">卡包</view>
						</view>
					</uni-grid-item>
					<uni-grid-item>
					<view class="item" @tap="goCart">
							<image src="../../static/icons/cart2.png" mode=""></image>
							<view class="text">购物车</view>
						</view>
					</uni-grid-item>
					<uni-grid-item>
					<view class="item">
							<image src="../../static/icons/kf.png" mode=""></image>
							<view class="text">联系客服</view>
						</view>
					</uni-grid-item>
				</uni-grid>

			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		getMemberInfo
	} from "../../api/user/index.js"
	import mix from '../../mixins/index.js'
	export default {
		name: "",
		mixins: [mix],
		data() {
			return {
				statusBarHeight: 0,
				userInfo: {
					icon:"../../static/icons/leju-logo.png",
					nickname:"暂未登录",
					phone:""
				},
				isshow: false,
				orderList: [{
						name: "待付款",
						pic: "../../static/icons/icon-pay.png"
					},
					{
						name: "已付款",
						pic: "../../static/icons/pay-done.png"
					},
					{
						name: "已发货",
						pic: "../../static/icons/icon-car.png"
					},
					{
						name: "已收货",
						pic: "../../static/icons/icon-done.png"
					},
					{
						name: "售后",
						pic: "../../static/icons/icon-back.png"
					}
				]
			};
		},
		methods: {
			// 获取用户信息
			getInfo() {
				getMemberInfo().then(res => {
					// console.log(res)
					this.userInfo = res.data.userInfo
				})
			},
			// 前往登录
			gologin() {
				uni.navigateTo({
					url: "./login/login"
				})
			},
			// 前往地址列表
			goaddress(){
				uni.navigateTo({
					url:"./address/address"
				})
			},
			// 前往修改
			goModify(){
				uni.navigateTo({
					url:"./modify/modify"
				})
			},
			// 前往注册
			register(){
				uni.navigateTo({
					url:"./register/register"
				})
			},
			// 前往购物车
			goCart(){
				uni.navigateTo({
					url:"./cart/cart"
				})
			},
			// 前往我的订单
			gomyOrder(idx){
				uni.navigateTo({
					url:`./myorder/myorder?idx=${idx}`
				})
			}
		},
		onLoad(options) {
			// #ifdef MP-WEIXIN
			var obj = uni.getMenuButtonBoundingClientRect()
			this.statusBarHeight = obj.height + obj.top
			// #endif
		},
		onShow(){
			if (uni.getStorageSync("token")) {
				this.isshow = false
			} else {
				this.isshow = true
			}
			if (!this.checkLoginStatus()) return;
			this.getInfo();
			
		}
	}
</script>

<style lang="scss" scepod>
	.user {
		background-color: #f1ece7;
		height: 100vh;

		.box {
			padding: 0 40rpx;

			// height: 300rpx;
			.top {
				padding-top: 60rpx;
				overflow: hidden;

				.topImg {
					float: left;
					width: 170rpx;
					height: 170rpx;
					border-radius: 50%;
				}

				.username {
					float: left;
					margin-left: 32rpx;
					height: 170rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.name {
						font-size: 40rpx;
						font-weight: 600;
					}

					.phoneId {
						color: #999;
						font-size: 26rpx;
					}
				}
			}

			.isuser {
				margin: 40rpx 0;
				display: flex;
				justify-content: space-around;
				text-align: center;
				line-height: 72rpx;

				.register {
					width: 180rpx;
					height: 72rpx;
					border: 2rpx solid #354e44;
					box-sizing: border-box;
					border-radius: 10rpx;
				}

				.gologin {
					width: 180rpx;
					height: 72rpx;
					border: 2rpx solid #354e44;
					box-sizing: border-box;
					background-color: #354e44;
					color: #fff;
					border-radius: 10rpx;
				}
			}

			.center {
				height: 208rpx;
				margin-top: 60rpx;
				background-color: #fff;

				.title {
					margin: 0 54rpx;
					height: 76rpx;
					font-size: 26rpx;
					line-height: 76rpx;
					border-bottom: 2rpx solid #ddd;
					box-sizing: border-box;
				}

				.navs {
					padding: 0 54rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text-align: center;

					.items {
						display: flex;
						flex-direction: column;
						align-items: center;

						.iconord {
							margin-top: 20rpx;
							width: 40rpx;
							height: 40rpx;
						}

						.ordname {
							margin-top: 10rpx;
							font-size: 26rpx;
							line-height: 36rpx;
						}
					}
				}
			}

			.footer {
				border-radius: 20rpx;
				background-color: #FFF;
				margin-top: 60rpx;
				// height: 600rpx;
				padding: 30rpx 0 60rpx;

				.list {
					.item {
							padding: 36rpx 0;
							height: 150rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: space-around;

							image {
								width: 50rpx;
								height: 50rpx;
							}
							.text {
								font-size: 26rpx;
								line-height: 38rpx;
							}
						
					}
				}
			}
		
		}
	}
</style>
