import {request} from "../request"

export function apiAddressList(){
	return request({
		url:'addressBook/list',
		method:'get'
	})
}

export function apiAddressGetById(id){
	return request({
		url:`addressBook/${id}`,
		method:'get'
	})
}

export function apiAddressInsert(params){
	return request({
		url:'addressBook',
		method:'post',
		data:params
	})
}

export function apiAddressUpdate(params){
	return request({
		url:'addressBook',
		method:'put',
		data:params
	})
}

export function apiAddressDelete(id){
	return request({
		url:`addressBook?id=${id}`,
		method:'delete',
	})
}

export function apiAddressGetDefault(){
	return request({
		url:'addressBook/default',
		method:'get'
	})
}

export function apiAddressSetDefault(params){
	return request({
		url:'addressBook/default',
		method:'put',
		data:params
	})
}