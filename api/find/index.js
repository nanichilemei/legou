
import request from "../request.js"

// 获取文章列表
function findArticleByPage(start,limit){
    return request({
        url:`/lejuClient/productArticle/findArticleByPage/${start}/${limit}`,
        method:'get',
       
    })
}

// 获取品牌列表
function findBrandsByPage(start,limit){
    return request({
        url:`/lejuClient/brand/findBrandsByPage/${start}/${limit}`,
        method:'get',
       
    })
}
function productArticle(id){
    return request({
        url:`/lejuClient/productArticle/productArticle/${id}`,
        method:'get',
       
    })
}
export {
	findArticleByPage,
	findBrandsByPage,
	productArticle
}