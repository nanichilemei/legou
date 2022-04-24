import BASE_URL from "./baseurl.js"
//封装网络接口
function request(config){
// console.log(config)
	return new Promise((resolve,reject) =>{
		uni.request({
			url: BASE_URL + config.url,
			method: config.method,
			data: config.data,
			timeout:5000,
			header:{
				token:uni.getStorageSync("token")
			},
			success(res){
				resolve(res.data)
			},
			fail(error){
				reject(error)
			}
		})
	})
}
export default request;