<template>
	<view class="find" :style="'padding-top:'+statusBarHeight+'px'">
		<view class="head">
			<view :class="current == index? 'active':''" v-for="(item,index) in topList" @tap="switchItem(index)">
				{{item.name}}
			</view>
		</view>
		<view class="content">
			<view class="article" v-if="current == 0">
				<view v-for="item in articleList" :key="item.id">
					<view class="item">
						<view class="box" @tap="goarticle(item.id)">
							<image class="coverImg" :src="item.coverImg" mode=""></image>
							<view class="title">{{item.title}}</view>
							<view class="author">{{item.author}}</view>
						</view>
						<view class="footer">
							<view class="">{{item.viewCount}}</view>
							<uni-icons type="star" size="22" :color="item.collected?'red':''"
								@tap="collectedArticle(item)">
							</uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="brand" v-else-if="current == 1">
				<view class="item" v-for="items in brandList" :key="items.id">
					<image :src="items.bigPic" mode=""></image>
					<view class="title">{{items.name}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		findArticleByPage,
		findBrandsByPage
	} from "../../api/find/index.js"
	export default {
		name: "",
		data() {
			return {
				topList: [{
						name: "精选文章"
					},
					{
						name: "品牌列表"
					}
				],
				current: 0,
				statusBarHeight: 0,
				articleList: [],
				brandList: []
			};
		},
		onLoad() {
			this.getlist();
			// #ifdef MP-WEIXIN
			var obj = uni.getMenuButtonBoundingClientRect()
			this.statusBarHeight = obj.height + obj.top
			// #endif
		},
		methods: {
			// 切换列表
			switchItem(idx) {
				this.current = idx
			},
			// 获取文章列表
			getlist() {
				findArticleByPage(1, 10).then(res => {
					// console.log(res)
					res.data.rows.forEach(el => {
						el.collected = false
					})
					this.articleList = res.data.rows;
					// 第一步，先获取收藏列表
					var newArr = uni.getStorageSync("collectedArticle")
					// 第二步，判断是否有收藏
					if (newArr) { // 收藏过
						newArr.forEach(ele => {
							let item = this.articleList.find(ele2 => ele2.id == ele.id)
							item.collected = true
						})
					}
				})
				// 获取品牌列表
				findBrandsByPage(1, 10).then(res1 => {
					// console.log(res1)
					this.brandList = res1.data.rows
				})
			},
			// 商品收藏
			collectedArticle(article) {
				// 第一步，先获取收藏列表
				var newArr = uni.getStorageSync("collectedArticle")
				// 第二步判断是否收藏过
				if (!newArr) { //没有收藏过任何商品
					uni.setStorageSync("collectedArticle", [article]);
					article.collected = true
					uni.showToast({
						title: "收藏成功"
					})
				} else { // 收藏过商品
					// 判断当前商品有没有收藏过
					let item = newArr.find(el => el.id == article.id)
					if (!item) { //当前商品没有被收藏
						// 添加到缓存收藏
						newArr.push(article)
						article.collected = true
						uni.showToast({
							title: "收藏成功"
						})
					} else { //当前商品已被收藏
						let idx = newArr.findIndex(el => el.id == article.id)
						// 从缓存中移除
						newArr.splice(idx, 1);
						article.collected = false
						uni.showToast({
							title: "取消收藏"
						})
					}
					//重新设置回缓存中
					uni.setStorageSync("collectedArticle", newArr)
				}
			},
			// 文章详情
			goarticle(id){
				uni.navigateTo({
					url:`./articledetail/articledetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scepod>
	.find {
		background-color: #f1ece7;
	}

	.head {
		width: 750rpx;
		height: 88rpx;
		background-color: #354e44;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		z-index: 99;

		view {
			margin-right: 20rpx;
			position: relative;
		}

		.active::after {
			content: "";
			width: 100rpx;
			height: 2rpx;
			background-color: #fff;
			position: absolute;
			bottom: -15rpx;
			left: 10rpx;
		}
	}

	.content {
		padding-top: 88rpx;

		.article {
			.item {
				margin: 28rpx auto;
				width: 90%;
				height: 482rpx;
				background-color: #fff;
				border-radius: 24rpx;

				.box {
					width: 100%;
					height: 382rpx;
					background-color: #8f8f94;
					position: relative;

					.coverImg {
						width: 100%;
						height: 100%;
					}

					.title {
						position: absolute;
						left: 20rpx;
						top: 244rpx;
						color: #fff;
						font-size: 48rpx;
						line-height: 68rpx;
					}

					.author {
						position: absolute;
						left: 20rpx;
						top: 316rpx;
						color: #fff;
						font-size: 30rpx;
						line-height: 42rpx;
					}
				}

				.footer {
					width: 80%;
					height: 100rpx;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
		.brand{
			.item{
				background-color: #fff;
				width: 690rpx;
				height: 592rpx;
				margin: 30rpx;
				image {
					width: 100%;
					height: 480rpx;
				}
				.title{
					margin: 30rpx;
					font-size: 32rpx;
					line-height: 44rpx;
					font-weight: 700;
				}
			}
		}
	}
</style>
