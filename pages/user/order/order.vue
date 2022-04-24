<template>
	<view class="order">
		<view class="box">
			<view class="waitpay">等待支付</view>
			<view class="changeAddress">
				<view class="address" v-if="show.name" @tap="goAddress">
					姓名:{{show.name}} 电话号码:{{show.phoneNumber}}
					<br />收货地址:{{show.province}}-{{show.city}}-{{show.region}}{{show.detailAddress}}
				</view>
				<view class="address" v-else @tap="goAddress">去选择收货地址</view>
			</view>
			<view class="card">
				<view class="top">
					<view>订单编号{{orderBase.orderSn}}</view>
					<view>等待支付</view>
				</view>
				<view class="items" v-for="item in orderList" :key="item.id">
					<image class="img" :src="item.productPic" mode=""></image>
					<view class="info">
						<view class="num1">
							<view>{{item.productName}}</view>
							<view>￥{{item.productPrice}}元</view>
						</view>
						<view class="num2">
							<view>编号 : {{item.productSn}}</view>
							<view>×{{item.productQuantity}}</view>
						</view>
						<view class="num3">
							规格 : <text v-for="items in JSON.parse(item.productAttr)">{{items.key}} :
								{{items.value}}</text>
						</view>
					</view>
				</view>
				<view class="allprice">合计:{{orderBase.totalAmount}}元</view>
				<view class="btn">
					<view class="submit" @tap="gopayment">确认付款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById
	} from "../../../api/user/index.js"
	export default {
		name: "",
		data() {
			return {
				orderId: "",
				orderList: [],
				orderBase: {},
				show: {}
			};
		},
		methods: {
			// 获取订单号
			getOrder() {
				getPreOrderById(this.orderId).then(res => {
					// console.log(res)
					this.orderBase = res.data.orderBase;
					this.orderList = res.data.orderItems
				})
			},
			// 去选择收货地址
			goAddress() {
				uni.navigateTo({
					url: "../address/address?type=select"
				})
			},
			// 去付款
			gopayment() {
				var that = this
				uni.navigateTo({
					url: `../payment/payment?orderId=${that.orderId}`
				})
			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.getOrder()
		},
		onShow() {
			this.show = uni.getStorageSync("selectAddress");
			
		}
	}
</script>

<style lang="scss" scepod>
	.order {
		background-color: #f1ece7;

		.box {
			padding: 0 60rpx;
			height: 100vh;

			.waitpay {
				height: 86rpx;
				border-bottom: 2rpx solid #ccc;
				line-height: 86rpx;
				font-size: 36rpx;
			}

			.changeAddress {
				padding: 30rpx 0;
				border-bottom: 2rpx solid #ccc;

				.address {
					font-size: 28rpx;
				}
			}

			.card {
				margin-top: 30rpx;
				padding: 36rpx;
				// height: 400rpx;
				background-color: #FFF;
				border-radius: 20rpx;

				.top {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					padding-bottom: 30rpx;
					border-bottom: 2rpx solid #f1ece7;
				}

				.items {
					display: flex;
					padding: 30rpx 0;
					border-bottom: 2rpx solid #f1ece7;

					.img {
						width: 170rpx;
						height: 170rpx;
					}

					.info {
						margin-left: 28rpx;
						width: 392rpx;
						display: flex;
						flex-direction: column;

						.num1 {
							display: flex;
							justify-content: space-between;
							font-size: 26rpx;
							line-height: 74rpx;
						}

						.num2 {
							display: flex;
							justify-content: space-between;
							font-size: 22rpx;
							color: #8d8d8d;
							line-height: 30rpx;
						}

						.num3 {
							font-size: 22rpx;
							color: #8d8d8d;
							line-height: 30rpx;
						}
					}
				}

				.allprice {
					font-size: 26rpx;
					line-height: 36rpx;
					text-align: right;
					margin-top: 14rpx;
				}

				.btn {
					display: flex;
					justify-content: flex-end;
					margin-top: 14rpx;

					.submit {
						width: 124rpx;
						height: 50rpx;
						border: 2rpx solid #2d4f43;
						font-size: 26rpx;
						border-radius: 10rpx;
						color: #2d4f43;
						text-align: center;
						line-height: 50rpx;
					}
				}
			}
		}
	}
</style>
