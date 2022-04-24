<template>
	<view class="goods-detail">
		<!-- banner轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="banner">
			<swiper-item v-for="item in albumPics" :key="item">
				<image :src="item" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 收藏按钮 -->
		<uni-icons type="star" size="50" @tap="collectedGoods" class="star" :color="collected?'red':''"></uni-icons>
		<!-- 价格 -->
		<view class="desc">
			<view class="price">￥{{product.price}}</view>
		</view>
		<!-- 图片内容展示 -->
		<view class="contImg" v-html="product.detailMobileHtml"></view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="isShowMask" @touchmove.stop.prevent>
			<view class="box">
				<uni-icons class="close" type="closeempty" size="30" @tap="closeMask"> </uni-icons>
				<image class="boxImg" :src="now.pic" mode=""></image>
				<view class="cont">
					<view class="">{{product.name}}</view>
					<view class="">库存数量:{{now.stock}}</view>
				</view>
				<view class="boxcenter">
					<view class="mkbig">商品选择</view>
					<view class="changeitem">
						<view v-for="(item,index) in product.skuList" :key="index" class="item"
							:class="current==index? 'active':''" @tap="changeItem(index)">
							<text v-for="items in JSON.parse(item.spData)">{{items.key}}:{{items.value}}</text>
						</view>
					</view>
					<view class="mkbig">特色服务</view>
					<view class="changeitem">
						<view class="item">送货上门</view>
						<view class="item">上门安装</view>
					</view>
					<view class="shopnum">
						<view>购买数量</view>
						<uni-number-box v-model="now.numb"></uni-number-box>
					</view>
				</view>
				<button class="submit" @tap="submit">确定</button>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="footer">
			<view class="addcart" @tap='openMask(1)'>添加到购物车</view>
			<view class="shop" @tap='openMask(2)'>立即购买</view>
		</view>
	</view>
