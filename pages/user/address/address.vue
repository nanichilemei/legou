<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in adrslist" :key="item.id" @tap="savelocal(item)">
				<view class="center">
					<view class="name">{{item.name}}</view>
					<view class="phone">{{item.phoneNumber}}</view>
				</view>
				<view class="right">
					<image src="../../../static/icons/edit.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="center" @tap="goEdit">新增地址</view>
		</view>
	</view>
</template>

<script>
	import {findAllAddress} from "../../../api/user/index.js"
	export default {
		name:"address1",
		data() {
			return {
				adrslist:[],
				type:""
			};
		},
		methods:{
			// 获取地址列表
			getList(){
				findAllAddress().then(res => {
					console.log(res)
					this.adrslist = res.data.items
				})
			},
			// 选择此地址
			savelocal(item){
				uni.setStorageSync("selectAddress",item)
				if(this.type == "select"){
					uni.navigateBack({
						delta:1
					})
				}
			},
			goEdit(){
				uni.navigateTo({
					url:"./editaddress/editaddress"
				})
			}
		},
		onLoad(options){
			this.getList();
			this.type = options.type;
		}
	}
</script>

<style lang="scss" scepod>

.list {
	width: 94%;
	margin: 0 auto;
	.item {
		padding: 20rpx 0;
		border-bottom: 2rPx solid #ccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.name {
			margin-left: 30rpx;
			margin-bottom: 20rpx;
		}
		.phone {
			margin-left: 30rpx;
			font-size: 24rpx;
			color: #999;
		}
		.right {
			width: 80rpx;
			height: 60rpx;
			border-left: solid 1rpx #aaa;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
}
.footer {
	width: 100%;
	height: 120rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	.center {
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
