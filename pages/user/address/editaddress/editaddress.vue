<template>
	<view>
		<view class="cont">
			<view class="item">
				<view class="left">收件人</view>
				<view class="right">
					<input type="text" v-model="username" placeholder="请输入收件人姓名" />
				</view>
			</view>
			<view class="item">
				<view class="left">电话号码</view>
				<view class="right">
					<input type="text" v-model="telphone" placeholder="请输入收件人电话号码" />
				</view>
			</view>
			<view class="item">
				<view class="left">所在地区</view>
				<view class="right">
					<!-- <input @focus="showSimpleAddress" v-model="username" /> -->
					<view class="" @tap="showSimpleAddress">{{city}}</view>
				</view>
			</view>
			<view class="item">
				<view class="left">详细地址</view>
				<view class="right">
					<input type="text" v-model="addDetail" placeholder="请输入详细地址" />
				</view>
			</view>
		</view>
		<simple-address 
		ref="simpleAddress" 
		:pickerValueDefault="cityPickerValueDefault" 
		@onConfirm="onConfirm" 
		themeColor="#007AFF"></simple-address>
		<view class="footer">
			<view class="center" @tap="addAddress">保存地址</view>
		</view>
	</view>
</template>

<script>
	import {addAddressInfo} from "../../../../api/user/index.js"
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		name:"editaddress",
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				telphone:"",
				username:"",
				city:"点击选择地址",
				addDetail:"",
				address:{}
			};
		},
		// 注册三级联动组件
		components: {simpleAddress},
		methods:{
			// 展示三级联动
			showSimpleAddress(){
				this.$refs.simpleAddress.open();
			},
			// 选择地址确定
			onConfirm(e){
				console.log(e);
				this.city= e.label;
				this.address = e
			},
			addAddress(){
				addAddressInfo({
					"city": this.address.labelArr[1],
					"cityCode": this.address.provinceCode+","+this.address.cityCode+","+this.address.areaCode, 
					"defaultStatus": 1,
					"detailAddress": this.addDetail,
					"name": this.username,
					"phoneNumber": this.telphone,
					"province": this.address.labelArr[0],
					"region": this.address.labelArr[2],
					"tag": "公司"
				}).then(res => {
					// console.log(res)
					if(res.success){
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		},
		onLoad(options){
			
		}
	}
</script>

<style lang="scss" scepod>
.cont{
	.item {
		width: 94%;
		margin: 0 3%;
		border-bottom: 2Px solid #ccc;
		display: flex;
		align-items: center;
		.left {
			width: 30%;
			height: 120rpx;
			font-weight: 200;
			font-size: 30rpx;
			line-height: 120rpx;
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
