import request from '../../request'

// 购物车列表
function findAllCartItem(data){
    return request({
        url:`/lejuClient/cart/findAllCartItem`,
        method:'get',
		data
    })
}


function delCartItems(data){
    return request({
        url:`/lejuClient/cart/delCartItems`,
        method:'post',
		data
    })
}
export {
	findAllCartItem,
	delCartItems
}