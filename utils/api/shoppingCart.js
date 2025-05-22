import {request} from "../request"

export function apiShoppingCartList() {
	return request({
		url:'shoppingCart/list',
		method:'get'
	})
}

export function apiShoppingCartAdd(params) {
	return request({
		url:'shoppingCart/add',
		method:'post',
		data:params
	})
}

export function apiShoppingCartClean() {
	return request({
		url:'shoppingCart/clean',
		method:'delete'
	})
}

export function apiShoppingCartSub(params) {
	return request({
		url:'shoppingCart/sub',
		method:'post',
		data:params
	})
}