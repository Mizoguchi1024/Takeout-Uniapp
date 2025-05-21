import {request} from "../request"

export function apiLogin(params){
	return request({
		url:'user/login',
		method:'post',
		data:params
	})
}

export function apiLogout(){
	return request({
		url:'user/logout',
		method:'post'
	})
}

export function apiProfile(){
	return request({
		url:'user/profile',
		method:'get'
	})
}

export function apiEditProfile(params){
	return request({
		url:'user/profile',
		method:'put',
		data:params
	})
}