</template>
<script>
	import {
		productDetail,
		addCart,
		addPreOrder
	} from "../../api/goodsdetail/index.js"
	export default {
		name: "",
		data() {
			return {
				product: {},
				albumPics: {},
				collected: false,
				id: "",
				isShowMask: false,
				flag: "",
				now: {},
				current: 0,
				vModelValue: 1
			};
		},
		methods: {
			// 获取商品详情
			getdetail(id) {
				productDetail(id).then(res => {
					console.log(res)
					this.product = res.data.product;
					this.albumPics = res.data.product.albumPics.split(',');
					this.now = res.data.product.skuList[0];
					this.$set(this.now, 'numb', 1)
					uni.setNavigationBarTitle({
						title: res.data.product.name
					})
				})
			},
			// 商品收藏
			collectedGoods() {
				// 第一步，先获取收藏列表
				var newArr = uni.getStorageSync("collectedGoods")
				// 第二步判断是否收藏
				if (!newArr) {
					uni.setStorageSync("collectedGoods", [this.product]);
					console.log("1")
					this.collected = true
					uni.showToast({
						title: "收藏成功"
					})
				} else { // 收藏过商品
					// 判断当前商品有没有收藏过
					let item = newArr.find(el => el.id == this.id)
					if (!item) { //当前商品没有被收藏
						// 添加到缓存收藏
						newArr.push(this.product)
						this.collected = true
						uni.showToast({
							title: "收藏成功"
						})
					} else { //当前商品已被收藏
						let idx = newArr.findIndex(el => el.id == this.id)
						// 从缓存中移除
						newArr.splice(idx, 1);
						this.collected = false
						uni.showToast({
							title: "取消收藏"
						})
					}
					//重新设置回缓存中
					uni.setStorageSync("collectedGoods", newArr)
				}
			},
			// 打开遮罩层
			openMask(flag) {
				this.flag = flag
				this.isShowMask = true
			},
			// 关闭遮罩层
			closeMask() {
				this.isShowMask = false
			},
			// 点击确定
			submit() {
				if (!uni.getStorageSync("token")) { //未登录
					uni.showModal({
						title: "登录提示",
						content: "暂未登录，是否立即登录",
						success(res) {
							console.log(res)
							if (res.confirm) {
								uni.navigateTo({
									url: "../user/login/login",
									complete(or) {
										console.log(or)
									}
								})
							} else {
								// 点击的是取消
								uni.showToast({
									title: "你点击了取消",
									icon: "none"
								})
							}
						}
					})
				} else { //已登陆 执行下列操作
					if (this.flag == 1) { //当点击的是添加购物车
						addCart({
								"productId": this.id,
								"productSkuId": this.now.id,
								"quantity": this.now.numb
							})
							.then(res => {
								console.log(res);
							})
					} else if (this.flag == 2) {
						addPreOrder({
							"orderItemList": [
							    {
							      "productId": this.id,
							      "productQuantity": this.now.numb,
							      "productSkuId": this.now.id
							    }
							  ],
						}).then(res => {
							console.log(res)
							if(res.success){
								uni.showToast({
									title:"购买成功,1s后跳转到订单确认页"
								});
								setTimeout(() => {
									uni.navigateTo({
										url:`../user/order/order?orderId=${res.data.orderId}`
									})
								},1000)
							} else {
								uni.showToast({
									title:res.message,
									duration:3000
								})
							}
						})
					}
				}
			},
			// 改变选项
			changeItem(idx) {
				this.current = idx;
				this.now = this.product.skuList[idx]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getdetail(options.id)
			// 页面进来时，判断商品是否收藏过
			// 第一步，先获取收藏列表
			var newArr1 = uni.getStorageSync("collectedGoods")
			// 第二步判断是否被收藏
			if (!newArr1) {
				this.collected = false
			} else {
				let item = newArr1.find(el => el.id == this.id)
				if (item) {
					this.collected = true
				}
			}
		}
	}
</script>

<style lang="scss" scepod>
	.goods-detail {
		background-color: #f1ece7;
		position: relative;

		.banner {
			width: 750rpx;
			height: 634rpx;

			image {
				width: 100%;
				height: 634rpx;
			}
		}

		.star {
			position: absolute;
			top: 580rpx;
			right: 100rpx;
		}

		.desc {
			padding: 70rpx;

			.price {
				color: red;
				font-size: 60rpx;
				font-weight: 700;
			}
		}

		.contImg {
			width: 100%;
			padding-bottom: 150rpx;

			text-align: center::v-deep img {
				width: 90%;
				height: auto;
			}
		}

		.mask {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, .5);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 99;

			.box {
				position: relative;
				width: 80%;
				height: 60%;
				background-color: white;

				.close {
					position: absolute;
					top: 30rpx;
					right: 30rpx;
					z-index: 5;
				}

				.boxImg {
					width: 192rpx;
					height: 192rpx;
					position: absolute;
					top: -50rpx;
					left: 50rpx;
				}

				.cont {
					margin-top: 100rpx;
					margin-left: 300rpx;
				}

				.boxcenter {
					width: 70%;
					margin: 50rpx auto 0;

					.mkbig {
						font-size: 30rpx;
						font-weight: 700;
					}

					.changeitem {
						margin-top: 10rpx;
						height: 150rpx;
						overflow: auto;

						.item {
							width: 100%;
							height: 50rpx;
							box-sizing: border-box;
							border-radius: 15rpx;
							background-color: #f2f4f3;
							margin-bottom: 20rpx;
						}

						.active {
							border: 4rpx solid #000;
						}
					}

					.shopnum {
						display: flex;
						justify-content: space-between;
					}
				}

				.submit {
					width: 200rpx;
					height: 70rpx;
					color: #fff;
					line-height: 70rpx;
					border-radius: 20rpx;
					background-color: #354e44;
					margin: 20rpx auto 0;
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			line-height: 100rpx;
			font-size: 30rpx;
			color: white;

			.addcart {
				width: 50%;
				height: 100rpx;
				background-color: #e2e2e2;
				color: #8f8f94;
			}

			.shop {
				width: 50%;
				height: 100rpx;
				background-color: #354e44;
			}
		}
	}
</style>
