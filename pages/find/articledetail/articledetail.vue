<template>
	<view class="article">
		<view class="box">
			<h2>{{productArticle.title}}</h2>
			<p class="right">作者:{{productArticle.author}}</p>
			<p class="right">时间: {{productArticle.modifyTime}}</p>
			<p>概述描述：{{productArticle.summary}}</p>
			<image class="img" :src="productArticle.coverImg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		productArticle
	} from "../../../api/find/index.js"
	export default {
		name: "article",
		data() {
			return {
				id: "",
				productArticle:{}
			};
		},
		methods: {
			getDetail() {
				productArticle(this.id).then(res => {
					this.productArticle = res.data.productArticle
					uni.setNavigationBarTitle({
						title:res.data.productArticle.title
					})
				})
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.id = options.id;
			this.getDetail()
		}
	}
</script>

<style lang="scss" scepod>
.article {
	height: 100vh;
	background-color:#f1ece7;
	.box {
		padding: 60rpx;
		.right {
			text-align: right;
		}
		.img {
			margin: 30rpx 0;
		}
	}
}
</style>
