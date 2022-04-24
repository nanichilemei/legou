<template>
	<view class="home">
		<!-- 轮播 -->
		<view class="banner" :style="'padding-top:'+statusBarHeight+'px'" >
			<swiper class="list" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular='true' indicator-active-color="#fff">
				<swiper-item v-for="item in bannerList" :key="item.id">
					<image class="img" :src="item.pic" ></image>
				</swiper-item>
			</swiper>
			<view class="diagram">
				<image src="../../static/icons/search.png"></image>
				<image src="../../static/icons/cart.png"></image>
			</view>
		</view>
		<!-- 导航 -->
		<view class="nav">
			<view class="item" v-for="item in navList" :key='item.id'>
				<image class="img" :src="item.icon"></image>
				<view class="text">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 限时活动 -->
		<view class="activity">
			<view class="icon">
<!-- 				<image v-if="isShow" src="../../static/icons/theolaba.png"></image>
				<image  v-else src="../../static/icons/xiaolaba.png"></image> -->
			</view>
			<view class="text">
				限时活动:
			</view>
			<swiper class="ads" :circular="true" :autoplay="true" :interval="3000" :duration="1000" :vertical='true'>
				<swiper-item v-for="item in activityList" :key='item.id'>
					<view class="swiper-item">
						<view class="name">
							{{item.name}}
						</view>
						<view class="text-price">
							<view class="price">{{item.price}}</view>
							<view class="now-price">现价:{{item.promotionPrice}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 热门推荐 -->
		<view class="hot">
			<view class="text">
				热门推荐
			</view>
			<swiper class="nav" :circular='true' :display-multiple-items="3" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item  class="item" v-for="item in HotList" :key='item.id'>
					<image :src="item.pic" ></image>
				</swiper-item>
				
			</swiper>
		</view>
		<!-- 新品推荐 -->
		<view class="new">
			<view class="text">
				新品推荐
			</view>
			<view class="list">
				<view class="item" v-for="item in NewList" :key="item.id" @tap="goDetail(item.id)">
					<view class="img">
						<image :src="item.pic"></image>
					</view>
					<view class="describe">
						<view class="name">
							{{item.name}}
						</view>
						<view class="price">
							<text>价格</text>
							<text>{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="like">
			<view class="text">
				猜你喜欢
			</view>
			<view class="list">
				<view class="item" v-for="item in linkList" :key="item.id" @tap="goDetail(item.id)">
					<view class="img">
						<image :src="item.pic"></image>
					</view>
					<view class="describe">
						<view class="name">
							{{item.name}}
						</view>
						<view class="price">
							<text>价格:</text>
							<text>¥{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	name:'home'
	import {
		bannerAds,
		findCategory,
		recommendList,
		hotList,
		lejuLatestProducts,
		saleMostProducts
	} from "../../api/home/index.js"
	export default {
		data() {
			return {
				statusBarHeight:0,
				bannerList:[],
				navList:[],
				activityList:[],
				HotList:[],
				NewList:[],
				linkList:[],
				isShow:true
			};
		},
		onShow() {
			
		},
		onLoad(options) {
			// 获取胶囊按钮高度
			// #ifdef MP-WEIXIN
			var obj = uni.getMenuButtonBoundingClientRect()
			this.statusBarHeight = obj.height + obj.top
			// #endif
			
			// 获取轮播图
			this.getBannerList();
			this.getNavList();
			this.geiRecommendList();
			this.getHotList();
			this.getNewList();
			this.getLikeList();
			this.addTime();
		},
		methods:{
			// 获取bannerlist
			getBannerList(){
				bannerAds().then(res=>{
					// console.log(res)
					this.bannerList = res.data.items
				})
			},
			// 获取分类list
			getNavList(){
				findCategory("1308336521604599809").then(res=>{
					// console.log(res)
					this.navList = res.data.category.children
				})
			},
			// 获取限时活动
			geiRecommendList(){
				recommendList().then(res=>{
					// console.log(res)
					this.activityList = res.data.items
				})
			},
			// 获取热门推荐
			getHotList(){
				hotList().then(res=>{
					// console.log(res)
					this.HotList = res.data.items
				})
			},
			// 获取新品列表
			getNewList(){
				lejuLatestProducts().then(res=>{
					// console.log(res)
					this.NewList = res.data.productList
				})
			},
			// 获取猜你喜欢
			getLikeList(){
				saleMostProducts().then(res=>{
					console.log(res)
					this.linkList = res.data.items
				})
			},
			addTime(){
				var that = this
				var time = setInterval(function(){
					that.isShow = !that.isShow
				},500)
			},
			// 去往商品详情
			goDetail(id){
				console.log(id)
				uni.navigateTo({
					url:`../goodsdetail/goodsdetail?id=${id}`
				})
			}
			
		},
		
		
	}
</script>

<style lang="scss" scoped>
	.home{
		width: 100%;
		background-color: #f1ece7;
		.banner{
			width: 100%;
			height: 516rpx;
			position: relative;
			.list{
				width: 100%;
				height: 100%;
				
						.img{
							width: 100%;
							display: block;
							height: 100%;
						}
					
			}
			.diagram{
				padding: 20rpx;
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				justify-content: flex-end;
				image{
					width: 36rpx;
					height: 36rpx;
					margin: 20rpx;
				}
			}
		}
		.nav{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 31rpx 0;
			padding: 20rpx;
			.item{
				text-align: center;
				.img{
					width: 80rpx;
					height: 80rpx;
				}
			}
			
		}
		.activity{
			display: flex;
			align-items: center;
			width: 670rpx;
			height: 96rpx;
			margin: 40rpx;
			background-color: #fff;
			.icon{
				// width: 20%;
				margin-left: 40rpx;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
			.text{
				font-size: 34rpx;
				font-weight: 600;
				color: #ffa500;
				margin-left: 10rpx;
			}
			.ads{
				width: 60%;
				height: 100%;
				line-height: 100%;
				.swiper-item{
					// padding: 40rpx;
					// color: #ffa500;
					font-size: 20rpx;
					display: flex;
					text-indent: .5rem;
					.name{
						font-size: 34rpx;
						width: 200rpx;
						height: 100rpx;
						line-height: 100rpx;
					}
					.text-price{
						font-size: 24rpx;
						height: 100rpx;
						line-height: 40rpx;
						font-weight: 600;
						.price{
							 text-decoration:line-through;
						}
						.now-price{
							color: red;
						}
					}
				}
			}
		}
		.hot{
			padding: 30rpx;
			.text{
				font-size: 40rpx;
				font-weight: 700;
				padding: 40rpx 0;
				color: #323232;
			}
			.nav{
				margin: 0;
				padding: 0;
				.item{
					width: 230rpx;
					height: 150rpx;
					image{
					    margin: 0 20rpx;
						width: 100%;
						height: 100%;
					}
				}
			}
			
		}
		.new{
			padding: 30rpx;
			.text{
				font-size: 40rpx;
				font-weight: 700;
				padding: 40rpx 0;
				color: #323232;
			}
			.list{
				display: flex;
				overflow-x: auto;
				.item{
					width: 590rpx;
					height: 260rpx;
					display: flex;
					align-items: center;
					background-color: #fff;
					margin: 0 20rpx;
					border-radius: 20rpx;
					.img{
						width: 194rpx;
						height: 168rpx;
						margin: 0 20rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.describe{
						width: 320rpx;
						height: 160rpx;
						padding: 50rpx 0;
						.name{
							margin-bottom: 25rpx;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space:nowrap;
						}
						.price{
							margin-top: 50rpx;
						}
					}
				}
			}
		}
		.like{
			padding: 30rpx;
			.text{
				font-size: 40rpx;
				font-weight: 700;
				padding: 40rpx 0;
				color: #323232;
			}
			.list{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.item{
					width: 48%;
					height: 415rpx;
					background-color: #fff;
					margin: 20rpx 6rpx;
					.img{
						height: 238rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.describe{
						padding: 30rpx;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						text-indent: 0.5rem;
						.name{
							margin-bottom: 40rpx;
						}
					}
				}
			}
		}
		
	}
</style>
