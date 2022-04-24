import request from '../../request'


function findAllOrders(){
    return request({
        url:`/lejuClient/order/findAllOrders`,
        method:'get',
    })
}


// 退单列表
function orderReturnApplys(){
    return request({
        url:`/lejuClient/orderReturn/orderReturnApplys`,
        method:'get',
    })
}

// 取消订单
function cancelOrder(orderId){
    return request({
        url:`/lejuClient/order/cancelOrder/${orderId}`,
        method:'post',
    })
}

// 确认收货

function receiveDone(data){
    return request({
        url:`/lejuClient/order/receiveDone`,
        method:'post',
				data
    })
}
// 删除订单
function deleteOrder(data){
    return request({
        url:`/lejuClient/order/_clearOrderFocus`,
        method:'post',
				data
    })
}

// 获取退货公司地址
function getCompanyAddrss(){
    return request({
        url:`/lejuClient/orderReturn/getCompanyAddrss`,
        method:'get',
    })
}

// 申请退单
function addOrderReturnApply(data){
    return request({
        url:`/lejuClient/orderReturn/addOrderReturnApply`,
        method:'post',
				data
    })
}
export {
	findAllOrders,
	orderReturnApplys,
	cancelOrder,
	receiveDone,
	deleteOrder,
	getCompanyAddrss,
	addOrderReturnApply
}