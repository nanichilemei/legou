<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="">{{msg}}</view>
		<button v-for="(item,index) in persons" :key="item.age" @tap="itemEvent(index)" :type="current == index? 'warn':'default'">{{item.name}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				msg:"不凡",
				current:0,
				persons:[
					{
						name:'张三',
						age:18
					},
					{
						name:'李四',
						age:20
					},
					{
						name:'王五',
						age:19
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			itemEvent(index){
				this.current = index
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
