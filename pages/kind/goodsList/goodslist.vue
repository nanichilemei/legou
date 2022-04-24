<template>
	<view class="goods">
		<!-- 头部选项区 -->
		<view class="head">
			<view class="items" @tap="itemChange(index)" v-for="(items,index) in tabbarList" :key="items.id" >
				<view :class="index == current?'active':''">{{items.name}}</view>
				<view class="pic" v-if="index==1||index==2">
					<uni-icons type="top" size="8" :color="items.status=='up'?'red':'#fff'"></uni-icons>
					<uni-icons type="bottom" size="8" :color="items.status=='down'?'red':'#fff'"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 内容展示区 -->
		<view class="goods-list">
			<view class="item" v-for="item in goodsList" :key="item.id" @tap="goDetail(item.id)">
				<!-- :key="item.id" -->
				<image class="img" :src="item.pic" mode=""></image>
				<view class="title">{{item.name}}</view>
				<view class="desc">{{item.price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findProductList
	} from '../../../api/kind/index.js'
	export default {
		name: "",
		data() {
			return {
				start: 1,
				limit: 6,
				categoryId: '',
				isDesc: '',
				sortBy: '',
				goodsList: [],
				total: "",
				tabbarList: [{
						name: '新品',
						status: 'default'
					},
					{
						name: '销量',
						status: 'default'
					},
					{
						name: '价格',
						status: 'default'
					},
					{
						name: '筛选',
						status: 'default'
					}

				],
				current:0
			};
		},
		onLoad(options) {
			this.categoryId = options.id,
				this.getProductList()
		},
		methods: {
			// 获取数据
			getProductList() {
				findProductList(this.start, this.limit, {
					categoryId: this.categoryId,
					isDesc: this.isDesc,
					sortBy: this.sortBy
				}).then(res => {
					this.goodsList.push(...res.data.rows)
					this.total = res.data.total
					uni.stopPullDownRefresh()
				})
			},
			// 按需排序
			itemChange(index){
				this.current = index;
				// 重置其他选项
				this.tabbarList.forEach((el,idx) => {
					if(idx !== index){
						el.status ="default"
						this.isDesc = ""
						this.sortBy=""
					}
				})
				// 如果点击的是销量和价格这两项执行
				if(index == 1 || index ==2){
					// 判断点击的是哪个选项?
					if(index == 1){
						this.sortBy = "sale"
					} else if(index ==2){
						this.sortBy = "price"
					}
					// 判断箭头朝上朝下
					if(this.tabbarList[index].status == 'default'){
						this.tabbarList[index].status = "up",
						this.isDesc = "1"
					}else if(this.tabbarList[index].status == 'up'){
						this.tabbarList[index].status = "down",
						this.isDesc = "0"
					}else if(this.tabbarList[index].status == 'down'){
						this.tabbarList[index].status = "up",
						this.isDesc = "1"
					}
				};
				// 请求之前重置数据
				this.start = 1
				this.goodsList = []
				this.getProductList()	
			},
			goDetail(id){
				console.log(id)
				uni.navigateTo({
					url:`../../goodsdetail/goodsdetail?id=${id}`
				})
			}
		},
		// 监听用户下拉刷新
		onPullDownRefresh() {
			this.goodsList = []
			this.start = 1
			this.getProductList()
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.total > this.goodsList.length) {
				this.start++
				this.getProductList()
			}
		}
	}
</script>

<style lang="scss" scepod>
	.head {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		background-color: #354e44;
		color: #fff;
		.active{
			color: red;
		}
		.items {
			display: flex;

			.pic {
				display: flex;
				flex-direction: column;
			}

		}
	}

	.goods-list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background-color: #f1ece7;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			height: 600rpx;

			.img {
				width: 370rpx;
				height: 500rpx;
			}
		}
	}
</style>
