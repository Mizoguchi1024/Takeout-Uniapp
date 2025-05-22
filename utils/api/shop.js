import {request} from "../request"

export function apiShopCategoryList() {
	return request({
		url:'category/list/?type=1',
		method:'get'
	})
}

export function apiShopDishList(id) {
	return request({
		url:`dish/list/?categoryId=${id}`,
		method:'get'
	})
}