<template>
	<view>
		<view class="head">
			<view :class="current == index?'active':''" v-for="(items,index) in titleList" :key="items.name" @tap="gotitle(index)">{{items.name}}</view>
		</view>
		<view class="cont">
			<view class="item" v-for="item in filterList" :key="item.order.id">
				<view class="card">
					<view class="top">
						<view >订单编号{{item.order.orderSn}}</view>
						<view >{{item.order.status | statusText}}</view>
					</view>
					<view class="items" v-for="items in item.items" :key="item.id">
						<image class="img" :src="items.productPic" mode=""></image>
						<view class="info">
							<view class="num1">
								<view>{{items.productName}}</view>
								<view>￥{{items.productPrice}}元</view>
							</view>
							<view class="num2">
								<view>编号 : {{items.productSn}}</view>
								<view>×{{items.productQuantity}}</view>
							</view>
							<view class="num3">
								规格 : <text v-for="itemss in JSON.parse(items.productAttr)">{{itemss.key}} : {{itemss.value}}</text>
							</view>
							<view class="num4" v-if="current == 2">
								<text  @tap="retrunGoods(item.order.id,items.id)">退货</text>
							</view>
						</view>
					</view>
					<view class="center">
						<view class="time">时间:{{item.order.createTime}}</view>
						<view class="allprice">合计:{{item.order.totalAmount}}元</view>
					</view>
					<view class="btn">
						<view class="bot" @tap="cancelOrder(item.order.id)" v-if="current == 0">取消订单</view>
						<view class="bot" @tap="goOrder(item.order.id)" v-if="current == 0">付款</view>
						<view class="bot" @tap="configorder(item.order.id)" v-if="current == 2">确认收货</view>
						<view class="bot red" @tap="deleteOrder(item.order.id)" v-if="current == 3">订单已关闭,删除记录</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {findAllOrders, orderReturnApplys,cancelOrder as cancelOrderApi, receiveDone, deleteOrder as deleteOrderApi} from "../../../api/user/myorder/index.js"
	export default {
		name:"",
		data() {
			return {
				current:0,
				orderList:[],
				returnList:[],
				titleList: [{
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
		computed:{
			filterList(){
				return this.orderList.filter(el => el.order.status == this.current)
			}
		},
		filters:{
			statusText(val){
				if(val == 0){
					return "未付款"
				}else if(val == 1){
					return "已付款,等待发货"
				}else if(val == 2){
					return "已发货"
				}else if(val == 3){
					return "已收货"
				}else if(val == 4){
					return "已退单"
				}else{
					return "无效订单"
				}
			}
		},
		methods:{
			getList(){
				findAllOrders().then(res => {
					console.log(res)
					this.orderList = res.data.orderList
				});
				orderReturnApplys().then(res => {
					console.log(res);
					this.returnList = res.data.items;
				})
			},
			// 点击那个模块
			gotitle(idx){
				this.current = idx;
				this.getList();
			},
			// 订单页面
			goOrder(orderId){
				uni.navigateTo({
					url:`../order/order?orderId=${orderId}`
				})
			},
			// 取消订单
			cancelOrder(orderId){
				cancelOrderApi(orderId).then(res => {
					console.log(res);
					this.getList()
				})
			},
			// 确认收货
			configorder(id){
				receiveDone({
					orderId:id
				}).then(res => {
					console.log(res);
					this.getList()
				})
			},
			// 删除订单
			deleteOrder(id){
				deleteOrderApi({
					orderId:id
				}).then(res => {
					console.log(res);
					this.getList()
				})
			},
			// 退单
			retrunGoods(id,skId){
				uni.navigateTo({
					url:`./tuidan/tuidan?orderId=${id}&skId=${skId}`
				})
			}
		},
		onLoad(options){
			this.current = options.idx;
		},
		onShow(){
			this.getList()
		}
	}
</script>

<style lang="scss" scepod>
.head {
	display: flex;
	justify-content: space-around;
	height: 62rpx;
	padding-top: 14rpx;
	background-color: #354e44;
	color: #fff;
	font-size: 30rpx;
	line-height: 62rpx;
	position: fixed;
	top: 0;
	width: 100%;
	margin-top: 80rpx;
	left: 0;
	z-index: 999;
	.active {
		box-sizing: border-box;
		border-bottom: 4rpx solid red;
		color: red;
	}
}
.cont {
	margin-top: 100rpx;
	.item {
		width: 690rpx;
		margin: 30rpx auto;
		.card{
			// margin-top: 30rpx;
			padding: 36rpx;
			// height: 400rpx;
			background-color: #FFF;
			border-radius: 20rpx;
			.top{
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
					.num4 {
						font-size: 22rpx;
						text-align: right;
						margin-top: 10rpx;
						color: #8d8d8d;
					}
				}
			}
			.center {
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				line-height: 36rpx;
				margin-top: 14rpx;
			}
			.btn {
				display: flex;
				justify-content: flex-end;
				margin-top: 14rpx;
				.bot {
					width: 124rpx;
					height: 50rpx;
					border: 2rpx solid #2d4f43;
					font-size: 26rpx;
					border-radius: 10rpx;
					color: #2d4f43;
					text-align: center;
					line-height: 50rpx;
					margin-left: 32rpx;
				}
				.red{
					width: auto;
					padding: 0 15rpx;
					border: 2rpx solid red;
				}
			}
		}
	}
}
</style>
