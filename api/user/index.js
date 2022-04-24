
import request from '../request'

// 登录
function doLogin(data){
    return request({
        url:`/lejuClient/login/doLogin`,
        method:'post',
		data
    })
}

//注册
function register(data){
    return request({
        url:`/lejuClient/member/register`,
        method:'post',
		data
    })
}

// 获取用户信息
function getMemberInfo(){
    return request({
        url:`/lejuClient/login/getMemberInfo`,
        method:'get',
    })
}
// 获取订单详情
function getPreOrderById(orderId){
    return request({
        url:`/lejuClient/order/getPreOrderById/${orderId}`,
        method:'get',
    })
}

// 获取地址列表
function findAllAddress(){
    return request({
        url:"/lejuClient/address/findAllAddress",
        method:'get',
    })
}

// 添加地址
function addAddressInfo(data){
    return request({
        url:"/lejuClient/address/addAddressInfo",
        method:'post',
				data
    })
}
// 提交订单
function addConfirmOrder(data){
    return request({
        url:"/lejuClient/order/addConfirmOrder",
        method:'post',
				data
    })
}
// 立即支付
function payConfirm(data){
    return request({
        url:"/lejuClient/order/payConfirm",
        method:'post',
				data
    })
}


export {
	doLogin,
	getMemberInfo,
	getPreOrderById,
	findAllAddress,
	register,
	addAddressInfo,
	addConfirmOrder,
	payConfirm
}