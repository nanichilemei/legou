<template>
	<view class="tuidan">
		<view class="card">
			<view class="top">
				<view>订单编号: {{orderBase.orderSn}}</view>
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
						<view class="p1" v-for="items in JSON.parse(item.productAttr)">{{items.key}} :
							{{items.value}}
						</view>
					</view>
				</view>
			</view>
			<view class="allprice">合计:{{orderBase.totalAmount}}元</view>
		</view>
		<view class="item">
			<view class="left">请选择退单数量:</view>
			<view class="right">{{num}}</view>
		</view>
		<view class="item">
			<view class="left">请选择退货原因:</view>
			<input type="text" class="ipt" v-model="reason" placeholder="请输入退货原因" />
		</view>
		<view class="item">
			<view class="left">请选择退货地址:</view>
			<view class="right">
				<picker v-if="addressList && addressList.length>0" mode="selector" :range="addressList"
					range-key="addressName" :value="current" @change="addressChange">
					<view>{{addressList[current].addressName}}</view>
				</picker>
			</view>
		</view>
		<view class="item">
			<view class="left">请输入问题描述:</view>
			<textarea class="area" v-model="desc" placeholder="请输入问题描述" />
		</view>
		<view class="item">
			<view class="box">
				<strong>温馨提醒：</strong>
				<view class="">上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张</view>
				<view class="upimg">
					<view class="up" @tap="upImg">
						<image src="../../../../static/icons/添加.png" mode=""></image>
						<view class="">上传图片</view>
					</view>
					<view class="piclist" v-for="(item,index) in picList" :key="item">
						<image class="tupian" :src="item" mode=""></image>
						<image @tap="detle(index)" class="cha" src="../../../../static/icons/fail.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn" @tap="returngoods">提 交</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById
	} from "../../../../api/user/index.js"
	import {
		getCompanyAddrss,
		addOrderReturnApply
	} from "../../../../api/user/myorder/index.js"
	import baseURL from "../../../../api/baseurl.js"
	export default {
		name: "",
		data() {
			return {
				orderId: "",
				skId: "",
				orderBase: {},
				orderList: [],
				reason: "",
				desc: "",
				num: "",
				addressList: [],
				current: 0,
				picList: []
			};
		},
		methods: {
			getOrder() {
				// 获取订单详情
				getPreOrderById(this.orderId).then(res => {
					console.log(res);
					this.orderBase = res.data.orderBase;
					this.orderList = res.data.orderItems.filter(el => el.id == this.skId);
					console.log(this.orderList);
					this.num = this.orderList[0].productQuantity
				})
				// 获取收货地址列表
				getCompanyAddrss().then(res => {
					// console.log(res);
					this.addressList = res.data.items
					// this.addressName = res.data.items[0].addressName
				})
			},
			// 选择退货地址
			addressChange(e) {
				console.log(e.detail.value);
				this.current = e.detail.value
			},
			// 上传图片
			upImg() {
				var that = this;
				uni.chooseImage({
					success(res) {
						console.log(res);
						// 判断是否大于3张
						if (res.tempFilePaths.length > 3) {
							uni.showToast({
								title: "上传图片超过三张",
								icon: "none"
							})
							return
						};
						let flag = res.tempFiles.some(el => el.size > 1024 * 1024);
						if (flag) {
							uni.showToast({
								title: "文件大小超过1M"
							})
							return
						};
						if (that.picList.length + res.tempFilePaths.length > 3) {
							uni.showToast({
								title: "图片超过三张"
							})
							return
						};
						that.picList.push(...res.tempFilePaths)
					}
				})
			},
			// 删除图片
			detle(idx) {
				this.picList.splice(idx, 1)
			},
			// 点击提交
			returngoods() {
				var imgArr = [];
				this.picList.forEach(el => {
					let promise = new Promise((resolve, reject) => {
						uni.uploadFile({
							url: baseURL + "/lejuClient/orderReturn/uploadImg",
							name: "file",
							success(res) {
								resolve(res)
							}
						})
					})
					imgArr.push(promise)
				})

				console.log(imgArr);

				Promise.all(imgArr).then(res => {
					let pathImg = res.map(el => {
						return JSON.parse(el.data).data.fileUrl
					}).join(",")

					addOrderReturnApply({
							"companyAddressId": this.addressList[this.current].id,
							"count": this.num,
							"description": this.desc,
							"orderId": this.orderId,
							"orderItemId": this.orderList[0].id,
							"proofPics": pathImg,
							"reason": this.reason
					}).then(res => {
						console.log(res);
						uni.navigateBack({
							delta:1
						})
					})
				})


			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.skId = options.skId;
			this.getOrder()
		}
	}
</script>

<style lang="scss" scepod>
	.tuidan {
		padding: 30rpx;

		.card {
			margin: 30rpx 0;
			padding: 36rpx;
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
						display: flex;
						height: 30rpx;

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

		.item {
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			font-size: 24rpx;
			background: #fff;
			border-bottom: 2rPx solid #f1ece7;

			.ipt {
				font-size: 24rpx;
				text-align: right;
			}

			.area {
				font-size: 24rpx;
				width: 50%;
			}

			.box {
				font-size: 24rpx;
				padding: 30rpx 0 0;

				.upimg {
					display: flex;
					margin: 30rpx 0;

					.up {
						width: 120rpx;
						height: 120rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: center;

						image {
							width: 60rpx;
							height: 60rpx;
						}
					}

					.piclist {
						width: 120rpx;
						height: 120rpx;
						margin: 20rpx;
						position: relative;

						.tupian {
							width: 120rpx;
							height: 120rpx;
						}

						.cha {
							width: 50rpx;
							height: 50rpx;
							position: absolute;
							top: -20rpx;
							right: -20rpx;
						}
					}
				}
			}
		}
	}

	.footer {
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
			color: #fff;
			font-size: 30rpx;
			line-height: 80rpx;
		}
	}
</style>
