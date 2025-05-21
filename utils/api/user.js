import request from "../request"

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