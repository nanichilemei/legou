<template>
	<view :style="'padding-top:'+statusBarHeight+'px'">
		<view v-for="item in list" :key="item.id" @tap="goGoods(item.id)">
				<image :src="item.icon"></image>
				<view>{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	import {
		findCategory
	} from '../../api/kind/index.js'
	export default {
		name:"",
		data() {
			return {
				id:"1308336521604599809",
				list:[],
				statusBarHeight: 0
			};
		},
		methods:{
			// 获取分类列表
			getList(){
				findCategory(this.id).then(res => {
					this.list = res.data.category.children
				})
			},
			goGoods(id){
				uni.navigateTo({
					url:`./goodsList/goodslist?id=${id}`,
					success(res){
						// console.log(res)
					}
				})
			}
		},
		onLoad(){
			this.getList()
			// #ifdef MP-WEIXIN
			var obj = uni.getMenuButtonBoundingClientRect()
			this.statusBarHeight = obj.height + obj.top
			// #endif
		}
	}
</script>

<style lang="scss" scepod>

</style>
