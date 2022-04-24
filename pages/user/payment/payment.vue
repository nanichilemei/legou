<template>
	<view>
		<view class="box">
			<view class="top">
				<view class="left">订单编号: </view>
				<view class="right"> {{number}}</view>
			</view>
			<view class="top">
				<view class="left">订单价格: </view>
				<view class="right"> {{price}}元</view>
			</view>
			<view class="payMode">
				<view >请选择支付方式</view>
				<view class="item">
					<view class="left">
						<image src="../../../static/icons/alipay.png" mode=""></image>
						<view class="">支付宝支付</view>
					</view>
					<evan-radio v-model="paymode" label="1"></evan-radio>
				</view>
				<view class="item">
					<view class="left">
						<image src="../../../static/icons/wxpay.png" mode=""></image>
						<view class="">微信支付</view>
					</view>
					<evan-radio v-model="paymode" label="2"></evan-radio>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn" @tap="goPay">立即支付</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById, payConfirm
	} from "../../../api/user/index.js"
	export default {
		name:"payment",
		data() {
			return {
				orderId:"",
				number:"",
				price:"",
				paymode:"1"
			};
		},
		methods:{
			getId(){
				getPreOrderById(this.orderId).then(res => {
					// console.log(res)
					this.number = res.data.orderBase.orderSn;
					this.price = res.data.orderBase.totalAmount
				})
			},
			// 立即支付
			goPay(){
				payConfirm({
					orderId:this.orderId,
					payType:Number(this.paymode)
				}).then(res => {
					console.log(res)
					if(res.success){
						uni.switchTab({
							url:"../user"
						})
					}
				})
			}
		},
		onLoad(options){
			this.orderId = options.orderId;
			console.log(this.orderId)
			this.getId()
		}
	}
</script>

<style lang="scss" scepod>
.box {
	width: 94%;
	padding: 0 3%;
	.top {
		width: 100%;
		height: 90rpx;
		font-size: 32rpx;
		line-height: 90rpx;
		display: flex;
		.left {
			color: #7d7d7d;
		}
	}
	.payMode {
		margin-top: 40rpx;
		.item {
			display: flex;
			justify-content: space-between;
			height: 120rpx;
			align-items: center;
			font-size: 30rpx;
			.left{
				display: flex;
				align-items: center;
				image {
					margin-right: 10rpx;
					width: 80rpx;
				height: 80rpx;
				}
			}
		 }	}
}.footer {
	width: 100%;
	height: 120rpx;
	margin-top: 60rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.btn {
		width: 70%;
		height: 80rpx;
		border-radius: 80rpx;
		background-color: #354e44;
		text-align: center;
		color:#fff;
		font-size: 30rpx;
		line-height: 80rpx;
	}
}
</style>
