import request from "../request.js"

// 获取轮播图
function bannerAds (){
	return request({
		url:"/lejuClient/home/bannerAds",
		method:'get'		
	})
}
// 获取分类
function findCategory (data){
	return request({
		url:`/lejuClient/productCategory/findCategory/${data}`,
		method:'get'		
	})
}

function productDetail(productId){
    return request({
        url:`/lejuClient/product/productDetail/${productId}`,
        method:'get',
       
    })
}

// 获取限时活动
function recommendList (){
	return request({
		url:'/lejuClient/home/recommendList',
		method:'get'		
	})
}

// 获取热门推荐
function hotList (){
	return request({
		url:'/lejuClient/home/hotList',
		method:'get'		
	})
}
// 获取新品推荐
function lejuLatestProducts (){
	return request({
		url:'/lejuClient/home/lejuLatestProducts',
		method:'get'		
	})
}
// 获取猜你喜欢
function saleMostProducts (){
	return request({
		url:'/lejuClient/home/saleMostProducts',
		method:'get'		
	})
}

export {
	bannerAds,
	findCategory,
	recommendList,
	hotList,
	lejuLatestProducts,
	saleMostProducts,
	productDetail
}