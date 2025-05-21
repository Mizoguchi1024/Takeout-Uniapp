import {request} from "../request"

export function apiAddress(){
	return request({
		url:'addressBook/list',
		method:'get'
	})
}