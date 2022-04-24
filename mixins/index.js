var obj = {
	methods:{
		checkLoginStatus(){
			// 判断是否登录
			if(!uni.getStorageSync("token")){
				uni.showModal({
					title:"登录提示",
					content:"暂未登录，是否立即登录",
					success(res){
						if(res.confirm){
							// 点击的确定
							uni.navigateTo({
								url:'/pages/user/login/login'
							})
						}else{
							// 点击的是取消
							uni.showToast({
								title:"你点击了取消",
								icon:"none"
							})
						}
					}
				})
				return false
			}else{
				return true
			}
		}
	}
}

export default obj