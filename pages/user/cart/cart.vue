<template>
	<view>
		<view class="item" v-for="item in list" :key="item.id">
			<view class="info">
				<evan-checkbox v-model="item.checked"></evan-checkbox>
				<view class="cont">
					<image :src="item.productPic" mode=""></image>
					<view class="right">
						<view class="title">{{item.productName}}</view>
						<view class="desc">编号:{{item.productSkuId}}</view>
						<view class="desc">价格:￥{{item.price}}</view>
						<view class="desc">数量:{{item.quantity}}</view>
					</view>
				</view>
			</view>
			<uni-number-box class="change" v-model="item.quantity" :min="min"  @change="delItem($event,item.id)" background="#f2ece8"></uni-number-box>
		</view>
		<view class="footer">
			<view class="sel-all">
				<text>全选</text>
				<evan-checkbox v-model="allChecked"></evan-checkbox>
			</view>
			<view class="totalPrice">
				<view class="">合计￥</view>
				<view class="price">{{totalPrice}}</view>
				<view class="settlement" @tap="addPreOrder">结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findAllCartItem,delCartItems
	} from "../../../api/user/cart/index.js"
	import {addPreOrder as addPreOrderApi} from "../../../api/goodsdetail/index.js"
	export default {
		name: "Cart",
		data() {
			return {
				checked: false,
				list: [],
				min:0
			};
		},
		computed: {
			allChecked: {
				get() {
					return this.list.every(el => el.checked)
				},
				set(val) {
					this.list.forEach(el => {
						el.checked = val
					})
				}
			},
			totalPrice() {
				return this.list.reduce((prv, next) => {
					if (next.checked) {
						return prv + next.price * next.quantity
					} else {
						return prv
					}
				}, 0)

			}
		},
		methods: {
			getList() {
				findAllCartItem().then(res => {
					console.log(res)
					res.data.items.forEach(ele => {
						ele.checked = false
					})
					this.list = res.data.items;
				})
			},
			// 结算
			addPreOrder(){
				if(!this.list.some(el => el.checked)){
					uni.showToast({
						icon:"none",
						title:"至少选择一件商品"
					})
					return
				}
				var arr = [];
				// var newArr = this.list.filter(el => el.checked)
				this.list.forEach(el => {
					if(el.checked){
						arr.push({
							"cartId": el.id,
							"productId": el.productId,
							"productQuantity": el.quantity,
							"productSkuId": el.productSkuId
						})
					}
				});
				addPreOrderApi({
					"orderItemList": arr
				}).then(res => [
					// console.log(res)
					uni.navigateTo({
						url:`../order/order?orderId=${res.data.orderId}`
					})
				])
			},
			delItem(e,id){
				var that = this
				if(e < 1){
					uni.showModal({
						title:"是否删除该商品",
						success(res){
							if(res.confirm){
								delCartItems([id]).then(res => {
									// console.log(res)
									that.getList()
								})
							}else {
								that.$nextTick(function(){
									e = 1
									console.log(e)
								})
							}
						}
					})
					
				}
			}
		},
		onLoad(options) {
			this.getList()
		}
	}
</script>

<style lang="scss" scepod>
	.item {
		width: 90%;
		box-sizing: border-box;
		padding: 20rpx;
		margin: 50rpx auto;
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;

		// display: flex;
		// justify-content: flex-start;
		// align-items: center;
		.info {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			image {
				width: 126rpx;
				height: 136rpx;
				margin: 0 20rpx;
			}

			.cont {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.right {
					font-size: 11px;
					color: #8d8d8d;

					.title {
						font-size: 26rpx;
						color: #3e3e3e;
					}
				}
			}
		}

		.change {
			float: right;
		}
	}

	.footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 150rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;

		.sel-all {
			display: flex;
			align-items: center;
		}

		.totalPrice {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.price {
				color: red;
			}

			.settlement {
				width: 208rpx;
				height: 80rpx;
				border-radius: 10rpx;
				background-color: #354e44;
				line-height: 80rpx;
				text-align: center;
				color: #FFF;
				margin-left: 10rpx;
			}
		}
	}
</style>
