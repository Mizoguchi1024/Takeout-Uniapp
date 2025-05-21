import {request} from "../request"

export function apiList(){
	return request({
		url:'addressBook/list',
		method:'get'
	})
}