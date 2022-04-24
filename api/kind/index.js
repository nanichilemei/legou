import request from "../request.js"

// 获取顶部轮播
function findCategory(id){
	return request({
		url:`/lejuClient/productCategory/findCategory/${id}`,
		method:"get",
	})
}

function findProductList(start, limit,data){
	return request({
		url:`/lejuClient/product/findProductList/${start}/${limit}`,
		method:"post",
		data
	})
}

export {
	findCategory,
	findProductList
	}