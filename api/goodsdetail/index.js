import request from "../request.js"

// 获取商品详情
function productDetail(productId){
    return request({
        url:`/lejuClient/product/productDetail/${productId}`,
        method:'get',
       
    })
}
// 添加到购物车
function addCart(data){
    return request({
        url:`/lejuClient/cart/addCart`,
        method:'post',
		data
    })
}
// 提交获取订单ID
function addPreOrder(data){
		return request({
			url:"/lejuClient/order/addPreOrder",
			method:"post",
			data
		}) 
}

export {
	productDetail,
	addCart,
	addPreOrder
	
}